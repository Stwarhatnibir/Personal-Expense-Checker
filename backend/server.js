const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/expense-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Expense Model
const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

// API Routes
app.get("/api/expenses", async (req, res) => {
  try {
    const { category, date } = req.query;
    const query = {};

    if (category && category !== "All") query.category = category;
    if (date) query.date = date;

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const expense = new Expense({
      amount,
      category,
      date,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
