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
        <div className='main-container'> 
          <div style={{display: "flex"}}>
            
            <div className='tab_settings'>
              <div>
                <button className={activeTab === "general" ? "tab active" : "tab"} onClick={() => setActiveTab('general')}> General </button>
              </div>
              <div>
                <button className={activeTab === "security" ? "tab active" : "tab"} onClick={() => setActiveTab('security')}> Security </button>
              </div>
              <div>
                <button className={activeTab === "delete_account" ? "tab active" : "tab"} onClick={() => setActiveTab('delete_account')}> Delete Account </button>
              </div>

            </div>

            <div>

              <div className='tab_content'>
                {activeTab === "general" && 
                  <div>
                    <form>
                      <label> username </label>
                      <input type='text' value={userData ? userData.username : "not available"} disabled/><br/>
                      <label> email </label>
                      <input type='text'value={userData ? userData.email : "not available"} disabled/>
                      <input type='submit' value='submit' disabled/> 
                    </form>
                  </div>
                }
              </div>
              <div className='tab_content'>
                {activeTab === "security" && 
                  <div>
                      {message ? (<div>{message}<br/></div>): ""}
                      
                      <label htmlFor="oldPass"> old password </label>
                      <input type='password' id="oldPass" name="oldPass" onChange={handleOnChange} required/><br/>
                      <label htmlFor="newPass"> new password </label>
                      <input type='password' id="newPass" name="newPass" onChange={handleOnChange} required/><br/>
                      <button  onClick={handleSubmit}> submit</button> 
                    
                  </div>
                }
              </div>
              <div className='tab_content'>
                {activeTab === "delete_account" && 
                  <div>
                    You sure you want to delete your account?
                    <button  onClick={deleteProfile}> submit</button> 
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