import React, { useEffect, useState } from "react";

import style from "./styles.css";

const links = [
  { href: "o-que-e", title: "O que ele é?" },
  { href: "o-que-tem", title: "O que ele tem?" },
  { href: "pq-usar", title: "Por que usar?" },
  { href: "como-usar", title: "Como usar?" },
];

const MenuProductInformation = () => {
  const [active, setActive] = useState("");
  const [activeHighlight, setActiveHighlight] = useState(links[0].href);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setActiveHighlight(
        links.find(({ href }) => {
          const distance =
            (document.getElementById(href)?.offsetTop || 0) - window.scrollY;

          return distance > 50 && distance < 200;
        })?.href || activeHighlight
      );
    });
  }, [activeHighlight]);

  useEffect(() => {
    const { offsetTop } = document.getElementById(active) || {};

    if (active && offsetTop) {
      setTimeout(() => {
        window.scroll({
          behavior: "smooth",
          top: offsetTop - 140,
        });
      }, 0);
    }
  }, [active]);

  return (
    <div className={style.MenuProductInformation_container}>
      {links.map(({ href, title }) => (
        <a
          href={`#${href}`}
          className={activeHighlight === href ? style.bg_green : style.bg_none}
          onClick={() => setActive(href)}
        >
          {title}
        </a>
      ))}
    </div>
  );
};

export default MenuProductInformation;
