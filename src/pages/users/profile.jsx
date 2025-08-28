import { useContext } from 'react'
import { AuthContext } from '../../contaxt/AuthContaxt';
import { Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../../utiles/firebase';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function UserProfile() {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();
  const handleSignOut = async () => {
      await signOut(auth);
      navigate("/");
    };

    useEffect(() => {
          if (!auth.currentUser) {
            navigate("/login");
          }
        }, [navigate]);
  return (
    <div>
      <h1 className='font-bold text-3xl'>Hello {user.username || user.displayName}</h1>
      <Button
      onClick={handleSignOut} 

      >Logout</Button>
    </div>
  )
}

export default UserProfile;
