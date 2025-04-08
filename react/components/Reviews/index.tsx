import React, { useEffect, useState } from "react";
import { useProduct } from 'vtex.product-context'

import styles from './style.modules.css';

const Reviews = () => {

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

    console.log('product', product);

    const formatDate = (dateString: any) => {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
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

    if(reviews.length === 0) return <></>

    return (
        <section className={styles.contentReviews}>
            <h1 className={styles.titleReviews}>Confira a opinião dos nossos clientes</h1>
            {
                reviews &&
                reviews.map((review: any, index: any) => (
                    <div key={index} className={styles.dividerRating}> 
                        <p>{review.comment}</p>
                        <h4>{review.productName}</h4>
                        <div className={styles.rating}>
                            <StarRating rating={review.rating} />
                        </div>
                        <div className={styles.userAndDate}>
                            <p>{review.user}</p>
                            <p>{formatDate(review.date)}</p>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default Reviews;