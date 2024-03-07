import styles from './SmallColors.module.css'

export const SystemColors = () => {
  return (
    <div className="system-colors row-flex">
      <div className={`col-1-of-4 ${styles['system-color-block']}`}>
        <span className={styles['system-color']} id={styles['color-info']}>
          &nbsp;
        </span>
        Info
      </div>
      <div className={`col-1-of-4 ${styles['system-color-block']}`}>
        <span className={styles['system-color']} id={styles['color-success']}>
          &nbsp;
        </span>
        Success
      </div>
      <div className={`col-1-of-4 ${styles['system-color-block']}`}>
        <span className={styles['system-color']} id={styles['color-danger']}>
          &nbsp;
        </span>
        Danger
      </div>
      <div className={`col-1-of-4 ${styles['system-color-block']}`}>
        <span className={styles['system-color']} id={styles['color-warning']}>
          &nbsp;
        </span>
        Warning
      </div>
    </div>
  )
}
