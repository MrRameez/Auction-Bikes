import { Button, message } from 'antd';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../utiles/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginButton from '../../component/loginButton';

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      message.error("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        uid: user.uid,
      });

      message.success("Sign-up successful! Redirecting...");
      navigate("/");
    } catch (err) {
      setError(err.message);
      message.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 h-full flex justify-center items-center">
        <div className="grid lg:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          
          {/* Left column with image */}
          <div className="hidden lg:block">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full h-auto rounded-lg"
              alt="Sample image"
            />
          </div>

          {/* Right column for the sign-up form */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
              Sign Up for an Account
            </h2>
            <form className="space-y-6">
              {/* Sign up with Google */}
              <div className="text-center">
                <Button
                  onClick={handleGoogleLogin}
                  type="primary"
                  size="large"
                  className="w-full lg:w-auto bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 text-white rounded-full"
                >
                  Login With Google
                </Button>
              </div>

              {/* Or separator */}
              <div className="flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Or sign up with your email</span>
              </div>

              {/* Username input */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>

              {/* Register button */}
              <div className="text-center">
                <LoginButton
                  text={"Sign Up"}
                  isLoading={loading}
                  className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleSignUp}
                />
              </div>

              {/* Login redirect */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Have an account?{" "}
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
