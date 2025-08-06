const { Create_user, verify_user, updateUser, findAllUsers, login, googleLogin } = require("../Controller/User_controller");

const userroutes = require("express").Router();

userroutes.post("/register", Create_user);

userroutes.post("/verify", verify_user);

userroutes.put("/update/:id", updateUser);

userroutes.get("/all",findAllUsers)

userroutes.post("/login",login)

userroutes.get("/googlelogin",googleLogin)

module.exports= userroutes;