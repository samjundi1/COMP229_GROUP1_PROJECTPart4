//Flower Controller
const mongoose = require('mongoose');
const Flower = require('../models/Flower');
const Catalog = require('../models/Catalog'); //Flower has a refrence in a catalogs

exports.createFlowerAddToCat = async (req, res) => {
    const session = await mongoose.startSession(); // Start a session for transaction
    session.startTransaction();

    try {
        // Create and save the flower
        const flower = new Flower(req.body);
        await flower.save({ session });

        // Create the catalog entry for the flower
        const catalogEntry = new Catalog({
            itemId: `catalog${flower._id}`,  // Generate a unique item ID
            flower: flower._id,  // Reference the flower document's _id
            vendorId: req.body.vendorId,   // Assuming vendorId comes from the request body
            name: flower.name,
            descrition: flower.descrition,
            price: flower.price,
            imageUrls: flower.imageUrls,
            categories: req.body.category,  // Assuming category comes from the request body
            quantity: flower.quantity,
            availabilityStatus: flower.availabilityStatus,
            occasions: flower.occasions,
            notes: flower.notes,
            createdAt: new Date().toISOString(), // Set createdAt timestamp
            updatedAt: new Date().toISOString(), // Set updatedAt timestamp
        });

        // Save the catalog entry
        await catalogEntry.save({ session });

        // Commit the transaction if everything goes fine
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Flower and Catalog entry added successfully' });
    } catch (error) {
        // Rollback the transaction in case of error
        await session.abortTransaction();
        session.endSession();
        
        res.status(400).json({ error: error.message });
    }
};
// Create a new flower
exports.createFlower = async (req, res) => {
    try {
        const flower = new Flower(req.body);
        await flower.save();
        res.status(201).json({ message: "Flower added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all flowers
exports.getAllFlowers = async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.status(200).json(flowers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get flower by ID
exports.getFlowerById = async (req, res) => {
    try {
        const { flowerId } = req.body; // Extract the ID from the request body
        const flower = await Flower.findOne({flowerId}); // Find the flower by ID

        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        res.status(200).json(flower);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
    exports.getFlowerByVendorId = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const catalogs = await Catalog.find({ vendorId }).populate('flower');
        
        const flowers = catalogs.map(catalog => catalog.flower);
        res.status(200).json(flowers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a flower
// Update a flower and sync catalog entries 22 NOV 24S
exports.updateFlowerAndCat = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Find the flower by ID and update
        const flower = await Flower.findOneAndUpdate({ flowerId: req.body.flowerId }, req.body, { new: true, runValidators: true, session });

        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        // Update catalog entries that reference this flower
        await Catalog.updateMany(
            { flowerId: flower._id }, // Find catalogs referencing the updated flower
            {
                $set: {
                    flowerName: flower.name,
                    description: flower.description,
                    price: flower.price,
                    imageUrls: flower.imageUrls,
                    categories: flower.categories, // Assuming flower has a category
                    availabilityStatus: flower.availabilityStatus,
                    quantity: flower.quantity,
                    occasions: flower.occasions,
                    notes: flower.notes
                    //vendorId: req.body.vendorId, no need 

                }
            },
            { session } // Perform the update within the same transaction
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Flower and associated catalog entries updated successfully' });
    } catch (error) {
        // Rollback transaction in case of failure
        await session.abortTransaction();
        session.endSession();

        res.status(400).json({ error: error.message });
    }
};
exports.updateFlower = async (req, res) => {
    try {
        const flower = await Flower.findOneAndUpdate({ flowerId: req.body.flowerId }, req.body, { new: true, runValidators: true });
        if (!flower) return res.status(404).json({ error: 'Flower not found' });
        res.status(200).json({ message: "Flower updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete a flower and from catalogs
exports.deleteFlowerAndCat = async (req, res) => {
    try {
        const { flowerId } = req.body;

        // Check if flowerId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(flowerId)) {
            return res.status(400).json({ error: 'Invalid flower ID format.' });
        }

        // Convert flowerId to ObjectId
        const flowerObjectId = mongoose.Types.ObjectId(flowerId);

        // Check if the flower exists
        const flower = await Flower.findById(flowerObjectId);
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found.' });
        }

        // Start a session for an atomic transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // Delete flower from the flowers collection
            await Flower.findByIdAndDelete(flowerObjectId, { session });

            // Delete related catalog entries where flowerId matches the ObjectId
            await Catalog.deleteMany({ flower: flowerObjectId }, { session });

            // Commit transaction
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ message: 'Flower and related catalogs deleted successfully.' });
        } catch (error) {
            // Rollback transaction on error
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
// updated d 22.NOV
/*exports.deleteFlowerAndCat = async (req, res) => {
    try {
        const { flowerId } = req.body;
        const catalogEntries = await Catalog.find({ flower: flowerId });
        if (catalogEntries.length > 0) {
            return res.status(400).json({
                error: 'Cannot delete flower',
                message: 'This flower is referenced in one or more catalog entries.'
            });
        }
        const flower = await Flower.findOneAndDelete({ flowerId });
        if (!flower) return res.status(404).json({ error: 'Flower not found' });
        res.status(200).json({ message: 'Flower deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};*/
// Delete a flower
exports.deleteFlower = async (req, res) => {
    try {
        const flower = await Flower.findOneAndDelete({ flowerId: req.body.flowerId });
        if (!flower) return res.status(404).json({ error: 'Flower not found' });
        res.status(200).json({ message: 'Flower deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
