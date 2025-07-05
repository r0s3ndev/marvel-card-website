function Homepage({userData}) {
  const username = userData.username.toUpperCase();

  return (
    <>
      <div className='homepage-container'>
        <a href="/card_album">
          <div className="banner">
            <div className="overlay">
              <div className="text">Go to your album</div>
            </div>
          </div>
        </a>
        <h1>WELCOME {username}</h1>
        <div className='homepage'>

          <a href="/shop">
            <div className="homepage-box">
              {/* <div className="overlay"> */}
                <img img src="https://img.icons8.com/?size=100&id=TafoUW1yJcSk&format=png&color=FFFFFF" alt="logo"></img>
                <h2>Buy packs of cards!</h2>
                <button className="button button2">SHOP</button>
              {/* </div> */}
            </div>
          </a>

          <a href='/trade_list'>
            <div className="homepage-box">
                <img src="https://img.icons8.com/?size=100&id=Pa6jdXjtTbso&format=png&color=FFFFFF" alt="logo"></img>
                <h2>Trade your cards!</h2>
                <button className="button button2">TRADE</button>
            </div>
          </a>

          <a href='/user_settings'> 
            <div className="homepage-box">
              <img src="https://img.icons8.com/?size=100&id=uVgsZ6Ybur44&format=png&color=FFFFFF" alt="logo"></img>
              <h2>Settings</h2>
              <button className="button button2">SETTING</button>
            </div>
          </a>

        </div>
      </div>
    </>
  )
}

export default Homepage