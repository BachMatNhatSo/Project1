
import db from '../models/index';
import CRUDServices from '../services/CRUDServices';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e);
    }
}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUDPage = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send('this is crud page');
}
let displaygetcrud = async (req, res) => {
    let data = await CRUDServices.getAllUsers();
    console.log('-------------');
    console.log(data);
    console.log('-------------');
    return res.render('displayCrud.ejs', {
        dataTable: data
    });
}
let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        return res.render('editCrud.ejs', {
            dataOfUser: userData
        });
    }
    else {
        return res.send('User not found!');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDServices.updateUserData(data);
    return res.render('displayCrud.ejs', {
        dataTable: allUsers
    });

}
let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log('-------------------------------------------------');
    console.log(userId);
    console.log('-------------------------------------------------');
    if (userId) {
        await CRUDServices.deleteCRUDById(userId);
        return res.send('Delete the user ');
    } else {
        return res.send('user not found');
    }


}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUDPage: getCRUDPage,
    postCRUD: postCRUD,
    displaygetcrud: displaygetcrud,
    getEditCrud: getEditCrud,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}