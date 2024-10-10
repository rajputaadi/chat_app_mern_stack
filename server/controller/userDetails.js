const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

async function userDetails(request, response) {
    try {
        const token = request.cookies.token;  // Retrieve the token from cookies
        
        // Check if the token exists
        if (!token) {
            return response.status(401).json({
                message: "Session Expired",
                logout: true
            });
        }

        // Get user details from token
        const user = await getUserDetailsFromToken(token);

        // Check if the user data is valid
        if (!user || user.logout) {
            return response.status(401).json({
                message: user.message,
                logout: true
            });
        }

        // Return the user details
        return response.status(200).json({
            message: 'User Details',
            data: user
        });

    } catch (error) {
        // Handle any unexpected errors
        return response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = userDetails;
