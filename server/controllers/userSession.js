const UserSession = require('../models/UserSession');
const jwt = require('jsonwebtoken');

// Create a new user session
exports.createUserSession = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is provided in the request body

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const userSession = new UserSession({ userId, token });
    await userSession.save();

    res.status(201).json({ message: 'User session created successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a user session by token
exports.getUserSessionByToken = async (req, res) => {
  try {
    const sessionToken = req.headers.authorization.split(' ')[1]; // Assuming token is sent in Authorization header

    const userSession = await UserSession.findOne({ sessionToken });

    if (!userSession) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.status(200).json({ message: 'User session retrieved successfully', session: userSession });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user session (e.g., extend expiration time)
exports.updateUserSession = async (req, res) => {
  try {
    const { sessionToken } = req.body; // Read sessionToken from the request body

    const userSession = await UserSession.findOne({ sessionToken });

    if (!userSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Update expiration time or other fields as needed
    userSession.expiresAt = new Date(Date.now() + 3600000); // Extend expiration by 1 hour

    await userSession.save();

    res.status(200).json({ message: 'Session updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user session
exports.deleteUserSession = async (req, res) => {
  try {
    const { sessionToken } = req.body; // Read sessionToken from the request body

    const userSession = await UserSession.findOneAndDelete({ sessionToken });

    if (!userSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
