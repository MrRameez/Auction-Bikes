import { useContext } from 'react'
import { AuthContext } from '../../contaxt/AuthContaxt';
import { Button } from 'antd';

function UserProfile() {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <h1 className='font-bold text-3xl'>Hello {user.username || user.displayName}</h1>
      <Button>Logout</Button>
    </div>
  )
}

export default UserProfile;
