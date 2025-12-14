const Sweet = require('../models/sweet.model');

/* =====================
   GET ALL (IMAGE SAFE)
===================== */
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();

    // ENSURE image field ALWAYS exists
    const normalized = sweets.map((s) => ({
      ...s._doc,
      image: s.image || ''
    }));

    res.status(200).json(normalized);
  } catch {
    res.status(500).json({ message: 'Failed to fetch sweets' });
  }
};


/* =====================
   SEARCH
===================== */
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter).lean(); 
    res.status(200).json(sweets);
  } catch {
    res.status(500).json({ message: 'Search failed' });
  }
};

/* =====================
   CREATE (IMAGE FIXED)
===================== */
const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, image } = req.body;

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      image: image?.trim() || '' 
    });

    res.status(201).json(sweet);
  } catch {
    res.status(500).json({ message: 'Failed to create sweet' });
  }
};

/* =====================
   PURCHASE
===================== */
const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    if (sweet.quantity <= 0)
      return res.status(400).json({ message: 'Out of stock' });

    sweet.quantity -= 1;
    sweet.sold += 1;
    await sweet.save();

    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: 'Purchase failed' });
  }
};

/* =====================
   RESTOCK
===================== */
const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    sweet.quantity += quantity;
    await sweet.save();

    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: 'Restock failed' });
  }
};

/* =====================
   UPDATE (IMAGE FIXED)
===================== */
const updateSweet = async (req, res) => {
  try {
    const { name, category, price, image } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    if (name !== undefined) sweet.name = name;
    if (category !== undefined) sweet.category = category;
    if (price !== undefined) sweet.price = price;

    // ONLY update image if provided
    if (image !== undefined) {
      sweet.image = image.trim();
    }

    await sweet.save();
    res.status(200).json(sweet);
  } catch {
    res.status(500).json({ message: 'Update failed' });
  }
};

/* =====================
   DELETE
===================== */
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: 'Sweet not found' });

    await sweet.deleteOne();
    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Delete failed' });
  }
};

/* =====================
   REVENUE
===================== */
const getRevenueReport = async (req, res) => {
  try {
    const sweets = await Sweet.find().lean();
    const revenueData = sweets.map((s) => ({
      name: s.name,
      revenue: s.price * s.sold
    }));
    res.status(200).json(revenueData);
  } catch {
    res.status(500).json({ message: 'Failed to fetch revenue data' });
  }
};

module.exports = {
  getAllSweets,
  searchSweets,
  createSweet,
  purchaseSweet,
  restockSweet,
  updateSweet,
  deleteSweet,
  getRevenueReport
};
