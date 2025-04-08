import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context'

import styles from './style.modules.css';

const StarsReview = () => {

    const [reviews, setReviews] = useState([]);
    const { product } = useProduct();
    const { productId } = product || {};

    const fetchReviews = async () => { 
        try {
            const response = await fetch(`/reviews?productId=${productId}`);
            const { data } = await response.json();
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, []);

    const ratingCalculator = (reviews: any) => {
        const ratings = reviews.map((review: any) => review.rating);
        const sum = ratings.reduce((acc: number, rating: number) => acc + rating, 0);
        const average = sum / ratings.length;
        const roundedAverage = Math.ceil(average * 2) / 2; // Round up to the nearest 0.5
        return roundedAverage;
    }

    const StarRating = ({ 
        rating = 0, 
        fillColor = "#FFD700", 
        emptyColor = "#D3D3D3", 
        size = 24, 
        precision = true 
      }) => {
        // Garantir que o rating esteja entre 0 e 5
        const normalizedRating = Math.max(0, Math.min(5, rating));
        
        // Array para renderizar 5 estrelas
        const stars = Array.from({ length: 5 }, (_, index) => {
        //   const starValue = index + 1;
          const fillPercentage = Math.min(100, Math.max(0, (normalizedRating - index) * 100));
      
          return (
            <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
              {/* Estrela vazia (fundo) */}
              <svg 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill={emptyColor}
                  stroke={emptyColor}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
      
              {/* Estrela preenchida (baseado na classificação) */}
              {(precision ? fillPercentage > 0 : fillPercentage >= 50) && (
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    clipPath: precision 
                      ? `inset(0 ${100 - fillPercentage}% 0 0)` 
                      : 'none'
                  }}
                  width={size}
                  height={size}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill={fillColor}
                    stroke={fillColor}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          );
        });
      
        return <div className="star-rating">{stars}</div>;
    };

    return (
        <div className={styles.ratingStars}>
            <div className="star-rating">
                <StarRating rating={ratingCalculator(reviews)} />
            </div>
            <p>{reviews.length} Reviews</p>
        </div>
    )

}

export default StarsReview;