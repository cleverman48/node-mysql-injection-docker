import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import patientModel from '../models/patientModel.js';

const saltRounds = 10;

const signup = async function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({ success: false, msg: 'Please pass username, email and password.' });
    } else {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        };
        const result = await userModel.getUserByEmail(req.body.email);
        console.log(result);
        if (result[0].length > 0) {
            res.json({ email: result[0].email, message: 'You are already signed up!' });
        }
        else {
            const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
            newUser.password = hashedPassword;
            const insertUser = await userModel.createUser(newUser);
            if (newUser.role == "patient" && insertUser != null) {
                const tempUsers = await userModel.getUserByEmail(newUser.email);
                console.log(tempUsers);
                const newPatient = {
                    user_id: tempUsers[0][0].id,
                    health_insurance: false,
                    address: "nnnn-eeee",
                    credit_card: "xxxx-oooo",
                };

                const newPat = await patientModel.createPatient(newPatient);
            }
            if (insertUser) {
                res.json({ newuser: req.body.username, message: 'User created successfully' });
            } else {
                console.error(err);
                res.status(500).json({ error: 'Failed to create user' });
            }
        }
    }
};

const signin = async function (req, res) {

    const result = await userModel.getUserByEmail(req.body.email);
    if (result[0].length > 0) {
        var compare = await bcrypt.compare(req.body.password, result[0][0].password);
        if (!compare) {
            res.status(401).json({ error: 'Invalid email or password' });
        }
        else {
            let token = jwt.sign(result[0][0], config.secret);
            res.json({ success: true, token: 'Bearer ' + token });
        }
    }
    else {
        res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    }
};


export default { signup, signin }