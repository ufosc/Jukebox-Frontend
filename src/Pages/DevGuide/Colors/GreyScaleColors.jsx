import React from "react";
import styles from "./SmallColors.module.css";

export default function GreyScaleColors() {
  let color = "red";
  console.log(`Hello! ${color}`)
  return (
    <div className={`system-colors row-flex ${styles["grey-scale-colors"]}`}>
      <div className={`col-1-of-4 ${styles["system-color-block"]}`}>
        <span className={styles["system-color"]} id={styles["color-black"]}>&nbsp;</span>
        Black
      </div>
      <div className={`col-1-of-4 ${styles["system-color-block"]}`}>
      <span className={styles["system-color"]} id={styles["color-dark-grey"]}>&nbsp;</span>
        Dark Grey
      </div>
      <div className={`col-1-of-4 ${styles["system-color-block"]}`}>
      <span className={styles["system-color"]} id={styles["color-light-grey"]}>&nbsp;</span>
        Light Grey
      </div>
      <div className={`col-1-of-4 ${styles["system-color-block"]}`}>
      <span className={styles["system-color"]} id={styles["color-white"]}>&nbsp;</span>
        White
      </div>
    </div>
  );
}
