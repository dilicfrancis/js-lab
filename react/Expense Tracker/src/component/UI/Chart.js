import ChartBar from "./ChartBar";
import "./styles/Chart.css";

const Chart = (props) => {
  const plotValues = props.plots.map((plot) => plot.value);
  const maxTotal = Math.max(...plotValues);

  return (
    <div className="chart">
      {props.plots.map((plots) => (
        <ChartBar
          key={plots.label}
          value={plots.value}
          max={maxTotal}
          label={plots.label}
        />
      ))}
    </div>
  );
};

export default Chart;
