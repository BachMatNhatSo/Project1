import db from '../models/index';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPasswor(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender == '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,

            })
            console.log(data);
            resolve('tao moi user thanh cong');
        } catch (e) {
            reject(e);

        }
    })


}
let hashUserPasswor = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
}
let getUserInfoById = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { id: userId }, raw: true
            });
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (e) {

        }

    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
                console.log(user);
            }
            else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })

}
let deleteCRUDById = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userid }
            });
            if (user) {
                await user.destroy();
            }

            resolve();//return
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteCRUDById: deleteCRUDById,
}