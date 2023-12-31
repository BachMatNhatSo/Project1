
import userSevices from "../services/userServices";


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing inputs parameters'
        })
    }
    let userData = await userSevices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter",
            users: []
        })
    }
    let users = await userSevices.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}