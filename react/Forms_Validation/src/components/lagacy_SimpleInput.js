import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const isValid = name.trim() !== "";
  const nameValid = !isValid && nameTouched;

  const eValid = email.includes("@");
  const emailValid = !eValid && emailTouched;

  let formValid = false;

  if (isValid && eValid) {
    formValid = true;
  }

  useEffect(() => {
    if (isValid) {
      console.log("Code: I really don't have to here here");
    } else {
      console.log("why am I still part of this operation?");
    }
    return () => {
      return;
    };
  }, [isValid]);

  const nameInputHandler = (event) => {
    setName(event.target.value);
  };

  const nameBlurHandler = (event) => {
    setNameTouched(true);
  };

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setEmailTouched(true);
  };

  const formSubmission = (event) => {
    event.preventDefault();
    setNameTouched(true);

    if (!isValid) {
      return;
    }

    console.log(name);
    console.log(nameRef.current.value);
    //nameRef.current.value = ""; //not a good approach. Avoid manipulating the DOM directly with Ref. Best to talk to React and allow React talk to DOM.
    setName("");
    setEmail("");
    setNameTouched(false);
    setEmailTouched(false);
  };

  const nameClass = nameValid ? "form-control invalid" : "form-control";
  const emailClass = emailValid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmission}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameRef}
          value={name}
          type="text"
          id="name"
          onChange={nameInputHandler}
          onBlur={nameBlurHandler}
        />
        {nameValid && <p className="error-text">Please enter your name</p>}
      </div>
      <div className={emailClass}>
        <label htmlFor="email">Your eMail</label>
        <input
          value={email}
          type="email"
          id="email"
          onChange={emailInputHandler}
          onBlur={emailBlurHandler}
        />
        {emailValid && (
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
