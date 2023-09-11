import React, { useEffect, useState } from "react";
import { useApolloClient } from "react-apollo";
import SearchDocumentsQuery from "../../graphql/queries/searchDocuments.gql";
import { getPureDataFromMasterData } from "../../helpers";
import { useRuntime } from 'vtex.render-runtime'
import style from "./style.css";

function BrandsPage() {
  const client = useApolloClient();
  const [brands, setBrands] = useState<any[]>([]);
  const [initialLetters, setInitialLetters] = useState<any[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  const { query } = useRuntime()

  function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  const getBrands = async () => {
    const { data } = await client.query({
      query: SearchDocumentsQuery,
      variables: {
        acronym: "PM",
        fields: "display_name,name_link,show_menu,spotlight",
        pageSize: 100,
      },
    });

    const orderedBrands = getPureDataFromMasterData(data?.documents).sort(
      (a, b) => (a?.display_name < b?.display_name ? -1 : 1)
    );

    const activeBrands = orderedBrands?.filter(
      (item) => item?.spotlight === "true"
    );

    setBrands(activeBrands);
  };

  const getBrandsByInitialLetter = (letter: string) =>
    brands.filter((brand) =>
      brand.display_name.toLowerCase().startsWith(letter?.toLowerCase())
    );

  useEffect(() => {
    getBrands()
      .then(() => {
        if(query.brand && isLetter(query.brand)) {
          setSelectedLetter(query.brand.toUpperCase())
        }
      })
  }, []);

  useEffect(() => {
    if(query.brand && isLetter(query.brand)) setSelectedLetter(query.brand.toUpperCase())
  }, [query.brand])

  useEffect(() => {
    const initials = [
      ...new Set(
        brands.map((brand) => brand?.display_name?.charAt(0).toUpperCase())
      ),
    ];

    setInitialLetters(initials);
  }, [brands]);

  return (
    <div className="flex flex-column">
      <div className={style.brand_list_all_filter}>
        {initialLetters.map((initial) => (
          <div
            onClick={() => {
              if (selectedLetter === initial) {
                setSelectedLetter("");
              } else {
                setSelectedLetter(initial);
              }
            }}
            className={`${style.brand_filter_item} ${
              selectedLetter === initial ? style.brand_filter_item_active : ""
            }`}
          >
            {initial}
          </div>
        ))}
      </div>
      <div className={style.base_brands}>
        {selectedLetter ? (
          <div className={style.brand_list_item_filtered}>
            <p className={style.brand_destaque_letter}>{selectedLetter}</p>
            <ul className={style.brand_destaque_list}>
              {getBrandsByInitialLetter(selectedLetter).map((brand) => (
                <li className={style.brand_destaque_list_item}>
                  <a href={`/${brand.name_link}`}>
                    <div className={style.brand_destaque_list_item_content}>
                      <p className={style.brand_name}>{brand.display_name}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          initialLetters.map((initial) => (
            <div className={style.brand_list_item_filtered}>
              <p className={style.brand_destaque_letter}>{initial}</p>
              <ul className={style.brand_destaque_list}>
                {getBrandsByInitialLetter(initial).map((brand) => (
                  <li className={style.brand_destaque_list_item}>
                    <a href={`/${brand.name_link}`}>
                      <div className={style.brand_destaque_list_item_content}>
                        <p className={style.brand_name}>{brand.display_name}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BrandsPage;
