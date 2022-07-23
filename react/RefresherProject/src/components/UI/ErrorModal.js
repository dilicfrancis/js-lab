import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import Backdrop from "./Backdrop";
import styles from "./ErrorModal.module.css";

const Error = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.Error}>OK</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Error
          title={props.title}
          message={props.message}
          Error={props.onError}
        />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <Backdrop Error={props.onError} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default ErrorModal;
