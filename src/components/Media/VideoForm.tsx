import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { NewVideoData, createVideo } from "../../redux/slices/mediaSlices";
import {
  Form,
  Button,
  Dropdown,
  DropdownItemProps,
  Container,
  Divider,
  Modal,
} from "semantic-ui-react";

const VideoForm: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const dispatch = useDispatch<AppDispatch>();

  const initialState: NewVideoData = {
    userId: userId ?? "",
    link: "",
    about: "",
  };

  const [formData, setFormData] = useState(initialState);
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
            <input
              type="text"
              name="link"
              onChange={handleChange}
              value={formData.link}
            />
          </Form.Field>
          <Form.Field>
            <label>About</label>
            <input
              type="text"
              name="about"
              onChange={handleChange}
              value={formData.about}
            />
          </Form.Field>
          <Divider />
          <Button size="small" type="submit" color="green">
            Send it.
          </Button>
        </Form>
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
