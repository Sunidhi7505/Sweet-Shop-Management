const Sweet = require('../models/sweet.model');

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sweets' });
  }
};

const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sweet' });
  }
};

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Purchase failed' });
  }
};

module.exports = {
  getAllSweets,
  createSweet,
  purchaseSweet
};
