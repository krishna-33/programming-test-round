import { Request, Response } from "express";

import { Op, WhereOptions } from "sequelize";
import db from "../models";
import { ProductAttributes } from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await db.Product.create(req.body);
    res
      .status(201)
      .json({ success: true, product, message: "Product created" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Somthing went wrong" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const [updated] = await db.Product.update(req.body, {
      where: { id: req.params.id },
    });
    updated
      ? res.json({ success: true, message: "Product updated" })
      : res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Somthing went wrong" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await db.Product.destroy({ where: { id: req.params.id } });
    deleted
      ? res.status(200).json({ success: true, message: "Product deleted" })
      : res.status(404).json({ success: false, error: "Product not found" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Somthing went wrong" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.Product.findAll();
    res.status(200).json({ success: true, products, message:'Products fetched' });
  } catch (error) {
    res.status(500).json({ success: false, error: "Somthing went wrong" });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { sku, name } = req.query;

    const products = await db.Product.findAll({
      where: {
        [Op.or]: [
          { id: { [Op.like]: `%${sku}%` } },
          { name: { [Op.like]: `%${name}%` } },
        ],
      } as WhereOptions<ProductAttributes>,
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: "Somthing went wrong" });
  }
};
