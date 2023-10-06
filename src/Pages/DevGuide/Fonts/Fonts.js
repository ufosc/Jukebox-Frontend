import React from "react";
import styles from "./Fonts.module.css";

export default function Fonts() {
  return (
    <div className={styles["font-container"]}>
      <h1>Heading 1 Example</h1>
      <h2>Heading 2 Example</h2>
      <h3>Heading 3 Example</h3>
      <h4>Heading 4 Example</h4>
      <strong>Body Example:</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Maecenas ultricies mi eget mauris pharetra. Integer feugiat
        scelerisque varius morbi enim nunc faucibus a pellentesque. Ante metus dictum at tempor
        commodo ullamcorper a lacus. Sodales neque sodales ut etiam sit amet nisl. Eget arcu dictum
        varius duis at consectetur lorem donec massa. Ac tortor vitae purus faucibus ornare
        suspendisse sed nisi lacus. Ultrices vitae auctor eu augue ut lectus arcu bibendum. Non arcu
        risus quis varius quam quisque id. Vestibulum sed arcu non odio euismod lacinia at quis.
        Diam quis enim lobortis scelerisque fermentum. Tempor commodo ullamcorper a lacus
        vestibulum. Amet dictum sit amet justo donec enim diam vulputate. Dui vivamus arcu felis
        bibendum ut tristique et. Sollicitudin tempor id eu nisl.
      </p>
      <div className="large-accent">Large Accent</div>
      <div className="large-accent large-accent--gradient">Large Accent</div>
      <div className="thin-accent">Thin Accent</div>
      <div className="card-title">Card Title</div>
    </div>
  );
}
