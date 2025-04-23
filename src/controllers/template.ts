import { Request, Response } from "express";
import db from "../models";

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const template = await db.Template.create(req.body);
    res
      .status(201)
      .json({ success: true, template, message: "Tempate created" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const [updated] = await db.Template.update(req.body, {
      where: { id: req.params.id },
    });
    updated
      ? res.json({ success: true, message: "Tempate updated" })
      : res.status(404).json({ success: false, error: "Template not found" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const deleted = await db.Template.destroy({ where: { id: req.params.id } });
    deleted
      ? res.status(200).json({ success: true, message: "Template deleted" })
      : res.status(404).json({ success: false, error: "Template not found" });
  } catch (error) {
    res.status(400).json({ success: false, error: "Something went wrong" });
  }
};

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await db.Template.findAll();
    res
      .status(200)
      .json({ success: true, templates, message: "Tempated fethced" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
