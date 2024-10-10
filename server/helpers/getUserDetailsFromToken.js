const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session Expired",
            logout: true
        };
    }

    let decode;
    try {
        decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.error('Token verification error:', error);
        return {
            message: "Invalid token",
            logout: true
        };
    }
    
    console.log('Decoded Token:', decode); // Log the decoded token

    // Find user by ID
    const user = await UserModel.findById(decode.id).select('-password');
    if (!user) {
        return {
            message: 'User not found',
            error: true
        };
    }

    return user;
};

module.exports = getUserDetailsFromToken;
