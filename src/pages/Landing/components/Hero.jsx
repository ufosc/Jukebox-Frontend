import React from 'react';
import classes from './Hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.hero__left}>
        <h1>
          Welcome to the&nbsp;
          <span className={classes.title__highlight}>Jukebox</span>
          &nbsp;Project
        </h1>
        <p className={classes.title__description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sunt reprehenderit molestias laudantium in impedit blanditiis enim et id distinctio. Earum ad nemo non facere ipsa deserunt beatae assumenda quibusdam!
        </p>
        <div className={classes.github__container}>
          <div className={classes.github__line}></div>
          <button type="button">Visit GitHub</button>
        </div>
      </div>
      <div className={classes.hero__right}>

      </div>

    </section>
  )
}
