import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function UserSettings({userData}) {
  const [activeTab, setActiveTab] = useState("general");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [dataToUpdate, setDataToUpdate] = useState({
    oldPass: "",
    newPass: ""
  });

  const handleSubmit = async () => {
    if(dataToUpdate.oldPass === "" || dataToUpdate.newPass === ""){
      setMessage("Please fill the fields");
    }
    try{
      const res = await axios.post("http://localhost:5000/users/update_security", {oldPass: dataToUpdate.oldPass, newPass: dataToUpdate.newPass, username: userData.username});
      if(res.status === 406){
        setMessage(res.data.message);
      } else if(res.status === 200){
        setMessage(res.data.message);;
      }
    } catch (error) {
        console.error("Error while updating password; Exception: " + error);
    }
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setMessage("");
    const {name, value} = e.target;
    setDataToUpdate((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }


  const deleteProfile = async () => {
    try{
      const res = await axios.delete("http://localhost:5000/users/delete_user", { data: {userData: userData}});
      if(res.status === 200){
        setTimeout(() => {
          navigate('/login');
          alert(res.data.message + " click OK to redirect to the login page");
        }, "3000");
      } 
    } catch (error) {
        console.error("Error while deleting profile; Exception: " + error);
    }
  }
  
  return (
    <>
        <div className='homepage-container'> 
          <div className='album-text'>
            <h1>Settings:</h1>
            <a href='/homepage'> Back &rarr;</a>
          </div>
          
          <div className='user-setting-div'>
            
            <div className='tab_settings'>
              <div>
                <button className={activeTab === "general" ? " active" : ""} onClick={() => setActiveTab('general')}> General </button>
              </div>
              <div>
                <button className={activeTab === "security" ? " active" : ""} onClick={() => setActiveTab('security')}> Security </button>
              </div>
              <div>
                <button className={activeTab === "delete_account" ? " active" : ""} onClick={() => setActiveTab('delete_account')}> Delete Account </button>
              </div>
            </div>

            <div>
              <div className='tab_content general'>
                {activeTab === "general" && 
                  <div>
                    <p>You can't change these information for now!</p>
                    <form>
                      <label> username </label>
                      <input type='text' value={userData ? userData.username : "not available"} disabled/><br/>
                      <label> email </label>
                      <input type='text'value={userData ? userData.email : "not available"} disabled/>
                      <button type='submit' className='button button2' disabled> submit </button> 
                    </form>
                  </div>
                }
              </div>
              
              <div className='tab_content general2'>
                {activeTab === "security" && 
                  <div>
                      {message ? (<div>{message}<br/></div>): ""}
                      
                      <label htmlFor="oldPass"> old password </label>
                      <input type='password' id="oldPass" name="oldPass" onChange={handleOnChange} required/><br/>
                      <label htmlFor="newPass"> new password </label>
                      <input type='password' id="newPass" name="newPass" onChange={handleOnChange} required/><br/>
                      <button className='button button2' onClick={handleSubmit}> submit</button> 
                    
                  </div>
                }
              </div>

              <div className='tab_content'>
                {activeTab === "delete_account" && 
                  <div>
                    You sure you want to delete your account?
                    <button className='button button3' onClick={deleteProfile}> submit</button> 
                  </div>
                }
              </div>
              
            </div>

          </div>
        </div>
    </>
  )
}

export default UserSettings