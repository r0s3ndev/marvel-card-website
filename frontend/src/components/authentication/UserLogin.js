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
      <div className='login-container'>
          <a href="/">Home</a>
          <div className='page-wrapper'>
            <div className=' login-page page1'>
                <h1>Login</h1>
                {message} <br/>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username" onChange={handleOnChange} required/><br/>
                <label htmlFor="password">password:</label><br/>
                <input type="password" id="password" name="password" onChange={handleOnChange}/>
                <br/>
                <button className="next-button" onClick={handleLogin}>Login</button>
                <p>Need an account? <a href='/register'> register</a> here.</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default UserLogin