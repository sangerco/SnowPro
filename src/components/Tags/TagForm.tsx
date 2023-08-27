import React, { useState } from "react";
import { createTag } from "../../redux/slices/tagSlice";
import { useDispatch } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import { AppDispatch } from "../../redux/store";

const TagForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ tag: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createTag(formData));

    setFormData({ tag: "" });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <input
          placeholder="Create New Tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        />
      </Form.Field>
      <Button size="mini" color="green">
        Submit
      </Button>
    </Form>
  );
};

export default TagForm;
