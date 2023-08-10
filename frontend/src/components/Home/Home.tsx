import React, { useEffect } from 'react';
import './Home.css';
import { useAuth } from '../AuthProvider';
import { RootState } from '../../redux/store'
import { fetchUserData } from '../../redux/actions/userActions';
import { useSelector } from 'react-redux';

interface UserData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    bio: string;
    videos: string[];
    photos: string[];
    favMountains: string[];
}

interface HomePageProps {
    user: UserData | null;
    fetchUserData: ( username: string) => void;
}

const Home: React.FC<HomePageProps> = ({ user, fetchUserData }) => {
    const { username } = useAuth();

    const isAuthenticated = useSelector((state: RootState) => state.login.token)
    
    useEffect(() => {
        if(isAuthenticated) { 
            fetchUserData(username as string);
            }
    }, [isAuthenticated, fetchUserData]);

    if(isAuthenticated) {
        return <p>logged in!</p>
    } else {
        return <p>not logged in!</p>
    }
}

export default Home;