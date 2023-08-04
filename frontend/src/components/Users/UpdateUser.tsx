import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserData } from '../../redux/actions/userActions';
import { fetchUserData } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';
import { Container, Button, Form, Message } from 'semantic-ui-react';

interface UserData {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    avatar: string;
    bio: string;
    videos: string[];
    photos: string[];
    favMountains: string[];
}

interface UpdateUserData {
    username?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    avatar?: string;
    bio?: string;
    videos?: string[];
    photos?: string[];
    favMountains?: string[];
};

interface UpdateUserProps {
    updateUser: UpdateUserData | null;
    loading: boolean;
    error: string;
    fetchUserData: (username: string) => Promise<void>;
    updateUserData: (
        username: string,
        firstName: string,
        lastName: string,
        password: string,
        email: string,
        avatar: string,
        bio: string,
        videos: string[],
        photos: string[],
        favMountains: string[]
    ) => Promise<void>
};

const UpdateUser: React.FC<UpdateUserProps> = ({ updateUser, loading, error, fetchUserData, updateUserData }) => {
    const username: string = localStorage.getItem('username') ?? '';

    const initialUserState: UserData = {
        username: username,
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        avatar: '',
        bio: '',
        videos: [],
        photos: [],
        favMountains: []
    };
    
    const [userData, setUserData] = useState(initialUserState);
    const [formData, setFormData] = useState(userData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData(username);
                setUserData(data)
            } catch (e: any) {
                return `Can't retrieve user data. Error: ${error}`
            }
        };
        fetchData();
    }, [fetchUserData, username]);

    const [ photoData, setPhotoData ] = useState(userData.photos);
    const [ videoData, setVideoData ] = useState(userData.videos);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateUserData(
            formData.username,
            formData.firstName,
            formData.lastName,
            formData.password,
            formData.email,
            formData.avatar,
            formData.bio,
            formData.photos,
            formData.videos,
            formData.favMountains
        );

        setFormData(initialUserState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value
        });
    };  

    const handlePhotoChange = (index: number, value: string) => {
        const updatedPhotos = [...formData.photos];
        updatedPhotos[index] = value;
        setPhotoData(updatedPhotos);
    };

    const handleAddPhotoInput = () => {
        setPhotoData([...formData.photos, '']);
    };

    const handleRemovePhotoInput = (index: number) => {
        const updatedPhotos = [...formData.photos];
        updatedPhotos.splice(index, 1);
        setPhotoData(updatedPhotos);
    };

    const handleVideoChange = (index: number, value: string) => {
        const updatedVideos = [...formData.videos];
        updatedVideos[index] = value;
        setVideoData(updatedVideos);
    };

    const handleAddVideoInput = () => {
        setVideoData([...formData.videos, '']);
    };

    const handleRemoveVideoInput = (index: number) => {
        const updateVideos = [...formData.videos];
        updateVideos.splice(index, 1);
        setVideoData(updateVideos);
    };

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit} error>
                    <Form.Field>
                        <label>First Name</label>
                        <input 
                            placeholder={formData.firstName} 
                            name='firstName' 
                            value={formData.firstName} 
                            onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input 
                            placeholder={formData.lastName} 
                            name='lastName' 
                            value={formData.lastName} 
                            onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input 
                            type='password'
                            placeholder={formData.password} 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input 
                            placeholder={formData.email} 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>About you:</label>
                        <input 
                            placeholder={formData.bio} 
                            name='bio' 
                            value={formData.bio} 
                            onChange={handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Avatar Link:</label>
                        <input 
                            placeholder={formData.avatar} 
                            name='avatar' 
                            value={formData.avatar} 
                            onChange={handleChange}/>
                    </Form.Field>
                    {formData.photos.map((photo, index) => (
                        <Form.Field key={index}>
                            <label>Photos</label>
                            <input 
                                type="text" 
                                value={photo} 
                                onChange={(e) => handlePhotoChange(index, e.target.value)} 
                            />
                            {index === formData.photos.length - 1 && (
                                <Button icon='plus' onClick={handleAddPhotoInput} />
                            )}
                            {(index > 0 && (
                                <Button icon='minus' onClick={() => handleRemovePhotoInput(index)} />
                            ))}
                        </Form.Field>
                    ))}
                    {formData.videos.map((video, index) => (
                        <Form.Field key={index}>
                            <label>Videos</label>
                            <input 
                                type="text" 
                                value={video} 
                                onChange={(e) => handleVideoChange(index, e.target.value)} 
                            />
                            {index === formData.videos.length - 1 && (
                                <Button icon='plus' onClick={handleAddVideoInput} />
                            )}
                            {(index > 0 && (
                                <Button icon='minus' onClick={() => handleRemoveVideoInput(index)} />
                            ))}
                        </Form.Field>
                    ))}
                    <Button type='submit'>Submit Changes</Button>
                    {loading && <p>Loading....</p>}
                    <Message
                        error
                        header={error}
                        content={error}
                    />
                </Form>
            </Container>
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    user: state.user.data,
    loading: state.user.loading,
    error: state.user.error,
    updateUser: state.updateUser.data,
    updateError: state.updateUser.error
});

const mapDispatchToProps = {
    fetchUserData, 
    updateUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
