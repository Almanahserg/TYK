const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
    '/register',
    [
        check('email', "Incorrect email").isEmail(),
        check('password', 'The minimum length of the password must be 6')
            .isLength({ min: 6 })
    ],
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
                message: "Incorrect data"
            })
        }

        try {
            const {email, password} = request.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return response.status(400).json({ message: "A user with this email is already registered" })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            response.status(201).json({ message: "User is successfully registered" })
        } catch (e) {
            console.error(e)
            response.status(500).json({ message: "Something went wrong" })
        }
    }
)

router.post(
    '/login',
    [
        check('email', "Enter correct email").normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.array(),
                message: "Login error"
            })
        }

        const { email, password } = request.body;
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return response.status(400).json({ message: "Incorrect password" })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get("jwtSecretToken"),
            { expiresIn: "1h" }
        )

        response.json({
            token,
            userId: user.id
        })
    }
)

module.exports = router;