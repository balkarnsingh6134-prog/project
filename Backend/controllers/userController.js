import userDataSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email already exists
        const findEmail = await userDataSchema.findOne({ email });
        console.log(findEmail, "okk");

        if (findEmail !== null) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Email already exists",
                body: {},
            });
        } else {
            // Hash password before saving
            const encpass = await bcrypt.hash(password, 10);
            const data = await userDataSchema.create({
                ...req.body,
                password: encpass,
            });
            console.log(data, "hii");

            return res.status(201).json({
                success: true,
                status: 201,
                message: "User created successfully",
                body: data,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Internal Server Error",
            body: {},
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, "Attempting login");

        // Validation checks
        if (!email) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Email is required",
                body: {},
            });
        } 
        
        if (!password) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Password is required",
                body: {},
            });
        }

        // Find user by email
        const data = await userDataSchema.findOne({ email });

        if (data == null) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Email is not valid",
                body: {},
            });
        } else {
            // Compare encrypted password
            const decpass = await bcrypt.compare(password, data.password);
            console.log(decpass, "Password Match Result");

            if (decpass == false) {
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: "Password does not match",
                    body: {},
                });
            } else {
                // Generate JWT Token
                const token = jwt.sign(
                    { email: data.email, id: data._id },
                    process.env.JWT_SECRET || 'jwt_secret_123',
                    { expiresIn: '1d' }
                );

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "User logged in successfully",
                    token: token,
                    body: data,
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Internal Server Error",
            body: {},
        });
    }
};

export const findUsers = async (req, res) => {
    try {
        const data = await userDataSchema.find();
        const count = await userDataSchema.countDocuments();
        console.log(data, "All users here");
        return res.status(200).json({
            success: true,
            status: 200,
            message: "All users are here",
            body: data,
            count,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message,
            body: {}
        });
    }
};

export const findUserByIdByBody = async (req, res) => {
    try {
        const data = await userDataSchema.findById(req.body.id);
        console.log(data, "SingleUser");
        return res.status(200).json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const findUserByIdByParams = async (req, res) => {
    try {
        const data = await userDataSchema.findById(req.params.id);
        console.log(data, "user by params");
        return res.status(200).json({
            success: true,
            status: 200,
            message: "This is a single user",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const userUpdate = async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        // If password is being updated, hash it
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        const data = await userDataSchema.findByIdAndUpdate(
            req.body.id,
            updateData,
            { new: true }
        );

        console.log(data, "update user");
        return res.status(200).json({
            success: true,
            status: 200,
            message: "User updated successfully",
            body: data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const data = await userDataSchema.findByIdAndDelete(req.params.id);
        const count = await userDataSchema.countDocuments();
        console.log(data, "user deleted");
        return res.status(200).json({
            success: true,
            status: 200,
            message: "User deleted successfully",
            body: count,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userDataSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "User with this email does not exist",
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "balkarnsingh6134@gmail.com",
                pass: "nnot ggbt fivl kubw",
            },
        });

        // UPDATED: Use your live frontend URL instead of localhost
        const resetLink = `https://project-1-m2un.onrender.com/reset-password/${user._id}`;

        const mailOptions = {
            from: "balkarnsingh6134@gmail.com",
            to: email,
            subject: "Password Reset - Mobile Shop",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>Password Reset Request</h2>
                    <p>Click the button below to reset your password. This link is valid for your account.</p>
                    <a href="${resetLink}" style="background: #06c4dd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                    <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Reset link sent to your email successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, status: 500, message: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "New password is required" });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const updatedUser = await userDataSchema.findByIdAndUpdate(
            id,
            { password: encryptedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Invalid User ID or User not found",
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Password reset successfully! You can now login.",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, status: 500, message: "Internal Server Error" });
    }
};