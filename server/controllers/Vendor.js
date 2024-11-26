//Vendor Controller
const mongoose = require('mongoose');

const Vendor = require('../models/Vendor'); // Import both Vendo model
const UserAccount = require('../models/UserAccount'); // Import  UserAccount model
// Create a new vendor
/*exports.createVendor = async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
            // Retrieve the UserAccount by userAccId
            const userAccount = await UserAccount.findOne({ userAccId });
        
        if (!userAccount) {
                return res.status(404).json({ message: 'User account not found' });
        }
        await vendor.save();
        res.status(201).json({ message: "Vendor added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/


// Create a new vendor
exports.createVendor = async (req, res) => {
    const { userAccountId, ...vendorData } = req.body;

    // Validate userAccountId
    if (!mongoose.isValidObjectId(userAccountId)) {
        return res.status(400).json({ error: "Invalid userAccountId format" });
    }
    const userAccountObjectId = mongoose.Types.ObjectId.createFromHexString(userAccountId);


    try {
        // Find the user account
        console.log("Query result for userAccountId and  userAccountObjectId:", userAccountId, userAccountObjectId);
        const userAccount = await UserAccount.findById(userAccountObjectId);
        if (!userAccount) {
            console.log("Query result for userAccount:", userAccount);
            return res.status(404).json({
                error: `User account with ID ${userAccountId} not found`,
            });
        }

        // Create vendor using validated userAccountId
        const newVendor = new Vendor({
            ...vendorData, // Spread the vendor data (e.g., vendorId, vendorName, etc.)
            userAccount: userAccountObjectId, // Correctly assign the ObjectId of the user account
        });
        await newVendor.save();

        return res.status(201).json({
            message: "Vendor created successfully",
            vendor: newVendor,
        });
    } catch (error) {
        console.error("Error creating vendor:", error);
        return res.status(500).json({ error: "Error creating vendor" });
    }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find(); // Populate the userAccount field to show linked user account details
        res.status(200).json(vendors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendors', error: err });
    }
};
//// Get vendor by UserAccount_id
exports.getVendorByUser = async (req, res) => {
    try {
        const { userAccountId } = req.body;
        const vendor = await Vendor.findOne({ userAccount: userAccountId });
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const vendor = await Vendor.findOne({ vendorId }).populate('userAccount'); // Populate the userAccount field
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching vendor', error: err });
    }
};

// Update a vendor
exports.updateVendor = async (req, res) => {
    try{
        const vendor = await Vendor.findOneAndUpdate({ vendorId: req.body.vendorId }, req.body, { new: true, runValidators: true });
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.status(200).json({ message: "Vendor updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a vendor
exports.deleteVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findOneAndDelete({ vendorId: req.body.vendorId });
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete vendor and associated user account by vendorId
exports.deleteVendorAndUserAccount = async (req, res) => {
    try {
        const { vendorId } = req.body;

        // Find the vendor by vendorId
        const vendor = await Vendor.findOne({ vendorId });

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Find and delete the associated user account
        const userAccount = await UserAccount.findOneAndDelete({ _id: vendor.userAccount });

        if (!userAccount) {
            return res.status(404).json({ message: 'User account not found' });
        }

        // Remove the vendor document
        await Vendor.deleteOne({ vendorId });

        res.status(200).json({ message: 'Vendor and associated user account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting vendor and user account', error: err });
    }
};
