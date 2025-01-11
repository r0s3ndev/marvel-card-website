import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPack from "./components/boostershop/CardPack";
import Homepage from "./components/Homepage";
import Testing from "./components/Testing";
import Main from "./components/Main";
import UserRegister from "./components/authentication/UserRegister";
import UserLogin from "./components/authentication/UserLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import NavBarLayout from "./components/NavBarLayout";
import UserProfile from "./components/userprofile/UserProfile";


function App() {
  const [randomCharRegister, setRandomCharRegister] = useState();
  const [randomCharBooster, setRandomCharBooster] = useState();
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [credits, setCredits] = useState(userData.credits);

  const update_user_data = async () => {
    console.log("current credits ",credits);
    await axios.post("http://localhost:5000/users/update-credits", {credits: credits});
  }


  //Sign-in & sing-up API
  const check_user_before_next_page = async (userData) => {
    try{
      const res = await axios.post("http://localhost:5000/users/check_user", userData);
      return res;
    } catch (error) {
      throw error;
    }
  }

  const registerUser = async (userData) => {
    const res = await axios.post("http://localhost:5000/users/register", userData);
    return res;
  }

  const loginUser = async (loginData) => {
    const res = await axios.post("http://localhost:5000/users/login", loginData, {
      withCredentials: true
    });
    setUserData(res.data.user);
    localStorage.setItem("userData", JSON.stringify(res.data.user));
    return res;
  }

  const logoutUser = async () => {
    try{
      const res = await axios.post("http://localhost:5000/users/logout", {}, {withCredentials: true});
      return res;
    } catch (error) {
      throw error;
    }
  }




  //randomize card
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  //fetch all cards available
  useEffect((e) => {
      axios.get("http://localhost:5000/api/characters")
      .then((res) => {
          const characterData = res.data;

          // //get only character with descrption and photo
          // const filteredCharacter = characterData.filter((data) => data.description !== "" && !data.thumbnail.path.includes("image_not_available"));
          const randomCharRegisterSelection = shuffleArray(characterData).slice(0, 3);
          const randomCharBoosterSelection = shuffleArray(characterData).slice(0, 5);

          setRandomCharRegister(randomCharRegisterSelection);
          setRandomCharBooster(randomCharBoosterSelection);
      })
      .catch((err) => {
          console.error("error: ", err);
      })
  }, []);

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<UserRegister randomCharRegister={randomCharRegister} check_user_before_next_page={check_user_before_next_page} registerUser={registerUser}/>}/>
            <Route path="/login" element={<UserLogin loginUser={loginUser}/>}/>
          
          
           {/* to protect */}
            
           <Route path="/homepage" element={
              <ProtectedRoute>
                <NavBarLayout credits={credits} logoutUser={logoutUser}> 
                  <Homepage  userData={userData} />
                </NavBarLayout>
              </ProtectedRoute>}
            />

            <Route path="/shop" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} logoutUser={logoutUser}> 
                  <CardPack update_user_data={update_user_data} credits={credits} setCredits={setCredits} randomCharBooster={randomCharBooster}/>
                </NavBarLayout>
              // </ProtectedRoute>
              }
            />

            <Route path="/profile" element={
              <ProtectedRoute>
                <NavBarLayout credits={credits} logoutUser={logoutUser}> 
                  <UserProfile userData={userData} randomCharBooster={randomCharBooster}/>
                </NavBarLayout>
              </ProtectedRoute>}
            />

            <Route path="/test" element={<Testing/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
