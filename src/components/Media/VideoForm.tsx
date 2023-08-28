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
      key: tag.tagId,
      text: tag.tag,
      value: tag.tagId,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Photo Link</label>
          <input type="text" onChange={handleChange} value={formData.link} />
        </Form.Field>
        <Form.Field>
          <label>About</label>
          <input type="text" onChange={handleChange} value={formData.about} />
        </Form.Field>
        <Divider />
        <label>Tags</label>
        <Dropdown
          clearable
          options={tagOptions}
          multiple
          fluid
          selection
          value={formData.tagIds}
        />
        <Button onClick={() => setShowCreateNewTagForm(true)} size="small">
          Create New Tag?
        </Button>
        {showCreateNewTagForm && <TagForm />}
        <Divider />
      </Form>
    </Container>
  );
};

export default VideoForm;
