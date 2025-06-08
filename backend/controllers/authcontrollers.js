import bcrypt from 'bcrypt';
import passport from 'passport';
import db from '../db.js';

const saltRounds=10;

export const register=async (req,res)=>{
const username = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    if (checkResult.rows.length > 0) {
      // Instead of res.redirect("/login")
      return res.status(409).json({ message: "User already registered. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    const user = result.rows[0];

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed after registration." });
      return res.status(201).json({ message: "Registered and logged in", user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const logoutUser = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Clear cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};




export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal error" });
    if (!user) return res.status(401).json({ message: info?.message || "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

