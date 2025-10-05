import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios';
const Authcontext = createContext();

const UserContext = ({ children }) => {
  const [userauth, setuserauth] = useState({
    user: null,
    token: ""
  })

  // default authorization
  axios.defaults.headers.common["Authorization"] = userauth.token;
  // useEffect(() => {
  //   if (userauth.token) {
  //     axios.defaults.headers.common["Authorization"] = userauth.token;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [userauth.token]);

  useEffect(() => {
    const userdata = localStorage.getItem("user")
    if (userdata) {
      const parsedata = JSON.parse(userdata)
      setuserauth({ ...userauth, user: parsedata.user, token: parsedata.token })
    }
  }, [])

  return (
      <Authcontext.Provider value={[userauth, setuserauth]}>
        {children}
      </Authcontext.Provider>
  )
}

// custom hook 
const useAuth = () => useContext(Authcontext);

export { useAuth, UserContext }