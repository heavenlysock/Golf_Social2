import { useState, useEffect } from 'react';
import FriendshipDetail from './FriendshipDetail';

function FriendshipList( {onShowDetails, displayInfo } ) {
  const [friendships, setFriendships] = useState([]);

  useEffect(() => {
    fetch('/friendships')
      .then(response => {
        if (response.ok) {
          response.json()
            .then(data => setFriendships(data))
        } else {
          console.log('Failed to fetch friendship list.')
        }
      })
  }, [])

  function onDeleteFriendship(friendshipId) {
    fetch(`/friendships/${friendshipId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setFriendships(prevFriendships => prevFriendships.filter(friendship => friendship.id !== friendshipId))
        } else {
          console.log('Failed to delete friendship.')
        }
      })
  }

  return (
    <div>
      <h2>Friendship List</h2>
      <ul>
        {friendships.map(friendship => (
          <li key={friendship.id}>
            <button onClick={() => onShowDetails(friendship)}>{friendship.title}</button>
            <button onClick={() => onDeleteFriendship(friendship.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {displayInfo && <FriendshipDetail friendship={displayInfo} onShowDetails={onShowDetails} />}
    </div>
  );
}

export default FriendshipList;