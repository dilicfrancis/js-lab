import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: name,
    validValue: nameValid,
    invalidValue: nameInvalid,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((entry) => entry.trim() !== "");

  const {
    value: email,
    validValue: emailValid,
    invalidValue: emailInvalid,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((entry) => entry.includes("@"));

  let formValid = false;

  if (nameValid && emailValid) {
    formValid = true;
  }

  const formSubmission = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }

    resetEmail();
    resetName();
  };

  const nameClass = nameInvalid ? "form-control invalid" : "form-control";
  const emailClass = emailInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmission}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input
          value={name}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInvalid && <p className="error-text">Please enter your name</p>}
      </div>
      <div className={emailClass}>
        <label htmlFor="email">Your eMail</label>
        <input
          value={email}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInvalid && (
          <p className="error-text">Please enter your valid email</p>
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

export default SimpleInput;
