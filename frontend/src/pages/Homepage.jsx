import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Homepage = () => {
    const handleAddCart = async (productId) => {
  try {
    const res = await axios.post("http://localhost:3000/add-cart", 
      { productId }, 
      { withCredentials: true }
    );
    alert("Item added to cart");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("You must be logged in to add items.");
  }
};

    const [products,setProduct]=useState([]);
    useEffect(()=>{
       const fetchProduct= async()=>{
            const res=await axios.get("http://localhost:3000/products",{
      withCredentials: true, 
    });
         //console.log(res.data);
         setProduct(res.data);
         console.log(res.data);
        }
        fetchProduct();
    },[]);

return (  
    <div>
<section className=" bg-[#e6ecf0] flex flex-col  items-center px-4 py-[50px] gap-5 md:px-[50px] md:grid grid-cols-3  md:place-items-start md:gap-10 ">
        {products.map((product)=>(
             
        <div key={product.id} className=" shadow-lg bg-gradient-to-t from-slate-300 to-amber-300 
  rounded-2xl border border-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-[250px] h-[280px]">
            <div className="w-[250px] ">
                <img className=" w-[250px] h-[200px] rounded-2xl" src={product.image}/>

            </div>
            <div className="text-neutral-50">
                <h1 > {product.name}</h1>
                <h1 className=" text-[#27ae60]"> ${product.price}</h1>
            </div>
            <div className="flex relative left-[165px]  gap-2">
            <i onClick={()=>handleAddCart(product.id)} class=" text-[30px] fa-solid fa-cart-plus"></i>
                
<a href={`products/${product.id}`}>
              <i class=" text-[30px] fa-solid fa-shop"></i>
              </a>
            </div>
            </div>
        

            
          
        )
            
        )
        
    }
        </section>
    </div>
        
    )
    }
    
      
    


export default Homepage
