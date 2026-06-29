import { useState } from "react";
import {IoMdEye, IoMdEyeOff } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom";
import  useTitle  from "../Hooks/useTitle";
import { registerUser } from "../services/AuthService";
import {toast} from "react-toastify"
const Register = () => {
  useTitle("Register for CodeBook");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.info("Passwords do not match", {
        closeButton: true,
        position: "top-right"
      })

      return
    }
    
    try {
      const authDetail = {
        name,
        email,
        password
      }

      await registerUser(authDetail)
      toast.success("Registration successful", {
        closeButton: true,
        position: "top-right"
      })
      navigate("/products")
    } catch (error) {
      toast.error(error.message, {
        closeButton: true,
        position: "bottom-center"
      })
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold dark:text-white mb-6">Register</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
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
              <div className="relative">
                <input 
                type={showPassword? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute inset-y-0 mb-5 right-3 flex items-center text-gray-500 cursor-pointer dark:text-gray-400"
              >
                {showPassword? <IoMdEyeOff/> : <IoMdEye/>}
              </button>

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                use 7 or more characters with a mix of letters, numbers & symbols
              </p>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                type={showPassword? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Already have an account? 
            <Link to="/login" className="text-rose-600 hover:text-rose-700 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;