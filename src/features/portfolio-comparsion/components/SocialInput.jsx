import React from 'react'
import styles from '../styles/index.module.css'
const SocialInput = ({item,socials}) => {
  return (
    <div className={styles.socials_container}>
    {socials.map((item2, index) => (
      <div className={styles.input_social_container}>
        <div className={styles.input_social_container_box_1}>
          <img src={item2.image} alt="social" />
        </div>

        <div className={styles.input_social_container_box_2}>
          <input value={item} type="text" disabled={true} />
        </div>
      </div>
    ))}
  </div>
  )
}

export default SocialInput