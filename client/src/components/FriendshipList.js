import { useState } from 'react';
import { Link } from 'react-router-dom';


function FriendshipList({ onShowDetails, displayInfo, currentUser, setCurrentUser}) {
    const [error, setError] = useState(null);

    // const mappedAcceptedFriendships = currentUser.accepted_received_friendship_requests.map(friendship => (
    //     <FriendshipDetail {...friendship} key={friendship.id} setFriendships={setFriendships} />));




    function acceptFriendship(friendshipId) {
        fetch(`/friendships/${friendshipId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'}

        })

            .then((res) => {
            if (res.status === 202 ) {
              res.json().then(friendshipObj => {

                setCurrentUser({
                  ...currentUser,
                  pending_received_friendships_requests: currentUser.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipObj.id),
                  accepted_friends: [friendshipObj.sender, ...currentUser.accepted_friends]
              })
              }
              )
            } else {
              res.json().then(errorObj => alert(errorObj.error))
            }
            
            })
            .catch((error) => {
              console.error(error);
              setError('Failed to accept friendship.');
          });
      }

      function rejectFriendship(friendshipId) {
        fetch(`/friendships/${friendshipId}`, {
            method: 'DELETE',

        })
            .then((res) => {
              if (res.status === 204) {
                // res.json().then(() => {
                  setCurrentUser({
                    ...currentUser,
                    pending_received_friendships_requests: currentUser.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipId)
                  })
                
              } else {
              setError('Failed to reject friendship.');            
              }
            })
              .catch((error) => {
                console.error(error);
                setError('Failed to reject friendship.');
          });
    }


      // function onDeleteFriendship(friendshipId) {
      //   fetch('/friendships/remove', {
      //     method: 'DELETE',
      //     headers: { 'Content-Type': 'application/json'},
      //     body: JSON.stringify({friend_id: friendshipId})
      //   })
      //   .then(res => res.json())
      //   .then((userObj) => {
      //     setCurrentUser({
      //       ...userObj,
      //       pending_received_friendships_requests: userObj.pending_received_friendships_requests.filter(friendship => friendship.id !== friendshipId)
      //     })
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     setError('Failed to delete friendship.');
    

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
    
  

  return (
    <div>
        {error && <p className="error">{error}</p>}
        <h2>Pending Friendship Requests</h2>
        <ul>
           {currentUser.pending_received_friendships_requests?.map(friendship => (
                <li key={friendship.id}>  
                <Link className="nav-link" to={`/users/${friendship.sender.id}`}>
                    <h3>{friendship.sender.name}</h3>
                </Link>
                <button onClick={() => acceptFriendship(friendship.id)}>
                  Accept
                </button>
                <button onClick={() => rejectFriendship(friendship.id)}>
                  Reject
                </button>
                {/* <button onClick={() => onDeleteFriendship(friendship.id)}>
                  Delete
                </button> */}
            </li>
            ))}
        </ul>

        <h2>Confirmed Friends List</h2>
        <ul>
        {currentUser.accepted_friends?.map((friend) => (
    
          <li key={friend.id}>
          <Link className="nav-link" to={`/users/${friend.id}`}>
            <h3>{friend.name}</h3>
                </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}


export default FriendshipList;