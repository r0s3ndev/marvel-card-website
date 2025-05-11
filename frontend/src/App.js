import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardPack from "./components/boostershop/CardPack";
import Homepage from "./components/Homepage";
import Testing from "./components/Testing";
import Main from "./components/Main";
import UserRegister from "./components/authentication/UserRegister";
import UserLogin from "./components/authentication/UserLogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useContext, useState } from "react";
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

const BACKUP = {
  DESC : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  IMG : "https://images.desenio.com/zoom/wb0012-8harrypotter-hogwartscrest50x70-60944-71911.jpg"
}
function App() {
  const [randomCharRegister, setRandomCharRegister] = useState();
  const [randomCharBooster, setRandomCharBooster] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const [updatedData, setUpdatedData] = useState(false);
  const [confirmTradeData, setConfirmTradeData] = useState();



  //randomize card
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //fetch available cards
  const fetchCard = async () => {
    console.log("isFetchingCard...");
    try {
      const res = await axios.get("http://localhost:5000/api/characters");
      const characterData = res.data;

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

  const registerUser = async (registerData) => {
    const res = await axios.post("http://localhost:5000/users/register", registerData);
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
      setUserData(prev => ({ ...prev, ...res.data}));
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...res.data }));
      // setUserData(prev => {
      //   if (JSON.stringify(prev) === JSON.stringify(res.data)) {
      //       return prev; // No update if data is the same
      //   }
      //   const updatedUser = { ...prev, ...res.data };
      //   localStorage.setItem("userData", JSON.stringify(updatedUser));
      //   return updatedUser;
      // });
      //to add loading effect on cardPack component
      setUpdatedData(true);
      return res;
      
    } catch (error) {
      throw error;
    }
  }


  const open_pack_and_update_data = async (pack_id, i) => {
    try{
      
      setUpdatedData(true);
      const fetchRes = await fetchCard();
      if(fetchRes) {
        const res = await axios.post("http://localhost:5000/users/update_pack_and_data", {username: userData.username, pack_id: pack_id, amount: i, cards: fetchRes});
        setUserData(prev => ({ ...prev, ...res.data}));
        localStorage.setItem("userData", JSON.stringify({ ...userData, ...res.data }));
        // setUserData(prev => {
        //   if (JSON.stringify(prev) === JSON.stringify(res.data)) {
        //       return prev; // No update if data is the same
        //   }
        //   const updatedUser = { ...prev, ...res.data };
        //   localStorage.setItem("userData", JSON.stringify(updatedUser));
        //   return updatedUser;
        // });
        console.log(res);
      }
    
      
    } catch (error) {
      throw error;
    }
  }

  const sell_card_for_credits = async (c_id) => {
    try{
      setUpdatedData(true);
      const res = await axios.post("http://localhost:5000/users/sell_card", {c_id: c_id, username : userData.username, amount: 1});
      setUserData(prev => ({ ...prev, ...res.data}));
      localStorage.setItem("userData", JSON.stringify({ ...userData, ...res.data }));
    } catch(error) {
      return error.response;
    }
  } 
  
  const select_card_to_trade = (selected_card) => {
    localStorage.setItem("cardTrade", JSON.stringify(selected_card));  
  }

  const update_security = async (updateData) => {
    const {oldPass, newPass} = updateData;
    try{
      const res = await axios.post("http://localhost:5000/users/update_security", {oldPass: oldPass, newPass: newPass, username: userData.username});
      return res;
    } catch(error) {
      return error.response;
    }
  }

  const delete_account = async () => {
    try{
      const res = await axios.delete("http://localhost:5000/users/delete_user", { data: {userData: userData}});
      return res;
    } catch(error) {
      return error.response;
    }
  }

  const create_trade = async (trade_obj) => {
    try{
      console.log("creating trade", trade_obj);
      const res = await axios.post("http://localhost:5000/users/create_trade", trade_obj);
      console.log(res);

    } catch(error) {
      return error.response;
    }
  }

  const get_trade = async () => {
    try{
      const res = await axios.get("http://localhost:5000/users/get_trades");
      return res;

    } catch(error) {
      return error.response;
    }
  }

  const get_trade_confirm_info = () => {

  }



  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/register" element={<UserRegister randomCharRegister={randomCharRegister} fetchCard={fetchCard} check_user_before_next_page={check_user_before_next_page} registerUser={registerUser} BACKUP={BACKUP}/>}/>
            <Route path="/login" element={<UserLogin loginUser={loginUser}/>}/>
          
          
           {/* to protect */}
            
           <Route path="/homepage" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <Homepage  userData={userData} BACKUP={BACKUP} />
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/shop" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <CardPack updatedData={updatedData} update_credits_and_data={update_credits_and_data}/>
                </NavBarLayout>
              </ProtectedRoute>
              }
            />

            <Route path="/profile" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <UserProfile items={userData.items} userData={userData} randomCharBooster={randomCharBooster}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/card_album" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <UserAlbum select_card_to_trade={select_card_to_trade} updatedData={updatedData} userData={userData} sell_card_for_credits={sell_card_for_credits} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />
            
            <Route path="/trade_create_section" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <TradeCreateSection userData={userData} create_trade={create_trade} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/trade_confirm_section" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <TradeConfirmSection userData={userData} confirmTradeData={confirmTradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/trade_list" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <TradeList get_trade={get_trade} setConfirmTradeData={setConfirmTradeData} BACKUP={BACKUP}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/user_items" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <UserItems updatedData={updatedData} userData={userData} open_pack_and_update_data={open_pack_and_update_data}/>
                </NavBarLayout>
              </ProtectedRoute>
            }
            />

            <Route path="/user_settings" element={
              <ProtectedRoute>
                <NavBarLayout userData={userData} logoutUser={logoutUser}> 
                  <UserSettings userData={userData} update_security={update_security} delete_account={delete_account}/>
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
