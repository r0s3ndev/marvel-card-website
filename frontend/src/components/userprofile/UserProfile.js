import React from 'react'

function UserProfile({userData}) {
  return (
    <>
        <div>
            <div className='user-profile-div'>
                <h1> {userData.username} profile</h1>
                <div>
                    {/* album section */}
                    album
                </div>
                <div>
                    {/* sell &  trade */}
                    trade & sell
                </div>
                <div>
                    {/* pefile settings */}
                    prfile setting
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfile