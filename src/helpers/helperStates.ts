import { UserData } from "../redux/slices/userSlice";
import { LoginData } from "../redux/slices/authSlice";

export const initialUserState: UserData = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  avatar: "",
  bio: "",
  isAdmin: false,
  videos: [],
  photos: [],
  favMountains: [],
};

export const initialLoginState: LoginData = {
  username: "",
  password: "",
};
