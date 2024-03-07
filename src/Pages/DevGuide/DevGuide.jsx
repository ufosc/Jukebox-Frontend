import { Link } from 'react-router-dom'
import { Colors } from './Colors/Colors'
import { GreyScaleColors } from './Colors/GreyScaleColors'
import { SystemColors } from './Colors/SystemColors'

import styles from './DevGuide.module.css'

export const DevGuide = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Dev Guide</h1>
        </div>
      </section>
      <div className="container">
        <section>
          <h3>Brand Colors</h3>
          <Colors />
          <hr />
        </section>
        <div className="row margin-y">
          <div className="col-6">
            <h3>Pages</h3>
            <ul>
              <li>
                <Link to="/auth">Auth</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/boards">Boards</Link>
              </li>
              <li>
                <Link to="/members">Members</Link>
              </li>
            </ul>
            <h3 className="margin-bottom-sm">Primary Fonts</h3>
            <div className={styles['font-container']}>
              <h1>Heading 1 Example</h1>
              <h2>Heading 2 Example</h2>
              <h3>Heading 3 Example</h3>
              <h4>Heading 4 Example</h4>
              <strong>Body Example:</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Maecenas ultricies mi eget mauris pharetra. Integer feugiat
                scelerisque varius morbi enim nunc faucibus a pellentesque. Ante
                metus dictum at tempor commodo ullamcorper a lacus. Sodales
                neque sodales ut etiam sit amet nisl. Eget arcu dictum varius
                duis at consectetur lorem donec massa. Ac tortor vitae purus
                faucibus ornare suspendisse sed nisi lacus. Ultrices vitae
                auctor eu augue ut lectus arcu bibendum. Non arcu risus quis
                varius quam quisque id. Vestibulum sed arcu non odio euismod
                lacinia at quis. Diam quis enim lobortis scelerisque fermentum.
                Tempor commodo ullamcorper a lacus vestibulum. Amet dictum sit
                amet justo donec enim diam vulputate. Dui vivamus arcu felis
                bibendum ut tristique et. Sollicitudin tempor id eu nisl.
              </p>
              <div className="large-accent">Large Accent</div>
              <div className="large-accent large-accent--gradient">
                Large Accent
              </div>
              <div className="thin-accent">Thin Accent</div>
              <div className="card-title">Card Title</div>
            </div>
          </div>
          <div className="col-6">
            <h3 className="margin-bottom-sm">System Colors</h3>
            <SystemColors />
            <h3 className="margin-top margin-y-sm">Primary Fonts</h3>
            <GreyScaleColors />
            <h3 className="margin-top margin-y-sm">
              Buttons and Call to Actions
            </h3>
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
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p>Website by the UF Open Source Club</p>
      </div>
    </>
  )
}
