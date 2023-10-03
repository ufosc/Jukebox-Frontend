import React from 'react';
import styles from './Colors.module.css';

export default function Colors() {
  return (
    <div className={styles["colors-container"]}>
    <div className={styles["color-box"]}>
      <span className={styles["color-box__color"]} id={styles["cherry"]}>&nbsp;</span>
      Cherry
    </div>
    <div className={styles["color-box"]}>
      <span className={styles["color-box__color"]} id={styles["coral"]}>&nbsp;</span>
      Coral
    </div>
    <div className={styles["color-box"]}>
      <span className={styles["color-box__color"]} id={styles["dark-cyan"]}>&nbsp;</span>
      Dark Cyan
    </div>
    <div className={styles["color-box"]}>
      <span className={styles["color-box__color"]} id={styles["sage"]}>&nbsp;</span>
      Sage
    </div>
    <div className={styles["color-box"]}>
      <span className={styles["color-box__color"]} id={styles["light-sky"]}>&nbsp;</span>
      Light Sky
    </div>
  </div>
  )
}
