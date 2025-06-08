import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {id}=useParams();
    const [OneProduct,SetOneProduct]=useState();
     useEffect(()=>{
        const fetchOneProduct=async()=>{

           
                 const res=await  axios.get(`http://localhost:3000/products/${id}`,{ withCredentials: true });
                 SetOneProduct(res.data);



            }; 

 fetchOneProduct();

        }
       
    ,[id])
    if (!OneProduct) return <div className="text-center mt-10 text-red-500">Product not found.</div>;
  return (
   
    <div>
      
<div className="bg-neutral-500 ">
  <div className="grid grid-cols-1 py-[50px]  place-items-center">
    <img src={OneProduct.image}/>
    <h1 className=" py-4 text-6xl text-black">Product Info</h1>
    <h1 className="text-black">Price:${OneProduct.price}</h1>
    <h1 className="text-black"> Buy the best {OneProduct.name}</h1>
    <button className="hover:bg-amber-50 m-[30px] w-[500px] border rounded-full text-green-300">Add to cart</button>
    <button className="hover:bg-amber-50 shadow-md bg-blue-700 w-[500px] border rounded-full text-green-300">Buy Now</button>
  </div>
    </div>
    </div>
  )
}

export default Product
