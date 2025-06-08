import passport from "passport";
import { Strategy } from "passport-local";
import db from "./db.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export const adminCredentials = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

passport.use(
  new Strategy({ usernameField: "username" }, async (username, password, done) => {
    try {
      // ✅ Check for admin login
      if (username === adminCredentials.username && password === adminCredentials.password) {
        return done(null, { id: "admin", username, role: "admin" });
      }

      // ✅ Check normal DB user
      const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
      if (result.rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, { ...user, role: "user" });
    } catch (err) {
      return done(err);
    }
  })
);

// ✅ Store only ID or "admin"
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Load admin or fetch DB user
passport.deserializeUser(async (id, done) => {
  try {
    if (id === "admin") {
      return done(null, {
        id: "admin",
        username: adminCredentials.username,
        role: "admin",
      });
    }

    // ✅ Ensure ID is a number
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return done(null, false); // invalid ID
    }

    const result = await db.query("SELECT * FROM users WHERE id = $1", [numericId]);
    if (result.rows.length === 0) {
      return done(null, false); // user not found
    }

    const user = result.rows[0];
    return done(null, { ...user, role: "user" });
  } catch (err) {
    return done(err);
  }
});

export default passport;
