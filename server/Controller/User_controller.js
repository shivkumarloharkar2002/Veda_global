const oauth2client = require("../Service/googleConfig");
const User = require("../Model/User");
const Verification = require("../Model/Verification");
const { sendVerification, mailuser } = require("../Service/Send_email");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");



exports.Create_user = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body

    if (!firstName || !lastName || !email) {
        return res.status(400).send('fill required fields');
    }

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ message: "Email already exists" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a number between 100000 and 999999

        await Verification.create({
            user: email,
            otp: OTP
        });

        await sendVerification(email, OTP).catch(async (error) => {
            console.log(error)
            if (error) await Client.findOneAndDelete({ email: email });
            await Verification.findOneAndDelete({ otp: OTP });
            return res.status(400).json({ message: "plaease enter valid email" });

        })
        res.status(200).json({
            message: "please check for the verification code in your inbox",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

exports.verify_user = async (req, res) => {
    const { otp, firstName, lastName, email, phone, password } = req.body

    if (!otp || !firstName || !lastName || !email || !password) {
        return res.status(400).send('fill required fields');
    }

    try {
        const verification = await Verification.findOne({ otp, user: email });

        if (!verification) {
            return res.status(404).json({ success: false, message: "Invalid OTP" });
        }

        const secPassword = crypto.AES.encrypt(
            password, "sdkjklr823@%234"
        ).toString();

        const clientData = await User.create({
            firstName, lastName, email, phone, password: secPassword
        });

        await Verification.deleteOne({ otp, user: email });
        await mailuser(email);

        res.status(200).json({
            success: true,
            data: clientData
        });

    } catch (error) {
        console.error("Error verifying client:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {

            updates.password = crypto.AES.encrypt(
                updates.password,
                "sdkjklr823@%234"
            ).toString();
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        if (users) {
            res.status(200).json({
                success: true,
                data: users
            })
        } else {
            res.status(500).json({ message: "users not found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log(req.body.email, req.body.password)
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({ message: "enter valid credentials" });
        }
        const bytes = crypto.AES.decrypt(user.password, "sdkjklr823@%234");
        const password = bytes.toString(crypto.enc.Utf8);

        console.log(password)
        if (req.body.password === password) {
            const authToken = jwt.sign({ id: user._id }, "ed#$630KIkpoijhgfds");
            return res.status(200).json({ token: authToken });
        } else {
            return res.status(403).json({ message: "enter valid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};


exports.googleLogin = async (req, res) => {

    
    const code = req.query.code;
    try {
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, given_name, family_name } = userRes.data;
        // console.log("googleLogin.", userRes);
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                firstName: given_name,
                email: email
            });
        }


        return res
            .status(200)
            .json({
                data: user,
            })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}
