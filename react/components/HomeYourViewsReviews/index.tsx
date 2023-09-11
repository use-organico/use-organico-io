import React, { useEffect, useState } from 'react'
import { SHOW_HOME_REVIEWS_EVENT } from '../HomeYourViewsButton'

interface HomeYourViewsReviewsProps {
  children: JSX.Element | JSX.Element[]
}

const HomeYourViewsReviews = ({children}: HomeYourViewsReviewsProps) => {
  const [showReviews, setShowReviews] = useState(false)

  useEffect(() => {
    document.addEventListener(SHOW_HOME_REVIEWS_EVENT, () => {
      console.log("mostrou o evento show reviews")
      setShowReviews(true)
    }, false)

    return () => {
      document.removeEventListener(SHOW_HOME_REVIEWS_EVENT, () => {
        setShowReviews(true)
      }, false)
    }
  }, [])

  return showReviews && (
    <>
      {children}
    </>
  )
}

export default HomeYourViewsReviews