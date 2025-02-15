import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
//Routes
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
//
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // log the requests

//apply rate limiting to all routes
app.use(async (req,res,next)=>{
	try {
		const decision =  await aj.protect(req,{
			requested:1,//specify that each consumer is requesting 1 unit of the token
		});
		if (decision.isDenied()) {
			if (decision.reason.isRateLimited()) {
				return res.status(429).json({message:"Too many requests"});
			}else if (decision.reason.isBot()) {
				return res.status(403).json({message:"Bot access denied"});
		}else{
			return res.status(403).json({message:"Forbidden"});
		}
	}
	//check for spoof bots
	if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
		res.status(403).json({message:"spoof bot detected"});
		return ;
	}
	next()
	} catch (error) {
		console.log("arcjet error",error);
		next(error)
	}
})

//Route
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