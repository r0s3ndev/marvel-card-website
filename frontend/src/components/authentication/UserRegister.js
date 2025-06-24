import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from "axios";


function UserRegister({fetchCard, BACKUP}) {
    const navitage = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cardlist, setCardList] = useState([]);
    const [message, setMessage] = useState("");
    const [userChecked, setUserChecked] = useState(false);
    const [nextPage, setNextPage] = useState(true);
    const [userData, setUserData] = useState(
        {
            username: "",
            email: "",
            password: "",
            cards: []
        }
    );

    useEffect(()=>{
        async function fetchData() {
            const res = await fetchCard("register");
            setCardList(res);
        }
        fetchData();
    }, []);

    const handleUserCheckAndToggle = async (e) => {
        e.preventDefault();
        if(!userChecked){
            try{
                const res = await axios.post("http://localhost:5000/users/check_user", userData);
                if(res.status === 200){
                    setUserChecked(true);
                    setNextPage(!nextPage);
                    setMessage("");
                    setTimeout(()=>{
                        setLoading(true);
                    }, 1000);
                }
                setLoading(false);
            } 
            catch (error) {
                if(error.status && error.response.status === 409){
                    setMessage(error.response.data.message);
                } else if(error.response.status === 400) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(error.response.data.message);
                }
            }  
        } else {
            setUserChecked(false);
            setNextPage(!nextPage);
        }
        
    };

    const handleChange = (e) => {
        e.preventDefault();
        setMessage("");
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSelectedCard = (card) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            cards: [...prevUserData.cards, card]
        }));
    }
    
    const handleSubmit = async () => {
        try{
            const res = await axios.post("http://localhost:5000/users/register", userData);
            if(res.status === 201){
                setMessage("Loading...");
                setTimeout(() => {
                    navitage('/login');
                    setUserChecked(false);
                }, "1000");
            }
        } catch (error) {
            if(error.status === 409){
                setMessage("username or email already taken.");
            } else {
                setMessage(error.message);
            }
        }   
    };

    return (
        <div className="main-div register-container">
            <div className="inner-main-div">
                <div className='page-wrapper'>
                    <br/>
                    <div className='register'>
                        <div className='home-link'>
                            <a href="/"> &#8592; Home</a>
                        </div>
                        <div className={`page page1 ${nextPage ? "fade-in" : "fade-out"}`}>
                            <h1>Register</h1>
                            <p style={{color: message ? "orange" : ""}}>{message ? message : "Register your email to gain access!"}</p>
                            <label htmlFor="username">Username:</label><br/>
                            <input size="40" type="text" id="username" name="username" value={userData.username} onChange={handleChange} required/><br/>
                            <br/>
                            <label htmlFor="email">Email add:</label><br/>
                            <input size="40" type="text" id="email" name="email" value={userData.email} onChange={handleChange} required/><br/>
                            <br/>
                            <label htmlFor="password">Password:</label><br/>
                            <input size="40" type="password" id="password" name="password" value={userData.password} onChange={handleChange} required/>
                            <br/>
                            <br/>
                            <button onClick={handleUserCheckAndToggle} className="button button1">Next</button>
                            <p> Already have an account? <a href='/login'>Login</a> here.</p>
                        </div>
                    
                        {!loading ? (
                            <></>
                        ) : (
                            <div className='register-nextPage'>
                                <div className={`page page2 ${nextPage ? "fade-out" : "fade-in"}`}>
                                    <h1>Select a card...</h1>
                                    <p style={{color: "orange"}}>{message}</p>
                                    <div className='card-div'>
                                        {cardlist.map((card) => (
                                            <div 
                                            key={card.id} 
                                            className='card-register-div' 
                                            style={{ 
                                                backgroundImage: `linear-gradient(rgba(184, 103, 103, 0), rgba(121, 17, 17, 0.53), rgba(58, 4, 4, 0.85)), url(${card.image ? card.image : BACKUP.IMG})`,
                                                backgroundSize: 'contain'
                                                }}
                                            onClick={()=> handleSelectedCard(card)}
                                            tabIndex="0"
                                            >
                                                <p style={{textAlign: 'right', color: 'white', textDecoration: 'underline overline'}}>{card.id}</p>
                                                <div className='card-name-desc'>
                                                    <h2 style={{textTransform: 'uppercase'}}>{card.name}</h2>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleUserCheckAndToggle} className="button button1 next-button">Back</button>
                                    <button className="button button1 register-button" onClick={handleSubmit}>Register</button>
                                </div>
                            </div>
                        )}    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegister

