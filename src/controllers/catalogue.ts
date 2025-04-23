import { Request, Response } from 'express';
import db from '../models';


export const generateCatalogue = async (req: Request, res: Response) => {
  try {
  const { skus, templateIds } = req.body;

  const products = await db.Product.findAll({ where: { id: skus, isUsed: false } });
  const templates = await db.Template.findAll({ where: { id: templateIds } });
  
  const allocations = [];
  let productIndex = 0;

  for (const template of templates) {
    const needed = template.slots;
    const allocated = products.slice(productIndex, productIndex + needed);
    productIndex += needed;

    allocations.push({
      templateId: template.id,
      products: allocated.map((p: { id: number }) => p.id),
      missingSlots: Math.max(0, needed - allocated.length),
    });
  }
  
  await db.Product.update(
    { isUsed: true },
    { where: { id: products.slice(0, productIndex).map(p => p.id) } }
  );

  res.status(200).json({
    success: true,
    allocations,
    leftover: products.slice(productIndex).map(p => p.id),
  });
}
catch (err) {
  res.status(500).json({ success: false, error: 'Somthing went wrong' });
}
};