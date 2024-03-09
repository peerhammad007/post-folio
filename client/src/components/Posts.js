import React from 'react'; 
import { AiFillDelete } from 'react-icons/ai';

const Posts = ({ post, deletePost }) => { 
  return (  
      <div className="post"> 
        <div className='image'>
          <img src={`http://localhost:3001/${post.picturePath}`} alt="Post" />
        </div> 
        <p>{post.description}</p>
        <div className='icons'>
          <AiFillDelete className='icon' onClick={deletePost} />
        </div>
      </div>
  )  
}; 

export default Posts;