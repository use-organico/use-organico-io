import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import styles from './styles.module.css'

interface PaginationButtonType {
  text: string
  page: number
  active: boolean
}

const PaginationButton = ({text, page, active}: PaginationButtonType) => {
  const { setQuery } = useRuntime()

  const clickHandler = () => {
    setQuery({
      page
    })

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return <button className={`${styles.button} ${active ? styles.buttonActive : ''}`} onClick={clickHandler}>{text}</button>
}

export default PaginationButton