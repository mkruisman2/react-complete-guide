import React, { useState } from "react";

import styles from "./InputForm.module.css";

const InputForm = (props) => {
  const [userName, setUsername] = useState("");
  const [age, setAge] = useState("");

  const inputUsernameHandler = (e) => {
    setUsername(e.target.value);
  }

  const inputAgeHandler = (e) => {
    setAge(e.target.value);
  }

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userName,
      userAge: age
    }
    props.onUserSubmit(newUser);
    
    setUsername("");
    setAge("");
  }
  
  return (
    <form className={styles.inputform} onSubmit={onFormSubmitHandler}>
      <div>
        <label className={styles.inputform__label}>Username</label>
        <input className={styles.inputform__input} name="userName" type="text" value={userName} onChange={inputUsernameHandler} />
      </div>
      <div>
        <label className={styles.inputform__label}>Age (Years)</label>
        <input className={styles.inputform__input} name="userAge" type="number" value={age} min="0" onChange={inputAgeHandler} />
      </div>
      <div>
        <button className={styles.button} type="submit">Add User</button>
      </div>
    </form>
  );
};

export default InputForm;
