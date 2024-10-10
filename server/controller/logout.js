async function logout(request,response){
    try {
        const cookieOption = {
            httpOnly: true,
            secure: true
        };
        return response.cookie('token', '', cookieOption).status(200).json({
            message : 'Log Out Successfully',
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true

        })
    }
}

module.exports  =  logout