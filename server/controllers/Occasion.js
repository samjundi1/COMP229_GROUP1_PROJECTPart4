//Occasion controller
const Occasion = require('../models/Occasion');

// Create a new occasion
exports.createOccasion = async (req, res) => {
    try {
        const occasion = new Occasion(req.body);
        await occasion.save();
        res.status(201).json({ message: "Occasion added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all occasions
exports.getAllOccasions = async (req, res) => {
    try {
        const occasions = await Occasion.find();
        res.status(200).json(occasions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Occcasion by ID
exports.getOccasionById = async (req, res) => {
    try {
        const { occasionId } = req.body; // Extract the ID from the request body
        const occasion = await Occasion.findOne({occasionId}); // Find the Occasion by ID

        if (!occasion) {
            return res.status(404).json({ error: 'Occasion not found' });
        }

        res.status(200).json(occasion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an occasion
exports.updateOccasion = async (req, res) => {
    try {
        const occasion = await Occasion.findOneAndUpdate({ occasionId: req.body.occasionId }, req.body, { new: true, runValidators: true });
        if (!occasion) return res.status(404).json({ error: 'Occasion not found' });
        res.status(200).json({ message: "Occasion updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an occasion
exports.deleteOccasion = async (req, res) => {
    try {
        const occasion = await Occasion.findOneAndDelete({ occasionId: req.body.occasionId });
        if (!occasion) return res.status(404).json({ error: 'Occasion not found' });
        res.status(200).json({ message: 'Occasion deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
