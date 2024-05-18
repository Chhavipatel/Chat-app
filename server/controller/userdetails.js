const gettoken = require("../helpers/gettoken")

async function userdetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await gettoken(token)

        return response.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = userdetails