import db from "../db.js";

export const getProduct=async(req,res)=>{
    try {
        const result=await db.query("SELECT * FROM realproducts ORDER BY id ASC ");
res.json(result.rows);
        
    } catch (error) {
        res.status(404).json({ error: "Can't load your data" });

        
    }

}
export const getOneProduct=async(req,res)=>{
    try {
        const id=req.params.id;
    const result=await db.query("SELECT * FROM realproducts Where id=$1 ",[id]);
    res.json(result.rows[0]);
    } catch (error) {
        res.status(404).json({ error: "Can't load your data" });
    }
    
    
}
export const postProduct=async(req,res)=>{
  

      const name=req.body.name;
    const image=req.body.image;
  const price=req.body.price;
    if(!name ||!image ||!price){
         return res.status(400).json({ error: "Missing required fields" });
  }
    
  try {
    
    const result=await db.query("INSERT INTO realproducts (name,image,price) VALUES($1,$2,$3) RETURNING * ",[name,image,price]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(404).json({ error: "Can't load your data" });


    
  }

}
  export const deleteProduct = async (req, res) => {
  const { id } = req.params;  // or req.params.id if you prefer URL params

  if (!id) {
    return res.status(400).json({ error: "Missing product id" });
  }

  try {
    const result = await db.query("DELETE FROM realproducts WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};


  
    

