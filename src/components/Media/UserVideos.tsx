import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchVideosByUsername } from "../../redux/slices/mediaSlices";
import { useParams } from "react-router";
import { Button, Dimmer, Header, Loader } from "semantic-ui-react";
import { useNavigate } from "react-router";
import VideoView from "./VideoView";

const UserVideos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      dispatch(fetchVideosByUsername(username));
    }
  }, [dispatch, username]);

  const media = useSelector((state: RootState) => state.media);
  const videos = media.videos;

  if (media.loading) {
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>;
  }

  if (media.error) {
    <Dimmer active>
      <Header as="h1">
        Error! Videos could not be retrieved! {media.error}
      </Header>
      <Button color="red" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Dimmer>;
  }

  if (videos) {
    return (
      <div>
        {videos.length > 0
          ? videos.map((video) => <VideoView id={video.id} />)
          : null}
      </div>
    );
  }
};

export default UserVideos;
