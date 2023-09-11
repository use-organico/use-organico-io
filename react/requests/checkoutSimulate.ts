import { useEffect, useState } from "react";

const checkoutSimulate = (idItems: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [simulation, setSimulation] = useState<any>({});

  const url = "/api/checkout/pub/orderForms/simulation";

  const body = {
    items: idItems.map((id: number) => {
      return {
        id,
        quantity: 1,
        seller: 1,
      };
    }),
  };

  const options = {
    method: "POST",
    body: JSON.stringify(body),
  };

  const fetchData = () => {
    fetch(url, options)
      .then((data: any) => data.json())
      .then((data: any) => setSimulation(data))
      .catch((_e) => console.log(_e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    simulation,
  };
};

export default checkoutSimulate;
