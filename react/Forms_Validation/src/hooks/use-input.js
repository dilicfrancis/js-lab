import { useReducer } from "react";

const initialState = {
  value: "",
  touched: false,
};

const reducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, touched: state.touched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, touched: true };
  }

  if (action.type === "RESET") {
    return { value: "", touched: false };
  }

  return initialState;
};

const useInput = (validate) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validValue = validate(state.value);
  const invalidValue = !validValue && state.touched;

  const onChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const onBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: state.value,
    validValue,
    invalidValue,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
