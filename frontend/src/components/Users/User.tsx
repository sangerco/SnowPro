import React, { useEffect } from 'react';
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from 'react-redux';
import { fetchUserData } from '../../redux/actions/userActions';

interface UserData {
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

interface UserProps {
    username: string;
    user: UserData | null;
    loading: boolean;
    error: string | null;
    fetchUserData: ( username: string) => void;
}

const User: React.FC<UserProps> = ({ username, user, loading, error, fetchUserData }) => {
    useEffect(() => {
        fetchUserData(username);
    }, [username, fetchUserData]);

    if(loading) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    }

    if(error) {
        return (
            <div>Error: {error}</div>
        )
    }

    if(user) {
        return (
            <div>
                <p>{user.username}</p>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.avatar}</p>
                <p>{user.bio}</p>
                {user.videos.length > 0 ? user.videos.map(video => <p key={video}>{video}</p>) : <p>No videos found.</p>}
                {user.photos.length > 0 ? user.photos.map(photo => <p key={photo}>{photo}</p>) : <p>No photos found.</p>}
                {user.favMountains.length > 0 ? user.favMountains.map(fm => <p key={fm}>{fm}</p>) : <p>No favorite mountains yet.</p>}
            </div>
        )
    }

    return null;
}

const mapStateToProps = (state: any) => ({
    user: state.user.data,
    loading: state.user.loading,
    error: state.user.error
})

const mapDispatchToProps = {
    fetchUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(User);