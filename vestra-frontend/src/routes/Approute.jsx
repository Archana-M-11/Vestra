import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Products />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
    </Routes>
  );
}