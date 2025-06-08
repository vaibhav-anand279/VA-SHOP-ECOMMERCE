import express from 'express';
import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();


import passport from './passportconfig.js';

import Products from './routes/Products.js';

import cors from "cors";


import session from 'express-session';
import Auth from './routes/Auth.js';
import cart from './routes/cart.js';
import pgSession from "connect-pg-simple";
import pool from './sessionPool.js';
import PaymentRoutes from './routes/Payment.js';



const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));



const port = 3000;


app.use(express.json());

app.use(express.static("public"));


const PGStore = pgSession(session);

app.use(
  session({
    store: new PGStore({
      pool,               // your existing pool
      createTableIfMissing: true  // <-- add this option
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("",Auth);
app.use("", cart);

app.use("",Products);

app.use("", PaymentRoutes);




// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

