import { Request, Response } from 'express';
import Faq from '../models/Faq.model';

export const getFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find({ published: true }).sort({ category: 1, order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
};

export const createFaq = async (req: Request, res: Response) => {
  try {
    const { question, answer, category, order, published } = req.body;
    const newFaq = new Faq({ question, answer, category, order, published });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: 'Error creating FAQ', error });
  }
};

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: 'Error updating FAQ', error });
  }
};

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting FAQ', error });
  }
};
