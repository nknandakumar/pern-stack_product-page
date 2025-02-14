import { sql } from "../config/db.js";
//  Get all products
export const getProducts = async (req, res) => {
	try {
		const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
		console.log("fetched Products", products);

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error in getProducts", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
// Create a new product
export const createProduct = async (req, res) => {
	const { name, price, image } = req.body;
	if (!name || !price || !image) {
		return res.status(400).json({ success: false, message: "All fields are required" });
	}
	try {
		const newProduct = await sql`INSERT INTO products (name,price,image) VALUES (${name},${price},${image})
        RETURNING *
        `;
		console.log("NEW PRODUCT CREATED", newProduct);
		res.status(201).json({ success: true, data: newProduct[0] });
	} catch (error) {
		console.log("Error in createProducts function", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
export const getProduct = async (req, res) => {
const { id } = req.params;
try {
    const product = await sql`
    SELECT * FROM products WHERE id = ${id}
    `;
    res.status(200).json({ success: true, data: product[0] });
} catch (error) {
    console.log("Error in getProduct function", error);
    res.send(500).json({ success: false, message: "Internal Server Error" });
}
};
// Update a product
export const updateProduct = async (req, res) => {
const { id } = req.params;
const { name, price, image } = req.body;

try {
    const updatedProduct = await sql`
    UPDATE products SET name = ${name}, price = ${price}, image = ${image} WHERE id = ${id}
    RETURNING *
    `;

    if (updatedProduct.length === 0) {
      return   res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct[0] });
}catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
}
};
// Delete a product
export const deleteProduct = async (req, res) => {
const { id } = req.params;
try{
    const deleteProduct = await sql`
    DELETE FROM products WHERE id = ${id}
    RETURNING *
    `;
    if (deleteProduct.length === 0) {
      return  res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deleteProduct[0] });
}catch(error){
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
}
};
