import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
//Routes
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
//
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests
app.use("/api/products",productRoutes);

const initDB = async()=>{
try {
	await sql`
	  CREATE TABLE IF NOT EXISTS products(
	   id SERIAL PRIMARY KEY ,
	   name VARCHAR(255) NOT NULL , 
	   image VARCHAR(255) NOT NULL ,
	   price DECIMAL(10,2) NOT NULL ,
	   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	  );
	`
	console.log("Database initialized successfully");
	
} catch (error) {
	console.log("error",error);
	
}
}

initDB().then(()=>{
	app.listen(PORT, () => {
		console.log(`server running on ${PORT} `);
	});
});