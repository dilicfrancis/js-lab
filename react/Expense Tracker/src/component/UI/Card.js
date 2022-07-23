import "./styles/Card.css";
const Card = (props) => {
  const classes = "card " + props.className;
  const children = props.children;
  return <div className={classes}>{children}</div>;
};

export default Card;
