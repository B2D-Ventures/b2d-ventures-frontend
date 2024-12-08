'use client';  
  
import { useState, FormEvent, ChangeEvent } from 'react';  
import { FaEye, FaEyeSlash } from 'react-icons/fa';  
import { useRouter } from 'next/navigation';  
  
export default function LoginPage() {  
  const router = useRouter();  
  const [showPassword, setShowPassword] = useState(false);  
  const [formData, setFormData] = useState({  
    email: '',  
    password: ''  
  });  
  const [error, setError] = useState('');  
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {  
    const { name, value } = e.target;  
    setFormData(prev => ({  
      ...prev,  
      [name]: value  
    }));  
    // Clear any previous error when user starts typing  
    setError('');  
  };  
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  
      
    // Check for admin credentials  
    if (formData.email === 'admin.b2d@gmail.com' && formData.password === 'Gx2109me++') {  
      // Redirect to admin approval page  
      router.push('/admin-approve');  
      return;  
    }  
  
    try {  
      const response = await fetch('/api/auth/login', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(formData),  
      });  
  
      if (response.ok) {  
        console.log('Login successful');  
        // Handle regular user login success  
      } else {  
        setError('Invalid credentials');  
        console.error('Login failed');  
      }  
    } catch (error) {  
      setError('An error occurred during login');  
      console.error('Login error:', error);  
    }  
  };  
  
  const togglePassword = () => {  
    setShowPassword(!showPassword);  
  };  
  
  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
      <div className="bg-white p-8 rounded-lg shadow-md w-96">  
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>  
  
        {error && (  
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">  
            {error}  
          </div>  
        )}  
  
        <form onSubmit={handleSubmit} className="space-y-4">  
          <div>  
            <label className="block text-gray-700 mb-2" htmlFor="email">  
              Email  
            </label>  
            <input  
              type="email"  
              id="email"  
              name="email"  
              value={formData.email}  
              onChange={handleInputChange}  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"  
              placeholder="Enter your email"  
              required  
            />  
          </div>  
  
          <div className="relative">  
            <label className="block text-gray-700 mb-2" htmlFor="password">  
              Password  
            </label>  
            <div className="relative">  
              <input  
                type={showPassword ? "text" : "password"}  
                id="password"  
                name="password"  
                value={formData.password}  
                onChange={handleInputChange}  
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"  
                placeholder="Enter your password"  
                required  
              />  
              <button  
                type="button"  
                onClick={togglePassword}  
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"  
              >  
                {showPassword ? (  
                  <FaEyeSlash className="w-5 h-5" />  
                ) : (  
                  <FaEye className="w-5 h-5" />  
                )}  
              </button>  
            </div>  
          </div>  
  
          <button  
            type="submit"  
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"  
          >  
            Login  
          </button>  
        </form>  
      </div>  
    </div>  
  );  
}  