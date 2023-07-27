import React, { useState, useEffect } from 'react';

function Json() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    // Fetch data from the JSON server when the component mounts
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Json;
