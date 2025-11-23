import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import LogIn from "./Pages/Login/Login"
import DashboardUI from "./Pages/DashBoard/DashboardUI";
import AddProduct from "./Pages/AddProduct/AddProduct";
import CheckoutPopup from "./Component/CheckOut";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/dashboard" element ={<DashboardUI/>}/>
      <Route path="/addProduct" element={<AddProduct/>}/>
      <Route path="/checkout" element={<CheckoutPopup/>}/>
      
    </Routes>
  );
}

export default App;
