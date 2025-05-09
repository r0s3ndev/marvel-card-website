import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';


function UserRegister({randomCharRegister, fetchCard, check_user_before_next_page, registerUser, BACKUP}) {
    const navitage = useNavigate();
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
        fetchCard();
    }, []);

    const handleUserCheckAndToggle = async (e) => {
        e.preventDefault();
        if(!userChecked){
            try{
                const res = await check_user_before_next_page(userData);
                if(res.status === 200){
                    setUserChecked(true);
                    setNextPage(!nextPage);
                    setMessage("");
                }
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
            await registerUser(userData); 
            setMessage("Loading...");
            setTimeout(() => {
                navitage('/login');
                setUserChecked(false);
            }, "3000");
        } 
        catch (error) {
            if(error.status === 409){
                setMessage("username or email already taken.");
            } else {
                setMessage(error.message);
            }
        }   
    };

    return (
        <div className="register-container">
            <a href="/">Home</a>
            <div className="page-wrapper">

                    <div className={`page page1 ${nextPage ? "fade-in" : "fade-out"}`}>
                        <h1>Register</h1>
                        <p style={{color: "orange"}}>{message}</p>
                        <label htmlFor="username">Username:</label><br/>
                        <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} required/><br/>
                        <label htmlFor="email">Email:</label><br/>
                        <input type="text" id="email" name="email" value={userData.email} onChange={handleChange} required/><br/>
                        <label htmlFor="password">password:</label><br/>
                        <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required/>
                        <br/>
                        <button onClick={handleUserCheckAndToggle} className="next-button">Next</button>
                        <p> Already have an account? <a href='/login'>login</a> here.</p>
                    </div>
                    
                    {!randomCharRegister ? (
                        <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    ) : (
                        <div className={`page page2 ${nextPage ? "fade-out" : "fade-in"}`}>
                            <h1>Select a card...</h1>
                            <p style={{color: "orange"}}>{message}</p>
                            <div className='card-div'>
                                {randomCharRegister.map((card) => (
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
                            <button onClick={handleUserCheckAndToggle} className="next-button">Back</button>
                            <button className="register-button" onClick={handleSubmit}>Register</button>
                        </div>
                    )}    
            </div>
        </div>
    )
}

export default UserRegister

