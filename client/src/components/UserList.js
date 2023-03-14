import { useEffect, useState } from "react"
import UserInfo from "./UserInfo"
import React from 'react'
// import UserDetail from './UserDetail'

function UserList() {

    const [userList, setUserList] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(null)


    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(users => setUserList(users))
    }, [])

    function handleUserClick(id) {
        setSelectedUserId(id)
    }

    return(
        <div>
            <h1>
               Reviewers
            </h1>
            <div className="container-fluid">
                <div className="row">
                    {userList.length > 0 ? userList.map(user => <UserInfo key={user.id} user={user} onUserClick={handleUserClick} />) : null}
                </div>
                {/* {selectedUserId && <UserDetail id={selectedUserId} />} */}
            </div>
        </div>
    )
}

export default UserList