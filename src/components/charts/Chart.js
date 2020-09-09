import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import styles from "./charts.module.css";

const MyChart = ({ data, options, type, width }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type,
      data,
      options,
    });
    chart.update();
    return () => {
      chart.destroy();
    };
  }, [data, options, type]);

  return (
    <div className={styles.container} style={{ width }}>
      <canvas ref={canvasRef} className={styles.canvas_line_chart}>
        <p className={styles.fallback_p}>Hello Fallback World</p>
      </canvas>
    </div>
  );
};

export default MyChart;
