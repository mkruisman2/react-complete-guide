import React from "react";

import UsersListItem from "./UsersListItem";
import styles from "./UsersList.module.css";

const UsersList = (props) => {
  return (
    <ul className={styles.users_list}>
      {props.usersList.map(user => (
        <UsersListItem
          key={user.key}
          name={user.name}
          age={user.age}
        />
      ))}
    </ul>
  );
};

export default UsersList;
