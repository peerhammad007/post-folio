import React, { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import Posts from './components/Posts';
import { addPost, getAllPosts, deletePost } from './utils/handleApi';

const Home = () => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        getAllPosts(setPosts);
    }, [])
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        addPost(description, setDescription, image, setImage, setPosts)
    }

    if(!userInfo) {
        return <Navigate to={'/'} />
    }

  return (
    <div className='App'>
        <div className="container">
            <div className="top">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={(ev) => setDescription(ev.target.value)}
                        value={description}
                        placeholder='Enter description'
                    />
                    <input
                        type="file"
                        onChange={(ev) => setImage(ev.target.files[0])}
                    />
                    <button type='submit'>Add</button>
                </form>
            </div>
            <div className="posts">
                {posts.map((post) => 
                    <Posts 
                        key={post._id}
                        post={post}
                        deletePost={() => deletePost(post._id, setPosts)}
                    />
                )}
            </div>
            
        </div>
    </div>
  )
}

export default Home