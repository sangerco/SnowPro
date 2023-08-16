import React, { useState } from "react";
import { connect } from "react-redux";
import { sendNewTagData } from "../../oldRedux/actions/tagActions";
import { RootState } from "../../oldRedux/store";
import { Button, Form, Message } from "semantic-ui-react";

interface NewTagData {
  tag: string;
}

interface NewTagProps {
  newTag: NewTagData | null;
  error: string;
  sendNewTagData: (tag: string) => Promise<void>;
}

const NewTagForm: React.FC<NewTagProps> = ({
  newTag,
  error,
  sendNewTagData,
}) => {
  const [formData, setFormData] = useState<NewTagData>({ tag: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendNewTagData(formData.tag);

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
    <Form onSubmit={handleSubmit} error>
      <Form.Field>
        <input
          placeholder="Create New Tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        />
      </Form.Field>
      <Button type="submit">Create</Button>
      <Message error header={error} content={error} />
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  tag: state.tag.data,
  error: state.tag.error,
});

export default connect(mapStateToProps, { sendNewTagData })(NewTagForm);
