import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Modal } from "semantic-ui-react";
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

  if (skiAreas.error || auth.error) {
    return null;
  }

  if (skiArea) {
    return (
      <>
        <Card>
          <Card.Header as={Link} to={`/ski-areas/${slug}`}>
            {skiArea.name}
          </Card.Header>
          {username === loggedInUsername ? (
            <Button color="red" size="mini" onClick={handleShowDeleteModal}>
              <Icon name="times" />
            </Button>
          ) : null}
        </Card>
        <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
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
