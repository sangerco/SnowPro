import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { URL } from "../../utils/config";
import { connect } from "react-redux";
import { useAuth } from "../AuthProvider";
import { updateUserData } from "../../oldRedux/actions/userActions";
import { RootState } from "../../oldRedux/store";
import {
  Button,
  Input,
  Form,
  Message,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { UpdateUserData } from "../../oldRedux/types/userTypes";

interface UpdateData {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  bio: string;
  videos: string[];
  photos: string[];
  favMountains: string[];
}

interface UpdateDataProps {
  user: UpdateData | null;
  loading: boolean;
  error: string;
  updateUserData: (username: string, data: UpdateUserData) => Promise<void>;
}

const UserUpdateForm: React.FC<UpdateDataProps> = ({
  user,
  updateUserData,
}) => {
  const { username } = useParams();
  const { userId } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UpdateData>({
    id: userId ?? "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
    bio: "",
    photos: [],
    videos: [],
    favMountains: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: AxiosResponse<UpdateData> = await axios.get(
          `${URL}/users/${username}`
        );
        const data: UpdateData = response.data;
        setFormData((prevState) => ({
          ...prevState,
          username: data.username,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          avatar: data.avatar,
          bio: data.bio,
          photos: data.photos,
          videos: data.videos,
          favMountains: data.favMountains,
        }));
        setLoading(false);
      } catch (e) {
        setError("Error fetching Data!");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updateData: UpdateUserData = {
        firstName: formData.first_name,
        lastName: formData.last_name,
        password: formData.password,
        email: formData.email,
        avatar: formData.avatar,
        bio: formData.bio,
        photos: formData.photos,
        videos: formData.videos,
        favMountains: formData.favMountains,
      };

      await updateUserData(formData.username, updateData);

      setLoading(false);
    } catch (error) {
      setError("Error fetching Data!");
      setLoading(false);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Form onSubmit={handleSubmit} error>
      <Form.Field>
        <label>First Name</label>
        <input
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Choose Password</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Avatar Link</label>
        <Input
          placeholder="Add a link for an avatar"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.TextArea>
        <label>Bio</label>
        <Input
          placeholder="Say a little something about yourself!"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </Form.TextArea>
      <Button type="submit">Submit</Button>
      {loading && <p>Loading...</p>}
      <Message error header={error} content={error} />
    </Form>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.data,
  loading: state.user.loading,
  error: state.user.error,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, { updateUserData })(UserUpdateForm);
