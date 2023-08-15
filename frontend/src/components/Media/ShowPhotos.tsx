import React, { useEffect, useState } from 'react';
import { Dimmer, Loader, Card, Image, Label, Icon, Button, Modal } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPhotosByUsername } from '../../oldRedux/actions/mediaActions';
import { URL } from '../../utils/config';

import axios from 'axios';

interface Tag {
    tag: string;
}

interface PhotoData {
    id: string;
    username: string;
    about: string;
    link: string;
    tags: Tag[];
    createdAt: Date;
};

interface PhotoProps {
    username: string;
    photos: PhotoData[] | null;
    loading: boolean;
    error: string | null;
    fetchPhotosByUsername: (username: string) => void;
};

const Photos: React.FC<PhotoProps> = ({ username, photos, loading, error, fetchPhotosByUsername }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState('')


    useEffect(() => {
        fetchPhotosByUsername(username);
    }, [username, fetchPhotosByUsername]);

    const handleShowDeleteModal = (id: string) => {
        setPhotoToDelete(id);
        setShowDeleteModal(true);
    }

    const handleDelete = async () => {
        const id = photoToDelete

        await axios.delete(`${URL}/photo/${id}`);
        setPhotoToDelete('');
        setShowDeleteModal(false);
        fetchPhotosByUsername(username);
    }

    const handleCancelDelete = () => {
        setPhotoToDelete('');
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

    if(photos) {
        return (
            <div> 
                {photos.map((photo: PhotoData) => 
                    <Card key={photo.id}>
                        <Image src={photo.link} wrapped />
                        <Card.Content>
                            <Card.Description>
                                {photo.about}
                            </Card.Description>
                        </Card.Content>
                        <Label.Group color='green'>
                            {photo.tags.map((tag) =>
                                <Label as='a'>{tag.tag}</Label> )}
                        </Label.Group>
                        <Card.Content extra>
                            <Link to={'madeuplinkfornow'}>
                                <Icon name='edit' style={{ cursor: 'pointer' }} />
                            </Link>
                            <Icon name='trash' style={{ cursor: 'pointer' }} onClick={handleShowDeleteModal(photo.id)} />
                        </Card.Content>
                    </Card>)}

                <Modal open={showDeleteModal} onClose={handleCancelDelete}>
                    <Modal.Content>Are You Sure You Want To Delete This Picture?</Modal.Content>
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
    photos: state.photo.data,
    loading: state.photo.loading,
    error: state.photo.error
});

const mapDispatchToProps = {
    fetchPhotosByUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
