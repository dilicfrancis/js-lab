import "./styles/ChartBar.css";

const ChartBar = (props) => {
  let fill = "0%";

  if (props.max > 0) {
    fill = Math.round((props.value / props.max) * 100) + "%";
  }
  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: fill }}></div>
        <div className="chart-bar__label">{props.label}</div>
      </div>
    </div>
  );
};

export default ChartBar;
