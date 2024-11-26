//UserAccount Controller
const UserAccount = require('../models/UserAccount');

// Create a new user account
exports.createUserAccount = async (req, res) => {
    try {
        const userAccount = new UserAccount(req.body);
        await userAccount.save();
        res.status(201).json({ message: "User account added successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all user accounts
exports.getAllUserAccounts = async (req, res) => {
    try {
        const userAccounts = await UserAccount.find();
        res.status(200).json(userAccounts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/*
// Get user account by username
exports.getUserAccountByUserName = async (req, res) => {
    try {
        const { username } = req.body; // Extract the username from the request body
        const userAccount = await UserAccount.findOne({ username }); // Find the user account by username

        if (!userAccount) {
            return res.status(404).json({ error: 'User account not found' });
        }

        res.status(200).json(userAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/

exports.getUserAccountByUserAccName = async (req, res) => {
    try {
        console.log('Received request body:', JSON.stringify(req.body, null, 2)); // Log the entire request body
        const { userAccName } = req.body; // Extract the userAccName from the request body
        console.log('Received userAccName:', userAccName); // Log the received userAccName

        const userAccount = await UserAccount.findOne({ userAccName }); // Find the user account by userAccName
        console.log('Queried user account:', userAccount); // Log the queried user account

        if (!userAccount) {
            console.log('User account not found'); // Log if user account is not found
            return res.status(404).json({ error: 'User account not found' });
        }

        res.status(200).json(userAccount);
    } catch (error) {
        console.error('Error fetching user account:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
};


/*
// Get user account by userId
exports.getUserAccountByUserId = async (req, res) => {
    try {
        const { userId } = req.body; // Extract the userId from the request body
        const userAccount = await UserAccount.findOne({ userId }); // Find the user account by userId

        if (!userAccount) {
            return res.status(404).json({ error: 'User account not found' });
        }

        res.status(200).json(userAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/
exports.getUserAccountByUserAccId = async (req, res) => {
    try {
        console.log('Received request USERACCID body:', JSON.stringify(req.body, null, 2)); // Log the entire request body
        const { userAccId } = req.body; // Extract the userAccId from the request body
        console.log('Received userAccId:', userAccId); // Log the received userAccId

        const userAccount = await UserAccount.findOne({ userAccId }); // Find the user account by userAccId
        console.log('Queried user account:', userAccount); // Log the queried user account

        if (!userAccount) {
            console.log('User account not found'); // Log if user account is not found
            return res.status(404).json({ error: 'User account not found' });
        }

        res.status(200).json(userAccount);
    } catch (error) {
        console.error('Error fetching user account:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
};



// Get user account by email
exports.getUserAccountByEmail = async (req, res) => {
    try {
        const { email } = req.body; // Extract the email from the request body
        const userAccount = await UserAccount.findOne({ email }); // Find the user account by email

        if (!userAccount) {
            return res.status(404).json({ error: 'User account not found' });
        }

        res.status(200).json(userAccount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update a user account
exports.updateUserAccount = async (req, res) => {
    try {
        const userAccount = await UserAccount.findOneAndUpdate({ userId: req.body.userId }, req.body, { new: true, runValidators: true });
        if (!userAccount) return res.status(404).json({ error: 'User account not found' });
        res.status(200).json({ message: "User account updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user account
exports.deleteUserAccount = async (req, res) => {
    try {
        const userAccount = await UserAccount.findOneAndDelete({ userId: req.body.userId });
        if (!userAccount) return res.status(404).json({ error: 'User account not found' });
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
