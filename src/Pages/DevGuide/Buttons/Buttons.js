import React from "react";
import styles from "./Buttons.module.css";

export default function Buttons() {
  return (
    <div className={styles['buttons-container']}>
      <div>
        <button className="btn btn-primary">Primary CTA</button>
      </div>
      <div>
        <button className="btn btn-secondary">Secondary CTA</button>
      </div>
      <div>
        <button className="btn btn-inline">Inline CTA</button>
      </div>
    </div>
  );
}
