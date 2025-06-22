import { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';

function UserLogin({setUserData}) {
  const navigate  = useNavigate();
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  }); 

  const handleOnChange = (e) => {
    e.preventDefault();
    setMessage("");
    const {name, value} = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:5000/users/login", loginData, {
        withCredentials: true
      });

      if(res.status === 200){
        setUserData(res.data.user);
        setMessage(res.data.message);
        setTimeout(() => {
            navigate('/homepage');
        }, "3000");
      }
    } 
    catch (error) {
      setMessage(error.response.data.message);
    }   
  }

  return (
    <>
      <div className='main-div login-page'>
        <div className='inner-main-div'>
          <div className='home-link'>
            <a href="/"> &#8592; Home</a>
          </div>
          <br/>
          <div className='login'>
              <h1>Login</h1>
              <p>{message ? message : "Welcome back, log-in with your account!"} </p>
              <label htmlFor="username">Username:</label><br/>
              <input size="40" type="text" id="username" name="username" onChange={handleOnChange} required/><br/>
              <br/>
              <label htmlFor="password">Password:</label><br/>
              <input size="40" type="password" id="password" name="password" onChange={handleOnChange}/>
              <br/>
              <br/>
              <button className="button button1" onClick={handleLogin}>Login</button>
              <p>Need an account? <a href='/register'> register</a> here.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLogin