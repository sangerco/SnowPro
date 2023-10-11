import React, { useEffect, useState } from "react";
import { Button, Card, Header, Icon, Modal, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchOneSkiArea } from "../../redux/slices/skiAreaSlice";
import {
  removeFavMountain,
  FavMountainData,
} from "../../redux/slices/favMountainSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";

interface FavMountainProps {
  slug: string;
  username: string;
}

const FavMountain: React.FC<FavMountainProps> = ({ slug, username }) => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const loggedInUsername = auth.data?.username;

  useEffect(() => {
    dispatch(fetchOneSkiArea(slug));
  }, [dispatch, slug]);

  const skiAreas = useSelector((state: RootState) => state.skiAreas);
  const skiArea = skiAreas.skiArea;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const favMountainData: FavMountainData = {
    username: username ?? "",
    userId: userId ?? "",
    skiAreaSlug: slug,
  };

  const handleRemoveFavMountain = () => {
    if (skiArea && username) {
      dispatch(removeFavMountain(favMountainData));
    }
  };

  if (skiArea) {
    return (
      <>
        <Segment raised style={{ width: "250px", margin: "10px" }}>
          <Header as="h4" textAlign="left" data-testid="fm-header">
            <Link to={`/ski-areas/${slug}`}>{skiArea.name}</Link>
          </Header>
          {username === loggedInUsername ? (
            <Button
              data-testid="delete-button"
              floated="right"
              color="red"
              size="mini"
              onClick={handleShowDeleteModal}>
              <Icon name="times" />
            </Button>
          ) : null}
        </Segment>
        <Modal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          data-testid="delete-modal">
          <Modal.Content>
            Remove this Ski Area from your favorites list?
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={handleRemoveFavMountain}>
              Yes
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

  return null;
};

export default FavMountain;
