import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: null | string;
    bio: null | string;
    photos: null | string[];
    videos: null | string[];
    favMountains: null | string[];
}

interface UserListDataResponse {
    data: {
        users: User[];
    }
}

const UserList = () => {
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        const fetchUserListData = async () => {
            try {
                const response: UserListDataResponse = await axios.get('http://localhost:5000/users/all-users');
                setUserList(response.data.users);
            } catch (e) {
                console.error(e)
            }
        };

        fetchUserListData();
    }, []);
    
    if(userList.length > 0) {
        return (
            <div>
                {userList.map((user) => (
                    <div key={user.id}>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        {user.avatar && <img src={user.avatar} alt="user avatar" />}
                        <p>{user.bio}</p>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    }
};

export default UserList;