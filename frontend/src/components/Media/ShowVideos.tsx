import React, { useEffect, useState } from 'react';
import { Dimmer, Loader, Card, Image, Label, Icon, Button, Modal } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchVideosByUsername } from '../../redux/actions/mediaActions';
import { URL } from '../../utils/config';

import axios from 'axios';

interface Tag {
    tag: string;
}

interface VideoData {
    id: string;
    username: string;
    about: string;
    link: string;
    tags: Tag[];
    createdAt: Date;
};

interface VideoProps {
    username: string;
    videos: VideoData[] | null;
    loading: boolean;
    error: string | null;
    fetchVideosByUsername: (username: string) => void;
};

const Videos: React.FC<VideoProps> = ({ username, videos, loading, error, fetchVideosByUsername }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState('')


    useEffect(() => {
        fetchVideosByUsername(username);
    }, [username, fetchVideosByUsername]);

    const handleShowDeleteModal = (id: string) => {
        setVideoToDelete(id);
        setShowDeleteModal(true);
    }

    const handleDelete = async () => {
        const id = videoToDelete

        await axios.delete(`${URL}/video/${id}`);
        setVideoToDelete('');
        setShowDeleteModal(false);
        fetchVideosByUsername(username);
    }

    const handleCancelDelete = () => {
        setVideoToDelete('');
        setShowDeleteModal(false);
    }

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
        return <div>{`${username} has no photos yet!`}</div>
    }

    if(videos) {
        return (
            <div> 
                {videos.map((video: VideoData) => 
                    <Card key={video.id}>
                        <Image src={video.link} wrapped />
                        <Card.Content>
                            <Card.Description>
                                {video.about}
                            </Card.Description>
                        </Card.Content>
                        <Label.Group color='green'>
                            {video.tags.map((tag) =>
                                <Label as='a'>{tag.tag}</Label> )}
                        </Label.Group>
                        <Card.Content extra>
                            <Link to={'madeuplinkfornow'}>
                                <Icon name='edit' style={{ cursor: 'pointer' }} />
                            </Link>
                            <Icon name='trash' style={{ cursor: 'pointer' }} onClick={handleShowDeleteModal(video.id)} />
                        </Card.Content>
                    </Card>)}

                <Modal open={showDeleteModal} onClose={handleCancelDelete}>
                    <Modal.Content>Are You Sure You Want To Delete This Video?</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleCancelDelete}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

    return null;
};

const mapStateToProps = (state: any) => ({
    videos: state.video.data,
    loading: state.video.loading,
    error: state.video.error
});

const mapDispatchToProps = {
    fetchVideosByUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(Videos);