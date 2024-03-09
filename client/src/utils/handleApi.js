import axios from 'axios';
const BASE_URL = 'http://localhost:3001';


const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            username, password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert('Registration successful');
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error while registering the user', error);
    }
}

const loginUser = async(username, password, setUserInfo, setRedirect)  => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username, password
        }, {
            headers: {
                'Content-Type': 'Application/json'
            },
            withCredentials: true
        });

        if(response.status === 200) {
            const userInfo = response.data;
            setUserInfo(userInfo);
            setRedirect(true);
        } else {
            alert('Wrong Credentials');
        }
    } catch (error) {
        console.error('Error while logging in the user', error);
    }
}

const logoutUser = (setUserInfo) => {
    axios.post(`${BASE_URL}/logout`, {}, {
            withCredentials: true
        })
        .then(() => {
            setUserInfo(null);
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
}

const getUserProfile = (setUserInfo) => {
    axios.get(`${BASE_URL}/profile`, {
            withCredentials: true
        })
        .then(response => {
            setUserInfo(response.data);
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
        });
}

const getAllPosts = async (setPosts) => {
    try {
        const response = await axios.get(BASE_URL);
        setPosts(response.data);
    } catch (error) {
        console.error('Error while fetching the posts', error);
    }
}

const addPost = async (description, setDescription, image, setImage, setPosts) => {
    try {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('picture', image);

        await axios.post(`${BASE_URL}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setDescription('');
        setImage(null);
        getAllPosts(setPosts);
    } catch (error) {
        console.error('Error while adding the post:', error);
    }
}

const deletePost = async (_id, setPosts) => {
    try {
      await axios.post(`${BASE_URL}/delete`, { _id }, { 
        headers: { 'Content-Type': 'application/json' } 
    });
      getAllPosts(setPosts);
    } catch (error) {
      console.error('Error while deleting posts:', error);
    }
  }

export { getAllPosts, addPost, deletePost, registerUser, loginUser, getUserProfile, logoutUser};