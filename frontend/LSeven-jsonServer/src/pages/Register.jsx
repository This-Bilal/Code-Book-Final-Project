import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../Hooks/useTitle";

const Register = () => {
  useTitle("Register for CodeBook");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // In later lessons, this will call an authentication service
    console.log("Register attempt:", { name, email, password });
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
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                required
              />
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