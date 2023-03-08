import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FriendshipDetail({ onShowDetails }) {
  const { id } = useParams();
  const [friendship, setFriendship] = useState(null);

  useEffect(() => {
    fetch(`/friendships/${id}`)
      .then(response => {
        if (response.ok) {
          response.json()
            .then(data => setFriendship(data))
        } else {
          console.log('Failed to fetch friendship details.')
        }
      })
  }, [id])

  if (!friendship) return <div>Loading...</div>;

  return (
    <div>
      <h2>{friendship.title}</h2>
      <p>{friendship.description}</p>
      <button onClick={() => onShowDetails(null)}>Close</button>
    </div>
  );
}

export default FriendshipDetail;