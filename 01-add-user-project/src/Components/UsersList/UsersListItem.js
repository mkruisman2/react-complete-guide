import React from "react";

import styles from "./UsersListItem.module.css";

const UsersListItem = (props) => {
  return (
    <li className={styles.list_item}>
      <span className={styles.list_item__item}>{props.name}</span>
      <span className={styles.list_item__item}>{props.age}</span>
    </li>
  );
};

export default UsersListItem;
