import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  useTitle  from "../Hooks/useTitle";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";
import {IoMdEye, IoMdEyeOff } from "react-icons/io"
import { useCart } from "../context";

const Login = () => {
  useTitle("Login to CodeBook");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const {loadCart} = useCart()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authDetail = {
        email,
        password
      }

      const data = await loginUser(authDetail)

      toast.success("Login successful", {closeButton: true, position: "top-right"})

      if (data.isAdmin) {
        navigate("/admin")
      } else {
        navigate("/products")
      }
    } catch (error) {
      toast.error(error.message, {closeButton: true, position: "top-right"})
    }
  };

  const handleLoginGuest = () => {
    setTimeout(() => {
      navigate("/products")
    }, 1000)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold dark:text-white">Login</h1>

          <p className=" mt-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
            Enter your credentials or {" "}
            <span 
              onClick={handleLoginGuest}
              className=" text-rose-600 dark:text-rose-500 cursor-pointer font-medium"
            >
              Continue as guest
            </span>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className=" relative">
                <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
              
              <button 
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer dark:text-gray-400"
              >
                {showPassword? <IoMdEyeOff/> : <IoMdEye/>}
              </button>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Login
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account? 
            <Link to="/register" className="text-rose-600 hover:text-rose-700 ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;