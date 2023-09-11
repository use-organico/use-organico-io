import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import style from "./styles.css";

const SeoText = (props) => {
  const [fullDisplay, setFullDisplay] = useState(false)

  return props.text ? (
    <div className={`${style.seotext_container} ${fullDisplay ? style.seotext_container_fulldisplay : ''}`}>
      <div className={style.seotext_content}>
        <ReactMarkdown>{props.text}</ReactMarkdown>
      </div>
      <div
        className={style.seotext_content}
      >
        <ReactMarkdown>{props.text2}</ReactMarkdown>
      </div>

      <div className={style.seo_text_search_page_footer}>
        <button
          className={style.productInformation_seeMore_button}
          onClick={() => setFullDisplay(!fullDisplay)}
        >Ler {fullDisplay ? 'menos' : 'mais'}</button>
      </div>
    </div>
  ) : null;
};

SeoText.defaultProps = {
  showBtn: true,
  text: "",
  text2: "",
  btnTextClose: "Leia menos",
  btnTextOpen: "Leia mais",
};

SeoText.schema = {
  title: "Texto SEO",
  description: "Texto SEO",
  type: "object",
  properties: {
    showBtn: {
      title: "Mostrar botão",
      type: "boolean",
      default: true,
    },
    text: {
      default: SeoText.defaultProps.text,
      title: "Texto Default",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    text2: {
      default: SeoText.defaultProps.text2,
      title: "Texto Escondido",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    btnTextClose: {
      default: SeoText.defaultProps.btnTextClose,
      title: "Fechar",
      type: "string",
    },
    btnTextOpen: {
      default: SeoText.defaultProps.btnTextOpen,
      title: "Abrir",
      type: "string",
    },
  },
};

export default SeoText;
