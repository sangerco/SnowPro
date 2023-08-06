import React, { useEffect } from 'react';
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from 'react-redux';
import { fetchUserData } from '../../redux/actions/userActions';
import ShowPhotos from '../Media/ShowPhotos';
import ShowVideos from '../Media/ShowVideos';
import { Container, Header, Grid, Image } from 'semantic-ui-react';
import FavMountain from '../SkiAreas/FavMountain';
import { useParams } from 'react-router';

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

interface UserProps {
    user: UserData | null;
    loading: boolean;
    error: string | null;
    fetchUserData: ( username: string) => void;
}

const User: React.FC<UserProps> = ({ user, loading, error, fetchUserData }) => {
    const { username } = useParams();

    useEffect(() => {
        fetchUserData(username as string);
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
            <Container>
                <Grid relaxed>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image src={user.avatar} size='small' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as='h2' textAlign='right'>{user.username}</Header>
                            <Header.Subheader>
                                {user.firstName && user.firstName !== '' ? user.firstName : ''}
                                {user.lastName && user.lastName !== '' ? user.lastName : ''}
                            </Header.Subheader>
                        </Grid.Column>
                        <Grid.Column width={4}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}></Grid.Column>
                        <Grid.Column width={8}><p>{user.bio}</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            {user.favMountains.length > 0 ? 
                                <FavMountain userId={user.id} /> :
                                <p>This user has no favorited mountains yet!</p>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}><ShowPhotos username={username as string} /></Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}><ShowVideos username={username as string} /></Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>


             //     {user.favMountains.length > 0 ? user.favMountains.map(fm => <p key={fm}>{fm}</p>) : <p>No favorite mountains yet.</p>}
            // </div>
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