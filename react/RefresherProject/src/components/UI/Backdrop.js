import ReactDOM from "react-dom";
import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.Clicked}></div>;
};

const Render = (props) => {
  return ReactDOM.createPortal(
    <Backdrop Clicked={props.Error} />,
    document.getElementById("backdrop-root")
  );
};

export default Render;
