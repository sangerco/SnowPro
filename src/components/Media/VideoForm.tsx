import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { NewVideoData, createVideo } from "../../redux/slices/mediaSlices";
import { fetchAllTags } from "../../redux/slices/tagSlice";
import {
  Form,
  Button,
  Dropdown,
  DropdownItemProps,
  Container,
  Divider,
  Modal,
} from "semantic-ui-react";
import TagForm from "../Tags/TagForm";

const VideoForm: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const tags = useSelector((state: RootState) => state.tags);

  let tagOptions:
    | { key: string; text: string; value: string }[]
    | DropdownItemProps[]
    | undefined;

  if (tags.tags) {
    tagOptions = tags.tags.map((tag) => ({
      key: tag.id,
      text: tag.tag,
      value: tag.id,
    }));
  } else {
    tagOptions = [];
  }

  const initialState: NewVideoData = {
    userId: userId ?? "",
    link: "",
    about: "",
    tagIds: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [showCreateNewTagForm, setShowCreateNewTagForm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.link.includes("youtube") &&
      !formData.link.includes("youtu.be")
    ) {
      setShowErrorModal(true);
      return;
    }

    setShowErrorModal(false);

    dispatch(createVideo(formData));

    setFormData(initialState);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Container fluid style={{ margin: "10px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Video Link - must be YouTube link</label>
            <input type="text" onChange={handleChange} value={formData.link} />
          </Form.Field>
          <Form.Field>
            <label>About</label>
            <input type="text" onChange={handleChange} value={formData.about} />
          </Form.Field>
          <Divider />
          <Button size="small" type="submit" color="green">
            Send it.
          </Button>
        </Form>
        <label>Tags</label>
        <Dropdown
          clearable
          options={tagOptions}
          multiple
          fluid
          selection
          value={formData.tagIds}
        />
        <Container style={{ margin: "10px" }}>
          <Button onClick={() => setShowCreateNewTagForm(true)} size="small">
            Create New Tag?
          </Button>
        </Container>
        <Divider />
        {showCreateNewTagForm && <TagForm />}
      </Container>
      <Modal open={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <Modal.Content>Video link must be a YouTube link.</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowErrorModal(false)}>close</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default VideoForm;
