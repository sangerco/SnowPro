import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchRecentMedia } from "../../redux/slices/mediaSlices";
import { Button, Dimmer, Header, Loader } from "semantic-ui-react";
import { useNavigate } from "react-router";

const UserPhotos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRecentMedia());
  }, [dispatch]);

  const media = useSelector((state: RootState) => state.media);
  const recentMedia = media.media;

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

  if (recentMedia) {
    return <div>Recent Media Found</div>;
  }

  return null;
};

export default UserPhotos;
