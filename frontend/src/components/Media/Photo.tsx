import React, { useEffect, useState } from "react";
import {
  Container,
  Dimmer,
  Loader,
  Image,
  Divider,
  Label,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { fetchPhotoById } from "../../oldRedux/actions/mediaActions";
import axios from "axios";
import { useNavigate } from "react-router";
import { URL } from "../../utils/config";

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PhotoData {
  id: string;
  link: string;
  username: string;
  about: string;
  tags: string[];
}

type PhotoProps = PropsFromRedux & {
  id: string;
  photo: PhotoData;
  loading: boolean;
  error: string | null;
  fetchPhotoById: (id: string) => void;
};

const Photo: React.FC<PhotoProps> = ({
  id,
  photo,
  loading,
  error,
  fetchPhotoById,
}) => {
  const navigate = useNavigate();

  const [photoToDelete, setPhotoToDelete] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchPhotoById(id);
  }, [id, fetchPhotoById]);

  const handleShowDeleteModal = (id: string) => {
    setPhotoToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const id = photoToDelete;

    await axios.delete(`${URL}/api/photo/${id}`);
    setPhotoToDelete("");
    // Check for photo
    const username = photo.username;

    navigate(`${URL}/users/${username}`);
  };

  const handleCancelDelete = () => {
    setPhotoToDelete("");
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading....</Loader>
        </Dimmer>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (photo) {
    return (
      <div>
        <Container>
          <Image src={photo.link} fluid />
          <Divider />
          <p>{photo.about}</p>
          <Divider />
          {photo.tags.map((tag: string) => (
            <Label.Group color="green">
              <Label as="a">{tag}</Label>
            </Label.Group>
          ))}
          <Divider />
          <Link to={"madeuplinkfornow"}>
            <Icon name="edit" style={{ cursor: "pointer" }} />
          </Link>
          <Icon
            name="trash"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowDeleteModal(photo.id)}
          />
        </Container>

        <Modal open={showDeleteModal} onClose={handleCancelDelete}>
          <Modal.Content>
            Are You Sure You Want To Delete This Picture?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => handleDelete()}>
              Yes
            </Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state: any) => ({
  photo: state.photo.data,
  loading: state.photo.loading,
  error: state.photo.error,
});

const mapDispatchToProps = {
  fetchPhotoById,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Photo);
