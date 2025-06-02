import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Testing from "./components/Testing";
import Main from "./components/Main";
import UserRegister from "./components/authentication/UserRegister";
import UserLogin from "./components/authentication/UserLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import NavBarLayout from "./components/NavBarLayout";
import UserProfile from "./components/userprofile/UserProfile";
import UserAlbum from "./components/userprofile/UserAlbum";
import TradeCreateSection from "./components/tradecenter/TradeCreateSection";
import UserItems from "./components/userprofile/UserItems";
import UserSettings from "./components/userprofile/UserSettings";
import TradeList from "./components/tradecenter/TradeList";
import TradeConfirmSection from "./components/tradecenter/TradeConfirmSection";
import { UserContext } from "./components/UserProvider";
import CardsShop from "./components/shop/CardsShop";

const BACKUP = {
  DESC : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  IMG : "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"
}
function App() {
  const { userData, setUserData } = useContext(UserContext);
  const { tradeData, setTradeData } = useContext(UserContext);
  const [onCreateTradeData, setOnCreateTradeData] = useState(() => {
    const storedData = localStorage.getItem("onCreateTradeData");
    return storedData ? JSON.parse(storedData) : [];
  });

  console.log("Check data for creating a trade ", onCreateTradeData );
  //initialize the variable in localstorage 
  useEffect(()=> {
    const setCreateTradeData = () => {
      localStorage.setItem("onCreateTradeData", JSON.stringify(onCreateTradeData));
    }
    setCreateTradeData();
  }, [onCreateTradeData]);
  
  //fetch most recent data 
  useEffect(()=>{
    const getTrade = async () =>{
      const res = await axios.get("http://localhost:5000/users/get_trades");
      setTradeData(res.data.item);
    }
    const getUserData = async () =>{
      const res = await axios.get("http://localhost:5000/users/getUser", {
        params: {username: userData.username},
        withCredentials: true
      });
      setUserData(res.data);
    }

    getTrade();
    getUserData();
  }, []);

  
  //randomize card
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //fetch available cards
  const fetchCard = async (mode) => {
    console.log("isFetchingCard...");
    try {
      const res = await axios.get("http://localhost:5000/api/characters");
      const characterData = res.data;

      if(mode === "register"){
        //ramdomize character shown in the registration from
        const randomCharRegisterSelection = shuffleArray(characterData).slice(0, 3);
        return randomCharRegisterSelection;
      }

      if(mode === "user_item"){
      //randomize character that will show during opening pack
        const randomCharBoosterSelection = shuffleArray(characterData).slice(0, 5);
        return randomCharBoosterSelection;
      }

    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<UserRegister fetchCard={fetchCard} BACKUP={BACKUP}/>}/>
            <Route path="/login" element={<UserLogin setUserData={setUserData}/>}/>
          
          
           {/* to protect */}
            
           <Route path="/homepage" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <Homepage  userData={userData} BACKUP={BACKUP} />
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/shop" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <CardsShop userData={userData} setUserData={setUserData}/>
                </NavBarLayout>
              </ProtectedRoute>
              }
            />

            <Route path="/profile" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <UserProfile items={userData} userData={userData}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/card_album" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <UserAlbum userData={userData} setUserData={setUserData} tradeData={tradeData} setOnCreateTradeData={setOnCreateTradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />
            
            <Route path="/trade_create_section" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <TradeCreateSection userData={userData} tradeData={tradeData} onCreateTradeData={onCreateTradeData} setOnCreateTradeData={setOnCreateTradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/trade_confirm_section" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <TradeConfirmSection userData={userData} tradeData={tradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/trade_list" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <TradeList userData={userData} tradeData={tradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/user_items" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <UserItems userData={userData} setUserData={setUserData} fetchCard={fetchCard}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/user_settings" element={
              <ProtectedRoute>
                <NavBarLayout> 
                  <UserSettings userData={userData}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />
            <Route path="/test" element={<Testing/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
