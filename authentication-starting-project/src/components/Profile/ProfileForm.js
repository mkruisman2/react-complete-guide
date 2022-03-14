import { useRef, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import { acc_key } from "../../utils/auth";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    setIsLoading(true);
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${acc_key}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Changing password failed!";
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message;
          // }
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      history.replace("/");
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" ref={newPasswordInputRef} />
      </div>
      {!isLoading && <div className={classes.action}>
        <button>Change Password</button>
      </div>}
      {isLoading && <p>Sending request...</p>}
    </form>
  );
};

export default ProfileForm;
