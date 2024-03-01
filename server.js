const express = require('express');

const app = express();

const dotenv = require('dotenv');

const Sequelize = require('sequelize');

const model = Sequelize.Model

dotenv.config();

const HOST = "localhost"
const USER = "root"
const PASSWORD = process.env.MY_SQL_PASSWORD
const DB = "USER"
const dialect = "mysql"
const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
}


const sequelizeInit = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    pool: pool
});


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelizeInit;

const userModel = (sequelize, DataTypes) => {
    class User extends model {
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }


    }, {
        sequelize,
        modelName: 'user',
        tableName: 'user',
        timestamps: true
    })

    return User;

}

db.user = userModel(sequelizeInit, Sequelize);

db.sequelize.sync({ force: false }).then(() => {
    console.log(`Database & tables created!`);
})


//Allows us read request body
app.use(express.json())

let requestCount = 0;

const serverUsername = 'admin';
const serverPassword = 1234567890


app.post('/bank-api/v1/auth/signup', async (req, res) => {

    const user = await db.user.create(req.body)

    requestCount++;
    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user
    })
    console.log(`Today we have received ${requestCount} requests`);
})

app.post('/bank-api/v1/auth/login', async (req, res) => {

    const { username, password } = req.body;

    console.log(username, password)

    let user = await db.user.findOne({ where: { username } })

    //console.log(user.password)

    if (!user) {
        res.status(404).json({
            message: 'User not found'
        })
    }

    else if (user.password != password) {
        res.status(400).json({
            message: 'Invalid password'
        })
    }

    else {
        res.status(200).json({
            message: 'Login successful',
            user
        })
    }
})

app.post('/bank-api/v1/info', (req, res) => {
    let { currency, price, location, time } = req.query;
    price = parseInt(price)
    if (currency == 'USD' && location == 'NG' && price > 1000 && time == 'noon') {
        console.log("HERE ALSO!!!");
        res.status(200).json({
            available: true,
            rate: '1USD = 500NGN',
            total: price * 500
        })
    }
    else if (currency == 'GBP' && location == 'NG' && price > 1000 && time == 'noon') {
        res.status(200).json({
            available: true,
            rate: '1GBP = 700NGN',
            total: price * 700
        })
    }
    else {
        res.status(400).json({
            available: false,
            message: 'Service not available'
        })

    }
})

app.get('/bank-api/v1/info/:currency', (req, res) => {
    const currency = req.params.currency;

    if (currency == 'NGN') {
        res.status(200).json({
            currency: 'NGN',
            rate: '1USD = 500NGN',
            location: 'NG',
            availability: 'high'
        })
    }

    else if (currency == 'BTC') {
        res.status(200).json({
            currency: 'BTC',
            rate: '1BTC = 10000USD',
            location: 'NG',
            availability: 'low'
        })
    }

    else {
        res.status(400).json({
            message: `${currency} is not available`
        })
    }

})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})