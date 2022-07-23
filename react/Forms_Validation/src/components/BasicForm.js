import useInput from "../hooks/use-input";

const nameCheck = (entry) => entry.trim() !== "";
const emailCheck = (entry) => entry.includes("@");

const BasicForm = (props) => {
  const {
    value: firstName,
    validValue: firstNameValid,
    invalidValue: firstNameInvalid,
    onChangeHandler: firstNameChangeHandler,
    onBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(nameCheck);

  const {
    value: lastName,
    validValue: lastNameValid,
    invalidValue: lastNameInvalid,
    onChangeHandler: lastNameChangeHandler,
    onBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(nameCheck);

  const {
    value: email,
    validValue: emailValid,
    invalidValue: emailInvalid,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(emailCheck);

  let formValid = false;

  if (firstNameValid && lastNameValid && emailValid) {
    formValid = true;
  }

  const formSubmission = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClass = firstNameInvalid
    ? "form-control invalid"
    : "form-control";
  const lastNameClass = lastNameInvalid
    ? "form-control invalid"
    : "form-control";
  const emailClass = emailInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmission}>
      <div className="control-group">
        <div className={firstNameClass}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstName}
            type="text"
            id="name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameInvalid && (
            <p className="error-text">Please enter your first name</p>
          )}
        </div>
        <div className={lastNameClass}>
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            type="text"
            id="name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInvalid && (
            <p className="error-text">Please enter your last name</p>
          )}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={email}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInvalid && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
