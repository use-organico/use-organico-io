import React, { useEffect, useState } from "react";
import { useApolloClient } from "react-apollo";
import SearchDocumentsQuery from "../../graphql/queries/searchDocuments.gql";
import { getPureDataFromMasterData } from "../../helpers";
import style from "./styles.css";

function BrandsPageComponent() {
  const client = useApolloClient();
  const [brands, setBrands] = useState<any[]>([]);
  const [initialLetters, setInitialLetters] = useState<any[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  const getBrands = async () => {
    const { data } = await client.query({
      query: SearchDocumentsQuery,
      variables: {
        acronym: "PM",
        fields: "display_name,name_link,show_menu,spotlight",
        pageSize: 150,
      },
    });

    const orderedBrands = getPureDataFromMasterData(data?.documents).sort(
      (a, b) => (a?.display_name < b?.display_name ? -1 : 1)
    );

    const activeBrands = orderedBrands?.filter(
      (item) => item?.show_menu === "true"
    );

    setBrands(activeBrands);
  };

  const getBrandsByInitialLetter = (letter: string) =>
    brands.filter((brand) =>
      brand.display_name.toLowerCase().startsWith(letter?.toLowerCase())
    );

  useEffect(() => {
    getBrands();
  }, []);

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
      <div className={style.brands_menu_list}>
        <h3 className={style.brands_menu_list_title}>Demais marcas</h3>
        <input
          type="text"
          placeholder="Qual marca você procura?"
          value={selectedLetter}
          className={style.search_brand_menu_list}
          onChange={(e) => setSelectedLetter(e.target.value)}
        ></input>
      </div>
      <div className={style.base_brands_menu}>
        {selectedLetter ? (
          <div className={style.brands_menu_list_filtered}>
            <p className={style.brands_menu_destaque_letter}>
              {selectedLetter}
            </p>
            <ul className={style.brands_menu_destaque_list}>
              {getBrandsByInitialLetter(selectedLetter).map((brand) => (
                <li className={style.brands_menu_destaque_list_item}>
                  <a href={`/${brand.name_link}`}>{brand.display_name}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          initialLetters.map((initial) => (
            <div className={style.brands_menu_list_filtered}>
              <p className={style.brands_menu_destaque_letter}>{initial}</p>
              <ul className={style.brands_menu_destaque_list}>
                {getBrandsByInitialLetter(initial).map((brand) => (
                  <li className={style.brands_menu_destaque_list_item}>
                    <a href={`/${brand.name_link}`}>{brand.display_name}</a>
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

export default BrandsPageComponent;
