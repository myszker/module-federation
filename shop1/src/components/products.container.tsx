import React, { useEffect, useState } from "react";
import { Products, Settings } from "./products";

import { pubsub } from "@mfe/pubsub";
import { useGetProducts } from "../network/useGetProducts";

const ProductsContainer = () => {
  const [settings, setSettings] = useState<Settings>({} as Settings);

  const { data: products } = useGetProducts();

  useEffect(() => {
    // Pubsub działa jak BehaviorSubject - po zasubskrybowaniu dostajemy aktualną
    // wartość. Dzięki temu możemy się zsynchronizować z aktualnym stanem ustawień.
    return pubsub.subscribe((event) => {
      if (event.type === "settingsChange") {
        setSettings(event.message);
      }
    });
  }, []);

  if (!settings) {
    return <>Loading...</>;
  }

  return <Products settings={settings} products={products} />;
};

export { ProductsContainer };
