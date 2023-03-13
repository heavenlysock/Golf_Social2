import { useState } from 'react';
import { Link } from 'react-router-dom';


function FriendshipList({ onShowDetails, displayInfo, currentUser, setCurrentUser}) {
    const [error, setError] = useState(null);

    // const mappedAcceptedFriendships = currentUser.accepted_received_friendship_requests.map(friendship => (
    //     <FriendshipDetail {...friendship} key={friendship.id} setFriendships={setFriendships} />));




    function acceptFriendship(friendshipId) {
        fetch('/friendships/accept', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              friend_id: friendshipId,
              status: 'accepted'
            })
        })
            .then(res => res.json())
            .then((userObj) => {
              setCurrentUser({
                  ...userObj,
                  pending_received_friendships_requests: userObj.pending_received_friendships_requests
                  ? userObj.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipId)
                  : [],
                  accepted_friends: [...(userObj.accepted_friends || []), userObj.pending_received_friendships_requests?.find(friendship => friendship.id === friendshipId)].filter(Boolean)
              })
            })
            .catch((error) => {
              console.error(error);
              setError('Failed to accept friendship.');
          });
      }

      function rejectFriendship(friendshipId) {
        fetch('/friendships/reject', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              friend_id: friendshipId,
              status: 'rejected'
            })
        })
            .then(res => res.json())
            .then((userObj) => {
              setCurrentUser({
                  ...userObj,
                  pending_received_friendships_requests: userObj.pending_received_friendships_requests
                    ? userObj.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipId)
                    : []
              })
            })
            .catch((error) => {
              console.error(error);
              setError('Failed to reject friendship.');
          });
    }


      function onDeleteFriendship(friendshipId) {
        fetch('/friendships/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({friend_id: friendshipId})
        })
        .then(res => res.json())
        .then((userObj) => {
          setCurrentUser({
            ...userObj,
            pending_received_friendships_requests: userObj.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipId)
          })
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to delete friendship.');
    

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
    })
  }

  return (
    <div>
        {error && <p className="error">{error}</p>}
        <h2>Pending Friendship Requests</h2>
        <ul>
           {currentUser.pending_received_friendships_requests?.map(friendship => (
                <li key={friendship.id}>  
                <Link className="nav-link" to={`/users/${friendship.sender.id === currentUser.id ? friendship.recipient.id : friendship.sender.id}`}>
                    <h3>{friendship.sender.id === currentUser.id ? friendship.recipient.name : friendship.sender.name}</h3>
                </Link>
                <button onClick={() => acceptFriendship(friendship.id)}>
                  Accept
                </button>
                <button onClick={() => rejectFriendship(friendship.id)}>
                  Reject
                </button>
                <button onClick={() => onDeleteFriendship(friendship.id)}>
                  Delete
                </button>
            </li>
            ))}
        </ul>

        <h2>Confirmed Friends List</h2>
        <ul>
        {currentUser.accepted_friends?.filter((friendship) => friendship.status === 'accepted')
    .map((friendship) => (
      <li key={friendship.id}>
        <Link className="nav-link" to={`/users/${friendship.id}`}>
          <h3>{friendship.name}</h3>
                </Link>
                <button onClick={() => onShowDetails(friendship)}>
                    Show Details
                </button>
                </li>
            ))}
        </ul>
    </div>
  );
}


export default FriendshipList;