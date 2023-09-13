import React, { useEffect, useState } from "react";
import { deleteVideo, fetchVideo } from "../../redux/slices/mediaSlices";
import { fetchAllTags } from "../../redux/slices/tagSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  Container,
  Button,
  Icon,
  Divider,
  Dimmer,
  Loader,
  Header,
  Label,
  Modal,
  Embed,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface VideoViewProps {
  id: string;
}

const VideoView: React.FC<VideoViewProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, [dispatch, id]);

  const media = useSelector((state: RootState) => state.media);
  const video = media.video;

  let videoId;

  if (video) {
    const splitLink = video.link.split("v=");
    const id = splitLink[1];
    videoId = id.includes("&") ? id.split("&")[0] : id;
  }

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const tagData = useSelector((state: RootState) => state.tags);
  const tags = tagData.tags;

  let assocTags = [];

  if (tags && video) {
    if (video.tagIds && video.tagIds.length > 0) {
      for (let i = 0; i > video.tagIds.length; i++) {
        for (let j = 0; j > tags.length; j++) {
          if (video.tagIds[i] === tags[j].id) {
            assocTags.push(tags[j].tag);
          }
        }
      }
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (videoId: string) => {
    dispatch(deleteVideo(videoId));
  };

  if (tagData.loading || media.loading) {
    return (
      <Dimmer active>
        <Loader>Loading...</Loader>
      </Dimmer>
    );
  }

  if (media.error) {
    return (
      <Dimmer active>
        <Header as="h1">Error! Video cannot be retrieved! {media.error}</Header>
        <Button color="red" onClick={() => navigate(-1)}>
          God Back
        </Button>
      </Dimmer>
    );
  }

  if (video) {
    return (
      <div>
        <Container fluid>
          <Embed id={videoId} source="youtube" />
          <Divider />
          <Container text>
            <p>{video.about}</p>
          </Container>
          {assocTags.map((tag) => (
            <Label color="green">{tag}</Label>
          ))}
          <Divider />
          <Button.Group>
            {userId === video.userId ? (
              <>
                <Button onClick={() => setShowDeleteModal(true)}>
                  <Icon name="trash" />
                </Button>
                <Button as={Link} to={`'/media/video/${video.id}/update'`}>
                  <Icon name="edit" />
                </Button>
              </>
            ) : null}
          </Button.Group>
        </Container>
        {userId === video.userId && (
          <Modal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}>
            <Modal.Content>
              Are You Sure You Want To Delete Your Video?
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => handleDelete(video.id)}>
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

export default VideoView;
