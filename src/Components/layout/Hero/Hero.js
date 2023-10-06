import React from "react";
import styles from "./Hero.module.css";

export default function Hero({ title }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}
