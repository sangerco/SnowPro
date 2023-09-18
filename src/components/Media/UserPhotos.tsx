import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchPhotosByUsername } from "../../redux/slices/mediaSlices";
import { useParams } from "react-router";
import { Button, Dimmer, Header, Loader } from "semantic-ui-react";
import { useNavigate } from "react-router";
import PhotoView from "./PhotoView";

const UserPhotos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      dispatch(fetchPhotosByUsername(username));
    }
  }, [dispatch, username]);

  const media = useSelector((state: RootState) => state.media);
  const photos = media.photos;

  if (media.loading) {
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>;
  }

  if (media.error) {
    <Dimmer active>
      <Header as="h1">Error! Pics could not be retrieved! {media.error}</Header>
      <Button color="red" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Dimmer>;
  }

  if (photos) {
    return (
      <div>
        {photos.length > 0
          ? photos.map((photo) => <PhotoView key={photo.id} id={photo.id} />)
          : null}
      </div>
    );
  }

  return null;
};

export default UserPhotos;
