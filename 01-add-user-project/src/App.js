import React, { useState } from "react";

import Card from "./Components/UI/Card";
import InputForm from "./Components/InputForm/InputForm";
import ErrorModal from "./Components/Error/ErrorModal";
import UsersList from "./Components/UsersList/UsersList";

import "./App.css";

const App = () => {
  const [userInputDetails, setUserInputDetails] = useState([]);
  const [validUserInput, setValidUserInput] = useState({
    status: true,
    error: "",
  });

  const validateUserInputDataHandler = (userInput) => {
    // TODO: try with ternary operator
    if (
      userInput.userName.trim().length === 0 &&
      userInput.userAge.trim().length === 0
    ) {
      setValidUserInput({ status: false, error: "Both" });
      return;
    }

    if (userInput.userName.trim().length === 0) {
      setValidUserInput({ status: false, error: "Username" });
      return;
    }

    if (userInput.userAge.trim().length === 0) {
      setValidUserInput({ status: false, error: "Age" });
      return;
    }

    setValidUserInput({ status: true, error: "" });

    setUserInputDetails((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.unshift({
        name: userInput.userName,
        age: userInput.userAge,
        key: Math.random().toString(),
      });
      return updatedUsers;
    });
  };

  const closeErrorModalHandler = () => {
    setValidUserInput({ status: true, error: "" });
  };

  return (
    <div>
      <Card>
        <InputForm onUserSubmit={validateUserInputDataHandler} errorStatus={validUserInput.status}/>{" "}
      </Card>

      {!validUserInput.status && (
        <ErrorModal error={validUserInput} onClose={closeErrorModalHandler} />
      )}
      <Card>
        {userInputDetails.length > 0 ? (
          <UsersList usersList={userInputDetails} />
        ) : (
          <p className="app-no-list">There are no users to show</p>
        )}
      </Card>
    </div>
  );
};

export default App;
