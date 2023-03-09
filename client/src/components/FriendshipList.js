import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FriendshipDetail from './FriendshipDetail';

function FriendshipList({ onShowDetails, displayInfo, currentUser, setCurrentUser}) {



  function onDeleteFriendship(friendshipId) {
    fetch('/friendships/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({friend_id: friendshipId})
        
    })
        .then(res => res.json())
        .then((userObj) => setCurrentUser(userObj))
        .catch((error) => alert(error))

//     fetch(`/friendships/${friendshipId}`, {
//       method: 'DELETE',
//     }).then(response => {
//       if (response.ok) {
//         setFriendships(prevFriendships =>
//           prevFriendships.filter(friendship => friendship.id !== friendshipId)
//         );
//       } else {
//         console.log('Failed to delete friendship.');
//       }
//     });
  }

  return (
    <div>
        <h2>Pending Friendship Requests</h2>
        <ul>
            {currentUser.pending_received_friendships_requests.map(friendship => (

            <li key={friendship.id}>
                <Link className="nav-link" to={`/users/${friendship.sender.id === currentUser.id ? friendship.recipient.id : friendship.sender.id}`}>
                    <h3>{friendship.sender.id === currentUser.id ? friendship.recipient.name : friendship.sender.name}</h3>
                </Link>
                <button onClick={() => onDeleteFriendship(friendship.id)}>
                Delete
                </button>
            </li>
            ))}
        </ul>

      <h2>Confirmed Friends List</h2>
      <ul>
        {currentUser.accepted_friends.map(friendship => (

          <li key={friendship.id}>
            <Link className="nav-link" to={`/users/${friendship.id}`}>
                <h3>{friendship.name}</h3>
            </Link>
            <button onClick={() => onDeleteFriendship(friendship.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default FriendshipList;