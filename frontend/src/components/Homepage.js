function Homepage({userData, BACKUP}) {
  const username = userData.username.toUpperCase();

  return (
    <>
      <div className='homepage-container'>
        <a href="/card_album">
          <div className="banner">
            <div class="overlay">
              <div class="text">Go to you album</div>
            </div>
          </div>
        </a>
        <h1>WELCOME {username}</h1>
        <div className='homepage'>

          <div className="test">
            <a href="/#">
              <div>SHOP </div>
              {/* <div className='image-div'>
                <a href='/card_album'>
                  <p className='image-id'>{userData.cards[0].species}</p>
                  <img className="card-img" alt={userData.cards[0].name} src={userData.cards[0].image ? userData.cards[0].image : BACKUP.IMG}/>
                  <p className='image-text' >{userData.cards[0].name}</p>
                </a>
              </div> */}
              <img src="https://img.icons8.com/?size=100&id=TafoUW1yJcSk&format=png&color=FFFFFF" alt="logo"></img>

            </a>
          </div>

          <div className="test">
            <a href='/trade_list'>
              <div>
                TRADE
              </div>
              <img src="https://img.icons8.com/?size=100&id=Pa6jdXjtTbso&format=png&color=FFFFFF" alt="logo"></img>
            </a>
          </div>

          <div className="test">
             <a href='/trade_list'>
             <div> SETTING </div>
             <img src="https://img.icons8.com/?size=100&id=uVgsZ6Ybur44&format=png&color=FFFFFF" alt="logo"></img>
             </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage