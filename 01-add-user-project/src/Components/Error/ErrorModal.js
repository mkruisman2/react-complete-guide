import React from "react";

import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  let errorMessage;
  switch (props.error.error) {
    case "Both":
      errorMessage = "Please enter both a username and age.";
      break;
    case "Username":
      errorMessage = "Please make sure to enter a username.";
      break;
    case "Age":
      errorMessage = "Please make sure to enter the age.";
      break;
    default:
      break;
  }
  return (
    <div className={styles["modal"]}>
      <div className={styles["header"]}>Invalid input</div>
      <div className={styles["content"]}>{errorMessage}</div>
      <div className={styles["actions"]}>
        <button type="button" className={styles["close"]} onClick={props.onClose}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
