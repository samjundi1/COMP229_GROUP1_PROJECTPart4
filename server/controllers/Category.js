//Category Controller
const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.body; // Extract the ID from the request body
        const category = await Category.findOne({categoryId}); // Find the category by ID

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ categoryId: req.body.categoryId }, req.body, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ categoryId: req.body.categoryId });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
