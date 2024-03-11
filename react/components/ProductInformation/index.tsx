import React, { useState, useEffect } from "react";
import { ProductContext } from "vtex.product-context";
import ReactPlayer from 'react-player'

import style from "./styles.css";

const RenderHTML = (props: any) => {
  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
    </div>
  );
};

const ProductInformation = () => {
  const [fullDisplay, setFullDisplay] = useState<boolean>(false)
  const { product } = React.useContext(ProductContext) || {};
  const [productInformationData, setProductInformationData] = useState<any[]>(
    []
  );

  const getProductInformation = () => {
    setProductInformationData(product?.properties || []);
  };

  useEffect(() => {
    getProductInformation();
  }, [product]);

  console.log('product', product)

  const videos = product?.items?.[0]?.videos

  const usefulSpecifications = ['texto-o-que-ele-e', 'texto-o-que-ele-faz', 'texto-o-que-ele-tem', 'texto-por-que-usar', 'texto-passo-a-passo']

  const hasAny = productInformationData.find((info: any) => usefulSpecifications.includes(info.name))

  if(!hasAny) return <></>

  return (
    <div className={`${style.productInformation_container} ${ fullDisplay ? style.productInformation_container_full : ''}`}>
      <div className={style.productInformation_content}>
        {productInformationData.map((specification: any) =>
          specification?.name === "texto-o-que-ele-e" ? (
            <div className={style.productInformation_item}>
              <h2 className={style.productInformation_item_title} id="o-que-e">
                O que é o {product.productName}?
              </h2>
              <div className={style.productInformation_item_values}>
                {specification?.values.map((value: any) => (
                  <div className={style.productInformation_item_value}>
                    <RenderHTML HTML={value} />
                  </div>
                ))}
              </div>
            </div>
          ) : specification?.name === "texto-o-que-ele-faz" ? (
            <div className={style.productInformation_item}>
              <h2
                className={style.productInformation_item_title}
                id="o-que-faz"
              >
                O que faz?
              </h2>
              <div className={style.productInformation_item_values}>
                {specification?.values.map((value: any) => (
                  <div className={style.productInformation_item_value}>
                    <RenderHTML HTML={value} />
                  </div>
                ))}
              </div>
            </div>
          ) : specification?.name === "texto-o-que-ele-tem" ? (
            <div className={style.productInformation_item}>
              <h2
                className={style.productInformation_item_title}
                id="o-que-tem"
              >
                O que tem o {product.productName}?
              </h2>
              <div className={style.productInformation_item_values}>
                {specification?.values.map((value: any) => (
                  <div className={style.productInformation_item_value}>
                    <RenderHTML HTML={value} />
                  </div>
                ))}
              </div>
            </div>
          ) : specification?.name === "texto-por-que-usar" ? (
            <div className={style.productInformation_item}>
              <h2 className={style.productInformation_item_title} id="pq-usar">
                Por que usar o {product.productName}?
              </h2>
              <div className={style.productInformation_item_values}>
                {specification?.values.map((value: any) => (
                  <div className={style.productInformation_item_value}>
                    <RenderHTML HTML={value} />
                  </div>
                ))}
              </div>
            </div>
          ) : specification?.name === "texto-passo-a-passo" ? (
            <div className={style.productInformation_item}>
              <h2
                className={style.productInformation_item_title}
                id="como-usar"
              >
                Como usar?
              </h2>
              <div className={style.productInformation_item_values}>
                {specification?.values.map((value: any) => (
                  <div className={style.productInformation_item_value}>
                    <RenderHTML HTML={value} />
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {
        videos && videos.map((video: any) => {
          return <div className={style.productInformation_video_container}>
            <ReactPlayer url={video.videoUrl} controls={true} />
          </div>
        })
      }

      <div className={style.productInformation_footer}>
        <button
          className={style.productInformation_seeMore_button}
          onClick={() => setFullDisplay(!fullDisplay)}
        >Clique para ver {fullDisplay ? 'menos' : 'mais'}</button>
      </div>
    </div>
  );
};

export default ProductInformation;
