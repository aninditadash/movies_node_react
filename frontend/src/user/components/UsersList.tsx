import React from "react";
import UsersListItem from "./UsersListItem";

const UsersList = ({ usersList }: any) => {
  if (usersList?.length === 0) {
    return <div>No users found!!</div>;
  }
  return (
    <ul>
      {usersList.map(({ userName, userImage, userId }: any) => (
        <UsersListItem
          key={userId}
          name={userName}
          image={userImage}
          id={userId}
        />
      ))}
    </ul>
  );
};

export default UsersList;
