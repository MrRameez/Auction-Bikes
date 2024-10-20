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
    <section className="h-screen container">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column with image */}
          <div className="shrink-1 mb-12 grow-0 basis-auto md:w-9/12 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* Right column for the sign-up form */}
          <div className="md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              {/* Sign up with Google */}
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <p className="text-lg me-4">Sign up with</p>
                <Button
                  onClick={handleGoogleLogin}
                  type="primary"
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 w-full lg:w-auto"
                >
                  Login With Google
                </Button>
              </div>

              {/* Or separator */}
              <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 text-center font-semibold dark:text-white">Or</p>
              </div>

              {/* Username input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer block w-full rounded bg-transparent px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear dark:text-white dark:placeholder:text-neutral-300"
                  placeholder="Username"
                />
              </div>

              {/* Email input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full rounded bg-transparent px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear dark:text-white dark:placeholder:text-neutral-300"
                  placeholder="Email address"
                />
              </div>

              {/* Password input */}
              <div className="relative mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full rounded bg-transparent px-3 py-2 leading-[2.15] outline-none transition-all duration-200 ease-linear dark:text-white dark:placeholder:text-neutral-300"
                  placeholder="Password"
                />
              </div>

              {/* Register button */}
              <div className="text-center lg:text-left">
                <LoginButton text={"Sign Up"} isLoading={loading} onClick={handleSignUp} />

                {/* Login redirect */}
                <p className="mt-2 pt-1 text-sm font-semibold">
                  Have an account?
                  <Link to="/login" className="text-danger transition duration-150 ease-in-out hover:text-danger-600">
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
