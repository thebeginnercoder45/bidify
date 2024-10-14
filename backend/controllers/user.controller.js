import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const allUsers = async (req, res) => {
    try {
        const users = await User.find(); 

        if (!users.length) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        return res.status(200).json({
            message: "Users found",
            users: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            message: "Failed to retrieve users",
            success: false,
            error: error.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log(req.body);
        

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already in use",
                success: false
            });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            fullName,
            email,
            password: hashPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error("Failed to create new user: ", error);
        return res.status(500).json({
            message: "An error occurred during registration",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            .json({
                message: "Logged in successfully",
                success: true,
                user: {
                    _id: user._id,
                    name: user.fullName,
                    isSeller: user.seller,
                    token
                }
            });

    } catch (error) {
        console.error("Failed to login user: ", error);
        return res.status(500).json({
            message: "An error occurred during login",
            success: false
        });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Failed to logout user",
            success: false
        });
    }
};


export const becomeSeller = async (req, res) => {
    try {
        const { userId } = req.params;
        const { contact } = req.body;
        if (!contact) {
            return res.status(401).json({
                message: "Contact is required"
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "Invalid user id or user not found",
                success: false
            });
        }

        if (user.becomeSeller) {
            return res.status(409).json({
                message: "User is already a seller",
                success: false
            });
        }

        const upgradeUser = await User.findByIdAndUpdate(userId, {
            seller: true,
            contact: contact
        }, { new: true });

        return res.status(200).json({
            message: "Upgraded user as seller",
            success: true,
            user: upgradeUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create seller",
            success: false
        });
    }
};
