import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useHttp from "../hooks/use-http";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/index");
    }
  }, [status, history]);

  const addQuoteHandler = (data) => {
    sendRequest(data);
    //history.push("/index");
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
