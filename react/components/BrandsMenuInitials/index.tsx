import React, { useEffect, useState } from "react";
import { useApolloClient } from "react-apollo";
import SearchDocumentsQuery from "../../graphql/queries/searchDocuments.gql";
import { getPureDataFromMasterData } from "../../helpers";
import { useRuntime } from 'vtex.render-runtime'
import style from "./styles.css";

function BrandsMenuInitials() {
  const client = useApolloClient();
  const [brands, setBrands] = useState<any[]>([]);
  const [initialLetters, setInitialLetters] = useState<any[]>([]);

  const { navigate } = useRuntime()

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

  const clickHandler = (letter: string) => {
    navigate({
      to: `marcas?brand=${letter}`
    })
  }

  return (
    <div className={style.initialsList}>
      {
        initialLetters.map((initial) => (
          <button className={style.button} onClick={() => clickHandler(initial)}>{initial}</button>
        ))
      }
    </div>
  );
}

export default BrandsMenuInitials;
