const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;
        console.log("Received userId:", userId);
        console.log("Received password:", password);

        // Fetch user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Verify the password
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Incorrect Password",
                error: true
            });
        }

        // Token payload
        const tokenData = {
            id: user._id,
            email: user.email
        };

        // Sign the token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Cookie options
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true only in production
            sameSite: 'Strict', // Adjust as needed for your use case
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        };

        // Set the token in a cookie
        response.cookie('token', token, cookieOption);
        console.log('Token saved to local storage:', response.data.token);

        // Respond with success
        return response.status(200).json({
            message: "Login Successfully",
            success: true
        });
    } catch (error) {
        console.log("Error occurred:", error);
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = checkPassword;
