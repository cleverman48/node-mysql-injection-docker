import { mycon } from '../config/database.js'
import bcrypt from 'bcryptjs';
import Chance from 'chance';

const chance = new Chance();
const saltRounds = 10;
await mycon.promise().query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL
    )
`);
await mycon.promise().query(`
    CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    health_insurance BOOLEAN,
    address VARCHAR(255),
    credit_card VARCHAR(16),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
`);
const generateRandomUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const username = chance.name();
        const email = chance.email();
        const password = "123456789";
        const role = chance.pickone(['patient', 'staff']);
        const healthInsurance = chance.bool();
        const address = chance.address();
        const creditCard = "xxxx-sssss";

        const user = {
            username: username,
            email: email,
            password: password,
            role: role,
            health_insurance: healthInsurance,
            address: address,
            credit_card: creditCard,
        };

        users.push(user);
    }

    return users;
};

const creatDummyUsers = async function (req, res) {
    try {
        const randomUsers = generateRandomUsers(30);
        let count = 0;

        const existingUsers = await mycon.promise().query("SELECT * FROM users"); // Fetch all existing users

        for (const user of randomUsers) {
            const userExists = existingUsers[0].some((existingUser) => existingUser.email === user.email);

            if (!userExists) {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                const newUser = {
                    username: user.username,
                    password: hashedPassword,
                    email: user.email,
                    role: user.role,
                };

                const insertUser = await mycon.promise().query('INSERT INTO users SET ?', newUser);
                if (newUser.role == "patient" && insertUser != null) {
                    const tempUsers = await mycon.promise().query("SELECT * FROM users WHERE email = '"+newUser.email+"'");
                    console.log(tempUsers);
                    const newPatient = {
                        user_id: tempUsers[0][0].id,
                        health_insurance: user.health_insurance,
                        address: user.address,
                        credit_card: user.credit_card,
                    };

                    await mycon.promise().query('INSERT INTO patients SET ?', newPatient);
                    count++;
                }
            }
        }

        res.status(200).json({ info: `${count} users are created!` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate users' });
    }
};


export default { creatDummyUsers }