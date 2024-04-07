import React, { Fragment, useState } from "react";

import styles from "./styles.module.css"


const SEOContentCategories = ({
    content_01,
    content_02,
    content_03,
    active
}: any) => {

    const [ activeContent01, setActiveContent01 ] = useState(false)
    const [ activeContent02, setActiveContent02 ] = useState(false)
    const [ activeContent03, setActiveContent03 ] = useState(false)
    
    return (
        (active === true) ?
            <Fragment>
                <section className={styles.contentSEO}>
                    <div className={styles.contentSEOHeader}>
                        <h3>Use Orgânico explica!</h3>
                        <p>Fique por dentro dos nossos <span>conteúdos</span></p>
                    </div>
                    <ul className={styles.listContent}>
                        <li onClick={() => setActiveContent01(true)}>
                            <img src={content_01[0]} />
                            <div className={styles.textContent}>
                                <h4>{content_01[1]}</h4>
                                <p>{content_01[2]}</p>
                                <span>Continue lendo...</span>
                            </div>
                        </li> 
                        <li onClick={() => setActiveContent02(true)}>
                            <img src={content_02[0]} />
                            <div className={styles.textContent}>
                                <h4>{content_02[1]}</h4>
                                <p>{content_02[2]}</p>
                                <span>Continue lendo...</span>
                            </div>
                        </li> 
                        <li onClick={() => setActiveContent03(true)}>
                            <img src={content_03[0]} />
                            <div className={styles.textContent}>
                                <h4>{content_03[1]}</h4>
                                <p>{content_03[2]}</p>
                                <span>Continue lendo...</span>
                            </div>
                        </li> 
                    </ul>
                </section>
                <section className={`${styles.modalContentOverlay} ${(activeContent01 === true) || (activeContent02 === true) || (activeContent03 === true)? styles.modalActive : styles.modalInactive}`}>
                    <div className={`${styles.modalContent01} ${(activeContent01 === true) ? styles.modalActive : styles.modalInactive}`}>
                        <div className={styles.contentSEOHeader}>
                            <h3>Use Orgânico explica!</h3>
                            <p>Fique por dentro dos nossos <span>conteúdos</span></p>
                            <div className={styles.closeModal01} onClick={() => setActiveContent01(false)}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className={styles.contentSEOText01}>
                            <div
                                dangerouslySetInnerHTML={ {__html: content_01[3]}} 
                            />
                        </div>
                    </div>
                    <div className={`${styles.modalContent01} ${(activeContent02 === true) ? styles.modalActive : styles.modalInactive}`}>
                        <div className={styles.contentSEOHeader}>
                            <h3>Use Orgânico explica!</h3>
                            <p>Fique por dentro dos nossos <span>conteúdos</span></p>
                            <div className={styles.closeModal01} onClick={() => setActiveContent02(false)}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className={styles.contentSEOText01}>
                            <div
                                dangerouslySetInnerHTML={ {__html: content_02[3]}} 
                            />
                        </div>
                    </div>
                    <div className={`${styles.modalContent01} ${(activeContent03 === true) ? styles.modalActive : styles.modalInactive}`}>
                        <div className={styles.contentSEOHeader}>
                            <h3>Use Orgânico explica!</h3>
                            <p>Fique por dentro dos nossos <span>conteúdos</span></p>
                            <div className={styles.closeModal01} onClick={() => setActiveContent03(false)}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className={styles.contentSEOText01}>
                            <div
                                dangerouslySetInnerHTML={ {__html: content_03[3]}} 
                            />
                        </div>
                    </div>
                </section>
            </Fragment>
        : ''
    )
}

SEOContentCategories.schema = {
    title: 'Conteúdo SEO Modal',
    description: 'Conteúdo SEO Modal',
    type: 'object',
    properties: {
        active: {
            title: 'Ativar Conteúdo',
            description: 'Ativar Conteúdo',
            type: 'boolean',
            default: false
        },
        content_01: {
            title: 'Conteúdo SEO Modal',
            description: 'Conteúdo SEO Modal',
            type: 'object',
            properties: [
                {
                    title: 'URL da Imagem - Conteúdo 1',
                    description: 'URL da Imagem - Conteúdo 1',
                    type: 'string',
                    image_url: '',
                    widget: {
                        "ui:widget": "image-uploader",
                    }
                },
                {
                    title: 'Título Conteúdo - Conteúdo 1',
                    description: 'Título Conteúdo - Conteúdo 1',
                    type: 'string',
                    title_content: ''
                },
                {
                    title: 'Conteúdo Curto - Conteúdo 1',
                    description: 'Conteúdo Curto - Conteúdo 1',
                    type: 'string',
                    short_content: ''
                },
                {
                    title: 'Conteúdo Completo - Conteúdo 1',
                    description: 'Utilize markdown',
                    type: 'string',
                    complete_content: '',
                    widget: {
                        "ui:widget": "textarea"
                    }
                }
            ]
        },
        content_02: {
            title: 'Conteúdo SEO Modal',
            description: 'Conteúdo SEO Modal',
            type: 'object',
            properties: [
                {
                    title: 'URL da Imagem - Conteúdo 2',
                    description: 'URL da Imagem - Conteúdo 2',
                    type: 'string',
                    image_url: '',
                    widget: {
                        "ui:widget": "image-uploader",
                    }
                },
                {
                    title: 'Título Conteúdo - Conteúdo 2',
                    description: 'Título Conteúdo - Conteúdo 2',
                    type: 'string',
                    title_content: ''
                },
                {
                    title: 'Conteúdo Curto - Conteúdo 2',
                    description: 'Conteúdo Curto - Conteúdo 2',
                    type: 'string',
                    short_content: ''
                },
                {
                    title: 'Conteúdo Completo - Conteúdo 2',
                    description: 'Utilize markdown',
                    type: 'string',
                    complete_content: '',
                    widget: {
                        "ui:widget": "textarea"
                    }
                }
            ]
        },
        content_03: {
            title: 'Conteúdo SEO Modal',
            description: 'Conteúdo SEO Modal',
            type: 'object',
            properties: [
                {
                    title: 'URL da Imagem - Conteúdo 3',
                    description: 'URL da Imagem - Conteúdo 3',
                    type: 'string',
                    image_url: '',
                    widget: {
                        "ui:widget": "image-uploader",
                    }
                },
                {
                    title: 'Título Conteúdo - Conteúdo 3',
                    description: 'Título Conteúdo - Conteúdo 3',
                    type: 'string',
                    title_content: ''
                },
                {
                    title: 'Conteúdo Curto - Conteúdo 3',
                    description: 'Conteúdo Curto - Conteúdo 3',
                    type: 'string',
                    short_content: ''
                },
                {
                    title: 'Conteúdo Completo - Conteúdo 3',
                    description: 'Utilize markdown',
                    type: 'string',
                    complete_content: '',
                    widget: {
                        "ui:widget": "textarea"
                    }
                }
            ]
        }
    }
}

export default SEOContentCategories