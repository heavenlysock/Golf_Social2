import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FriendshipDetail({ onShowDetails }) {
  const { id } = useParams();
  const [friendship, setFriendship] = useState(null);

 

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