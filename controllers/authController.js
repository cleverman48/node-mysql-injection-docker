import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';

const saltRounds = 10;

const signup = function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({ success: false, msg: 'Please pass username, email and password.' });
    } else {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
        };
        userModel.getUserByEmail(req.body.email,async (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to check user' });
            } else {
                if (result.length > 0) {
                    res.json({ email: result[0].email, message: 'You are already signed up!' });
                }
                else {
                    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
                    newUser.password = hashedPassword;
                    userModel.createUser(newUser, (err, insertId) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Failed to create user' });
                        } else {
                            res.json({ id: insertId, message: 'User created successfully' });
                        }
                    });
                }
            }
        })
    }
};

const signin = function (req, res) {

    userModel.getUserByEmail(req.body.email,async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to check user' });
        } else {
            if (result.length > 0) {
                var compare = await bcrypt.compare(req.body.password, result[0].password);
                if(!compare)
                {
                    res.status(401).json({ error: 'Invalid email or password' });
                }
                else
                {
                    let token = jwt.sign(result[0], config.secret);
                    res.json({ success: true, token: 'Bearer ' + token });
                }               
            }
            else
            {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            }
        }
    })
};


export default { signup, signin }