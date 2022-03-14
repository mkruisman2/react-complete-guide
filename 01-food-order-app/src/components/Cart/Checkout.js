import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const isEmail = (value) => value.includes("@");

const Checkout = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameInputBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameInputBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: confirmEmailValue,
    isValid: confirmEmailIsValid,
    hasError: confirmEmailHasError,
    valueChangeHandler: confirmEmailChangeHandler,
    inputBlurHandler: confirmEmailInputBlurHandler,
    reset: confirmEmailReset,
  } = useInput(isEmail);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: addressReset,
  } = useInput(isNotEmpty);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: cityReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    confirmEmailIsValid &&
    emailValue === confirmEmailValue &&
    addressIsValid &&
    cityIsValid
  ) {
    formIsValid = true;
  }

  const orderHandler = (event) => {
    event.preventDefault();

    const customerInputDetails = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      address: addressValue,
      city: cityValue,
    };

    if (!formIsValid) {
      return;
    } else {
      props.onOrder(customerInputDetails);
      firstNameReset();
      lastNameReset();
      emailReset();
      confirmEmailReset();
      addressReset();
      cityReset();
    }
  };

  const firstNameInputStyle = firstNameHasError ? `${classes.invalid}` : "";
  const lastNameInputStyle = lastNameHasError ? `${classes.invalid}` : "";
  const emailInputStyle = emailHasError ? `${classes.invalid}` : "";
  const confirmEmailInputStyle = confirmEmailHasError
    ? `${classes.invalid}`
    : "";
  const addressInputStyle = addressHasError ? `${classes.invalid}` : "";
  const cityInputStyle = cityHasError ? `${classes.invalid}` : "";

  return (
    <form onSubmit={orderHandler} className={classes.form}>
      <div className={classes.userDetails}>
        <h3>Enter your details</h3>
        <div className={classes.section}>
          <span>
            <label htmlFor="firstName">First name</label>
            <input
              className={firstNameInputStyle}
              id="firstName"
              type="text"
              value={firstNameValue}
              onChange={firstNameChangeHandler}
              onBlur={firstNameInputBlurHandler}
            ></input>
            {firstNameHasError && (
              <p className={classes.error}>Please enter first name</p>
            )}
          </span>
          <span>
            <label htmlFor="lastName">Last name</label>
            <input
              className={lastNameInputStyle}
              id="lastName"
              type="text"
              value={lastNameValue}
              onChange={lastNameChangeHandler}
              onBlur={lastNameInputBlurHandler}
            ></input>
            {lastNameHasError && (
              <p className={classes.error}>Please enter last name</p>
            )}
          </span>
        </div>
        <div className={classes.section}>
          <span>
            <label htmlFor="email">Email</label>
            <input
              className={emailInputStyle}
              id="email"
              type="email"
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailInputBlurHandler}
            ></input>
            {emailHasError && (
              <p className={classes.error}>Please enter a valid email</p>
            )}
          </span>
          <span>
            <label htmlFor="emailConfirm">Confirm Email</label>
            <input
              className={confirmEmailInputStyle}
              id="emailConfirm"
              type="email"
              value={confirmEmailValue}
              onChange={confirmEmailChangeHandler}
              onBlur={confirmEmailInputBlurHandler}
            ></input>
            {confirmEmailHasError && (
              <p className={classes.error}>Please confirm email</p>
            )}
            {!confirmEmailHasError && (emailValue !== confirmEmailValue) && (
              <p className={classes.error}>Please check email</p>
            )}
          </span>
        </div>
        <div className={classes.section}>
          <span>
            <label htmlFor="address">Street + number</label>
            <input
              className={addressInputStyle}
              id="address"
              type="text"
              value={addressValue}
              onChange={addressChangeHandler}
              onBlur={addressInputBlurHandler}
            ></input>
            {addressHasError && (
              <p className={classes.error}>Please enter an address</p>
            )}
          </span>
          <span>
            <label htmlFor="city">City</label>
            <input
              className={cityInputStyle}
              id="city"
              type="text"
              value={cityValue}
              onChange={cityChangeHandler}
              onBlur={cityInputBlurHandler}
            ></input>
            {cityHasError && (
              <p className={classes.error}>Please enter a city</p>
            )}
          </span>
        </div>
      </div>

      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onClose}
          type="button"
        >
          Close
        </button>
        <button
          disabled={!formIsValid}
          className={classes.button}
          type="submit"
        >
          Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
