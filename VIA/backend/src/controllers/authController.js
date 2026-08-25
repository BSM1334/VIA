import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [existing] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
