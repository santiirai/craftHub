import Transaction from "../models/transaction.model.js";

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).populate("products.productId");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });
  try {
    const transactions = await Transaction.find().populate("products.productId").populate("userId", "name email");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      userId: req.user.id,
      products: req.body.products,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod || "Khalti"
    });
    
    const savedTransaction = await newTransaction.save();
    const populatedTransaction = await Transaction.findById(savedTransaction._id)
      .populate("products.productId")
      .populate("userId", "name email");
    
    res.status(201).json(populatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    transaction.paymentStatus = req.body.paymentStatus || transaction.paymentStatus;
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};