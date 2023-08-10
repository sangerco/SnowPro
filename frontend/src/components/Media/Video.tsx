import React, { useEffect, useState } from 'react';
import { Container, Dimmer, Loader, Image, Divider, Label,Button, Icon, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideoById } from '../../redux/actions/mediaActions';
import axios from 'axios';
import { useNavigate } from 'react-router'
import { URL } from '../../utils/config';

interface VideoData {
    id: string;
    link: string;
    username: string;
    about: string;
    tags: string[];
}

interface VideoProps {
    id: string;
    video: VideoData | null;
    loading: boolean;
    error: string | null;
    fetchVideoById: (id: string) => void;
}

const Video: React.FC<VideoProps> = ({ id, video, loading, error, fetchVideoById }) => {
    const navigate = useNavigate();
    const username = video?.username;

    const [videoToDelete, setVideoToDelete] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchVideoById(id)
    }, [id, fetchVideoById]);

    const handleShowDeleteModal = (id: string) => {
        setVideoToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        const id = videoToDelete;

        await axios.delete(`${URL}/api/video/${id}`);
        setVideoToDelete('');

        navigate(`${URL}/users/${username}`);
    }

    const handleCancelDelete = () => {
        setVideoToDelete('');
        setShowDeleteModal(false);
    }

    if(loading) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading....</Loader>
                </Dimmer>
            </div>

        )
    }

    if(error) return <div>Error: {error}</div>

    if(video) {
        return (
            <div>
                <Container>
                    <Image src={video.link} fluid />
                    <Divider />
                    <p>{video.about}</p>
                    <Divider />
                    {video.tags.map(tag => 
                        <Label.Group color='green'>
                            <Label as='a'>{tag}</Label>
                        </Label.Group>
                        )}
                    <Divider />
                    <Link to={'madeuplinkfornow'}>
                        <Icon name='edit' style={{ cursor: 'pointer' }} />
                    </Link>
                    <Icon name='trash' style={{ cursor: 'pointer' }} onClick={() => handleShowDeleteModal(video.id)} />
                </Container>

                <Modal open={showDeleteModal} onClose={handleCancelDelete}>
                    <Modal.Content>Are You Sure You Want To Delete This Video?</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => handleDelete()}>Yes</Button>
                        <Button onClick={handleCancelDelete}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

    return null;
};

const mapStateToProps = (state: any) => ({
    video: state.video.data,
    loading: state.video.loading,
    error: state.video.error
});

const mapDispatchToProps = {
    fetchVideoById
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)