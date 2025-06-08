import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {

const handlePayment = async () => {
  try {
    const res = await axios.post("http://localhost:3000/payment", {
      amount, // already calculated in state
    });

    window.location.href = res.data.url; // redirect to Stripe checkout
  } catch (err) {
    console.error("Payment failed:", err);
  }
};



  const [carts, setCart] = useState([]);
  const [amount,setAmount]=useState(0);

  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/carts", {
        withCredentials: true,
      });

      const cartItems = res.data;
      setCart(cartItems);

      const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
      setAmount(total);

      console.log(cartItems);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  fetchCart();
}, []);


  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/remove-cart`,{ data: { productId } });
      setCart(carts.filter(item => item.product_id !== productId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h2>
        {carts.map(cart => (
          <div key={cart.product_id} className="grid grid-cols-12 border p-6 mb-6 rounded-xl">
            <div className="col-span-3">
              <img
                src={cart.image} 
                alt={cart.name}
                className="rounded-xl w-full object-cover"
              />
            </div>
            <div className="col-span-9 pl-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{cart.name}</h3>
                <button onClick={() => handleDelete(cart.product_id)}>
                  ❌
                </button>
              </div>
              <p className="text-gray-500 mb-4">{cart.description || "No description available."}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <button  className="px-3 py-1 border rounded-full">-</button>
                  <span>1</span>
                  <button    className="px-3 py-1 border rounded-full">+</button>
                </div>
                <h4 className="text-xl font-bold text-indigo-600">${cart.price}</h4>
              </div>
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-4 text-center '>
        <h1 className="w-full py-4 bg-green-400 text-white font-semibold rounded-full hover:bg-green-700 relative "> Amount:INR{amount}</h1>
       
        <button onClick={()=>handlePayment()} className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700">Checkout</button>
</div>
      </div>
    </div>
  );
};

export default Cart;
