"use client";

import { getCatalog } from "@/actions/GetCatalog";
import { getCatalogGraphQL } from "@/actions/GetCatalogGraphql";

const CheckoutPage = () => {
  const getItems = async () => {
    const items = await getCatalog();
    // const graph = await getCatalogGraphQL();
  };

  return (
    <section className="flex items-center justify-center flex-col h-screen">
      <h1>Checkout Page</h1>
      <button className="border cursor-pointer" onClick={getItems}>
        Mostrar catalogo de cosas.
      </button>
    </section>
  );
};

export default CheckoutPage;
