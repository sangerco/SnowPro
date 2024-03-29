import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { NewPhotoData, createPhoto } from "../../redux/slices/mediaSlices";
import {
  Form,
  Button,
  Dropdown,
  DropdownItemProps,
  Container,
  Divider,
} from "semantic-ui-react";

const PhotoForm: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.data?.id;
  const dispatch = useDispatch<AppDispatch>();

  const initialState: NewPhotoData = {
    userId: userId ?? "",
    link: "",
    about: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createPhoto(formData));

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
      <Form onSubmit={handleSubmit} data-testid="photo-form">
        <Form.Field>
          <label htmlFor="photoLink">Photo Link</label>
          <input
            id="photoLink"
            type="text"
            name="link"
            onChange={handleChange}
            value={formData.link}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="about">About</label>
          <input
            id="about"
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
        <Divider />
      </Form>
    </Container>
  );
};

export default PhotoForm;
