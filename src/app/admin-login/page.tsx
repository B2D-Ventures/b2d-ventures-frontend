'use strict';
'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import DOMPurify from 'dompurify'; 

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Input validation utilities
const inputValidation = {
  email: (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  },
  
  sanitizeInput: (input: string): string => {
    return DOMPurify.sanitize(input.trim());
  },

  // Prevent common SQL injection patterns
  hasSQLInjection: (input: string): boolean => {
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|union|select|insert|drop|update|delete|exec|execute|declare|create|alter)/i;
    return sqlInjectionPattern.test(input);
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced password requirements
  const passwordRequirements = [
    { regex: /.{8,}/, message: 'At least 8 characters long' },
    { regex: /[A-Z]/, message: 'At least one uppercase letter (A-Z)' },
    { regex: /[a-z]/, message: 'At least one lowercase letter (a-z)' },
    { regex: /[0-9]/, message: 'At least one number (0-9)' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'At least one special character (!@#$%^&*(),.?":{}|<>)' },
    { regex: /^[^\s]+$/, message: 'No whitespace allowed' }
  ];

  // Enhanced password validation
  const validatePassword = (password: string): boolean => {
    const errors = passwordRequirements
      .filter(req => !req.regex.test(password))
      .map(req => req.message);
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  // Enhanced input handling with validation
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = inputValidation.sanitizeInput(value);

    // Check for SQL injection attempts
    if (inputValidation.hasSQLInjection(value)) {
      setError('Invalid input detected');
      return;
    }

    // Email validation
    if (name === 'email' && value.length > 0) {
      if (!inputValidation.email(value)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    setError('');

    if (name === 'password') {
      validatePassword(sanitizedValue);
    }
  };

  // Enhanced form submission with rate limiting
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Input validation checks
      if (!inputValidation.email(formData.email)) {
        throw new Error('Invalid email format');
      }

      if (!captchaValue) {
        throw new Error('Please complete the CAPTCHA');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('Password does not meet the required criteria');
      }

      // Prepare sanitized payload
      const payload = {
        email: inputValidation.sanitizeInput(formData.email),
        password: formData.password, // Password should be hashed on the server
        captcha: captchaValue,
      };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'your-csrf-token', // Add CSRF protection
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      
      // Sanitize redirect URL
      const redirectUrl = inputValidation.sanitizeInput(
        formData.email === 'admin.b2d@gmail.com' ? '/admin-approve' : '/dashboard'
      );
      router.push(redirectUrl);

    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setCaptchaValue(null);
      }, 3000);
    }
  };


  function togglePassword() {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }
  function handleCaptchaChange(token: string | null): void {
    setCaptchaValue(token);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Confirm your password"
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

          {/* Password Requirements */}
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Password must contain:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {passwordRequirements.map((req, index) => (
                <li key={index} className={passwordErrors.includes(req.message) ? 'text-red-500' : 'text-green-500'}>
                  {req.message}
                </li>
              ))}
            </ul>
          </div>

          {/* reCAPTCHA Component */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Submit Button */}
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