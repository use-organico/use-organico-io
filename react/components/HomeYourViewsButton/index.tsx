import React, { useState } from 'react'
import styles from './styles.module.css'

export const SHOW_HOME_REVIEWS_EVENT = "show-reviews"

const HomeYourViewsButton = () => {
  const [showButton, setShowButton] = useState(true)
  
  const onClickHandler = () => {
    const customEvent = new CustomEvent(SHOW_HOME_REVIEWS_EVENT);
    document.dispatchEvent(customEvent);
    setShowButton(false)
  }

  return showButton && <button onClick={onClickHandler} className={styles.button}>Ver avaliações</button>
}

export default HomeYourViewsButton