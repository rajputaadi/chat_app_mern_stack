const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request,response) {
    
    try {
        const token = request.cookies.token;  // Retrieve the token from cookies
        console.log("tokrn",request.cookies);
        // Check if the token exists
        if (!token) {
            return response.status(401).json({
                message: "Session Expired Internal Error",
                logout: true
            });
        }

        // Get user details from token
        const user = await getUserDetailsFromToken(token);
        const { name, profile_pic} = request.body

        const updateUser = await UserModel.updateOne({_id : user._id},{
            name,
            profile_pic
        })

        const userInformation  = await UserModel.findById(user._id)
        return response.status(200).json({
            message: 'Updated Successfully',
            data: userInformation,
            success: true,
            token: token // Include this if you want to send the token back
        });
        

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true
        })
    }
}

module.exports = updateUserDetails