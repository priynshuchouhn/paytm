const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');

const saltRounds = 12;

const signInSchema = z.object({
    username: z.string().email(),
    password: z.string()
})
const signUpSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string()
})

const updateProfileSchema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional(),
})

const signIn = async (req, res, next) => {
    try {
        const { success } = signInSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ success: false, message: 'Required Field missing' });
        }
        const { username, password } = req.body;
        const user = await User.find({ username: username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid login credentials' });
        }
        const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET)
        const newUser = user.toObject();
        delete user.password;
        newUser.token = token;
        return res.status(200).json({ success: true, message: 'user logged in successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error' });
    }

}
const signUp = async (req, res, next) => {
    try {
        const { success } = signUpSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ success: false, message: 'Required Field missing' });
        }
        const { firstname, lastname, password, username } = req.body;
        const existingUser = User.findOne({ username: username })
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'user already exists' });
        }
        const hashedPassword = bcrypt.hash(password, saltRounds)
        const newUser = User({
            firstname,
            lastname,
            username,
            password: hashedPassword
        })
        const user = newUser.save();
        const userId = user._id;
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
        const token = jwt.sign({
            username: user.username, id: user._id
        }, JWT_SECRET);

        return res.status(200).json({ success: true, token: token, message: 'user created successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error' });

    }

}
const updateProfile = async (req, res, next) => {
    try {
        const { success } = updateProfileSchema.safeParse(req.body);
        if (!success) {
            res.status(411).json({ success: false, message: 'Required field missing' })
        }
        const user = User.findAndUpdateOne({ _id: req.user.id }, req.body);
        res.status(200).json({ success: true, message: 'User updated successfully' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
const getUsers = async (req, res, next) => {
    try {
        const { filter } = req.body || req.params || req.query;
        const lstUser = User.find({
            $or: [
                {
                    firstname: {
                        $regex: filter
                    },
                },
                {
                    lastname: {
                        $regex: filter
                    },
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { signIn, signUp, updateProfile };