import React, { useState } from "react";
import { createTag, fetchAllTags } from "../../redux/slices/tagSlice";
import { useDispatch } from "react-redux";
import { Form, Button, Container } from "semantic-ui-react";
import { AppDispatch } from "../../redux/store";

const TagForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ tag: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createTag(formData));

    setFormData({ tag: "" });

    dispatch(fetchAllTags());
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container style={{ margin: "10px" }}>
      <Form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <Form.Field>
          <input
            placeholder="Create New Tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          />
        </Form.Field>
        <Button size="mini" color="green" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default TagForm;
