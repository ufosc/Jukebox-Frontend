import styles from './Colors.module.css'

export const Colors = () => {
  return (
    <div className={styles['colors-container']}>
      <div className={styles['color-box']}>
        <span className={`background-cherry ${styles['color-box__color']}`}>
          &nbsp;
        </span>
        Cherry
      </div>
      <div className={styles['color-box']}>
        <span className={`background-coral ${styles['color-box__color']}`}>
          &nbsp;
        </span>
        Coral
      </div>
      <div className={styles['color-box']}>
        <span className={`background-dark-cyan ${styles['color-box__color']}`}>
          &nbsp;
        </span>
        Dark Cyan
      </div>
      <div className={styles['color-box']}>
        <span className={`background-sage ${styles['color-box__color']}`}>
          &nbsp;
        </span>
        Sage
      </div>
      <div className={styles['color-box']}>
        <span
          className={`background-light-sky ${styles['color-box__color']}`}
          id={styles['light-sky']}
        >
          &nbsp;
        </span>
        Light Sky
      </div>
    </div>
  )
}
