const router = require('express').Router();
const { User } = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');

/* Sign Up */
router.post('/register', async (req, res) => {
    let { email, password } = req.body;

    try {
        const newUser = await User.create({
            email,
            password: bcrypt.hashSync(password, 13)
        })
        res.status(201).json({
            message: "User registered, welcome to Tripz!!",
            user: newUser
        })
    }
    catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: error.message || serverErrorMsg
            })
        }
    }
})

//Login

router.post('/login', async (req, res) => {
    let { email, password } = req.body

    try {
        let loginUser = await User.findOne({
            where: { email }
        })

        if (loginUser && await bcrypt.compare(password, loginUser.password)) {
            const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })
            res.status(200).json({
                message: 'Login succeeded!',
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                message: 'Login failed.'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router