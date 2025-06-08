import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider,Link} from 'react-router-dom'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import AddProduct from './pages/AddProduct';
import Product from './pages/product';
import About from './pages/About';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Cart from './pages/Cart';
import SuccessPage from './pages/SuccessPage';

const router=createBrowserRouter(createRoutesFromElements(
 <Route path='/'element={<Navbar/>}>
  <Route path='/products' element={<Homepage/>}/>
  <Route path='/postproducts' element={<AddProduct/>}/>
 <Route path='/products/:id' element={<Product/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/contacts' element={<Contact/>}/>
  <Route path='/register' element={<Registration/>}/>
   <Route path='/login' element={<Login/>}/>
      <Route path='/carts' element={<Cart/>}/>
       <Route path="/success" element={<SuccessPage />} />
  
 </Route>
));
const App = () => {
  return(
    <RouterProvider router={router}></RouterProvider>
  
    
  )
  
  
}

export default App
