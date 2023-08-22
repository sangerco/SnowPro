import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUserData, UserData } from "../../redux/slices/userSlice";
import User from "./User";

const Users = () => {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div>
      {users.loading ? (
        <p>Loading...</p>
      ) : users.error ? (
        <p>Error: {users.error}</p>
      ) : users.users ? (
        <ul>
          {users.users.map((user: UserData) => (
            <User user={user} />
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Users;
