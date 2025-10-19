import express from 'express'
import User from '../MODELS/user.js'
const UpdateUser = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // Validate inputs
        if (!(email && oldPassword && newPassword)) {
            return res.status(400).send('Email, old password, and new password are required');
        }

        // Find the user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).send('User not found');
        }

        // Check if old password matches
        if (existingUser.password !== oldPassword) {
            return res.status(401).send('Old password is incorrect');
        }   

        // Update the password
        existingUser.password = newPassword;
        await existingUser.save();

        return res.status(200).send('Password updated successfully');
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
};

export default UpdateUser;
