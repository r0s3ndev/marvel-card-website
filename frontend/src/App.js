import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPack from "./components/boostershop/CardPack";
import Homepage from "./components/Homepage";
import Testing from "./components/Testing";
import Main from "./components/Main";
import UserRegister from "./components/authentication/UserRegister";
import UserLogin from "./components/authentication/UserLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import NavBarLayout from "./components/NavBarLayout";
import UserProfile from "./components/userprofile/UserProfile";
import UserAlbum from "./components/userprofile/UserAlbum";
import TradeSection from "./components/tradecenter/TradeSection";
import UserItems from "./components/userprofile/UserItems";


function App() {
  const [randomCharRegister, setRandomCharRegister] = useState();
  const [randomCharBooster, setRandomCharBooster] = useState();
  // const [userData, setUserData] = useState([]);
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [updatedData, setUpdatedData] = useState(false);
  const [credits, setCredits] = useState(userData.credits);
  const isFetchingUser = useRef(true);

  //randomize card
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (isFetchingUser.current) {
      isFetchingUser.current = false;
      return; // Skip first render
    }
    console.log("isFetchingUser...");

    const fetchData = async () => {
      try{
        const userRes = userData ? await axios.post("http://localhost:5000/users/getUser", {username: userData.username}) : null;
        //simulate a loading effect
        setTimeout(() => {
          setUpdatedData(false);
        }, "2000");
          
        if(userRes){
          localStorage.setItem("userData", JSON.stringify({ ...userData, items: userRes.data.items }));
        }

      } catch(e) {
        console.error("Error fetching user data:", e);
      } finally {
        isFetchingUser.current = true;
      }
    }

    fetchData();
  }, [userData]);


  //fetch available cards
  const fetchCard = async () => {
    console.log("isFetchingCard...");
    try {
      const res = await axios.get("http://localhost:5000/api/characters");
      const characterData = res.data;
      console.log("characterData ", characterData);

      //ramdomize character shown in the registration from
      const randomCharRegisterSelection = shuffleArray(characterData).slice(0, 3);
      setRandomCharRegister(randomCharRegisterSelection);

      //randomize character that will show during opening pack
      const randomCharBoosterSelection = shuffleArray(characterData).slice(0, 5);
      setRandomCharBooster(randomCharBoosterSelection);

      return randomCharBoosterSelection;
    } catch (error) {
      throw error;
    }
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



  //update data in the DB
  const update_credits_and_data = async (pack, i) => {
    try{
      const res = await axios.post("http://localhost:5000/users/update_credits_and_data", {username: userData.username, pack: pack, amount: i});
      setCredits(res.data.credits);
      setUserData(prev => ({ ...prev, credits: res.data.credits}));
      localStorage.setItem("userData", JSON.stringify({ ...userData, credits: res.data.credits }));
      //to add loading effect on cardPack component
      setUpdatedData(true);
      return res;
      
    } catch (error) {
      throw error;
    }
  }


  const open_pack_and_update_data = async (pack_id, i) => {
    try{
      
      console.log(userData.items[pack_id - 1].amount);
      // const fetchRes = await fetchCard();
      // if(fetchRes) {
        
      //   const res = await axios.post("http://localhost:5000/users/update_pack_and_data", {username: userData.username, pack_id: pack_id, amount: i, cards: fetchRes});
      //   setUserData(prev => ({ ...prev, credits: res.data.credits}));
      //   localStorage.setItem("userData", JSON.stringify({ ...userData, credits: res.data.credits }));
      // }
      
      
    } catch (error) {
      throw error;
    }
  }


  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<UserRegister randomCharRegister={randomCharRegister} fetchCard={fetchCard} check_user_before_next_page={check_user_before_next_page} registerUser={registerUser}/>}/>
            <Route path="/login" element={<UserLogin loginUser={loginUser}/>}/>
          
          
           {/* to protect */}
            
           <Route path="/homepage" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <Homepage  userData={userData} />
                </NavBarLayout>
              // </ProtectedRoute>
            }
            />

            <Route path="/shop" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <CardPack updatedData={updatedData} update_credits_and_data={update_credits_and_data}/>
                </NavBarLayout>
              // </ProtectedRoute>
              }
            />

            <Route path="/profile" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <UserProfile items={userData.items} userData={userData} randomCharBooster={randomCharBooster}/>
                </NavBarLayout>
              // </ProtectedRoute>
            }
            />

            <Route path="/card_album" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <UserAlbum userData={userData}/>
                </NavBarLayout>
              // </ProtectedRoute>
            }
            />
            
            <Route path="/trade_section" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <TradeSection userData={userData}/>
                </NavBarLayout>
              // </ProtectedRoute>
            }
            />

            <Route path="/user_items" element={
              // <ProtectedRoute>
                <NavBarLayout credits={credits} userData={userData} logoutUser={logoutUser}> 
                  <UserItems userData={userData} randomCharBooster={randomCharBooster} open_pack_and_update_data={open_pack_and_update_data}/>
                </NavBarLayout>
              // </ProtectedRoute>
            }
            />
            <Route path="/test" element={<Testing/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
