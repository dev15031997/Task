import React from 'react'
import { useAuth } from './UserContext'

const Home = () => {
 const [userauth] = useAuth(); 

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      flexDirection: 'column',
      textAlign: 'center'
    }}>
       {
        userauth?.user ? (
          <div>
            <h1>Welcome back, {userauth.user.name} 😊!</h1>
          </div>
        ) : (
          <div>
            <h1>Hi there!</h1>
            <p>Please log in to continue.</p>
          </div>
        )
      }
    </div>
  )
}

export default Home