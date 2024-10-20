import { Button, message } from 'antd';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../utiles/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../../component/loginButton';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Google login function
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user information in Firestore
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, {
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
        displayName: user.displayName,
      });

      // Navigate to home after login
      navigate("/");
      message.success("Account Created. Redirecting to home...");
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  // Email/password login function
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <section className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Image Section */}
          <div className="hidden w-1/2 lg:block">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Right Login Form Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800 dark:text-white">
              Sign In
            </h2>

            <div className="flex items-center justify-center mb-6">
              <Button
                onClick={handleGoogleLogin}
                type="primary"
                size="large"
                className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full lg:w-auto"
              >
                Login With Google
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="block h-px bg-gray-300 dark:bg-gray-600 w-1/3"></span>
              <p className="text-sm text-gray-500 dark:text-gray-300">OR</p>
              <span className="block h-px bg-gray-300 dark:bg-gray-600 w-1/3"></span>
            </div>

            <form>
              {/* Email input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle email input change
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Password input */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Handle password input change
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Show Password Checkbox */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                  className="w-4 h-4 mr-2 text-blue-500 rounded focus:ring-blue-500 focus:ring-opacity-25"
                />
                <label
                  htmlFor="showPassword"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Show Password
                </label>
              </div>

              {/* Display Error Message */}
              {error && (
                <div className="text-red-500 text-center mb-4">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <LoginButton text={"Login"} isLoading={loading} onClick={handleLogin} />
              </div>

              {/* Register Link */}
              <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signin" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
