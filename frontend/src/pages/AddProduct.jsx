import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddProduct = () => {
    const navigate=useNavigate();
    const[name,setName]=useState();
    const[price,setPrice]=useState();
     const[image,setImage]=useState();

     const submitForm=async(e)=>{
e.preventDefault();
        await axios.post('http://localhost:3000/postproducts',{name:name,price:price,image:image},{ withCredentials: true });
        
        navigate('/products');

     }


  return (


    <div>
      <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Create Your Own Product</h2>

            

            
            <div className="mb-4">
              <label
                for="description"
                className="block text-gray-700 font-bold mb-2"
                >Product Name</label>
             
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
              ></textarea>
            </div>

            

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
              Price
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required    
                value={price}
                onChange={(e)=>{
                    setPrice(e.target.value);
                }}       
              />
            </div>

            <h3 className="text-2xl mb-5">Product Info</h3>

            <div className="mb-4">
              <label for="company" className="block text-gray-700 font-bold mb-2"
                >Image</label>
              
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={image}
                onChange={(e)=>{
                    setImage(e.target.value);
                }}
              />
            </div>

            

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

export default AddProduct
