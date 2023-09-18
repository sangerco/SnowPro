import React, { useEffect, useState } from "react";
import { deletePhoto, fetchPhoto } from "../../redux/slices/mediaSlices";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  Container,
  Image,
  Button,
  Icon,
  Divider,
  Dimmer,
  Loader,
  Header,
  Label,
  Modal,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface PhotoViewProps {
  id: string;
}

const PhotoView: React.FC<PhotoViewProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [dispatch, id]);

  const media = useSelector((state: RootState) => state.media);
  const photo = media.photo;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (photoId: string) => {
    dispatch(deletePhoto(photoId));
  };

  if (media.error) {
    return (
      <Dimmer active>
        <Header as="h1">Error! Photo cannot be retrieved! {media.error}</Header>
        <Button color="red" onClick={() => navigate(-1)}>
          God Back
        </Button>
      </Dimmer>
    );
  }

  if (photo) {
    return (
      <div>
        <Container fluid>
          <Image src={photo.link} />
          <Divider />
          <Container text>
            <p>{photo.about}</p>
          </Container>
          <Divider />
          <Button.Group>
            {userId === photo.userId ? (
              <>
                <Button onClick={() => setShowDeleteModal(true)}>
                  <Icon name="trash" />
                </Button>
                <Button as={Link} to={`'/media/photo/${photo.id}/update'`}>
                  <Icon name="edit" />
                </Button>
              </>
            ) : null}
          </Button.Group>
        </Container>
        {userId === photo.userId && (
          <Modal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}>
            <Modal.Content>
              Are You Sure You Want To Delete Your Pic?
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => handleDelete(photo.id)}>
                Yes
              </Button>
              <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    );
  }

  return null;
};

export default PhotoView;
