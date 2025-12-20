"use server";

import squareClient from "@/lib/SquareClient";
import { Imprimir } from "./imprimir";

export const getCatalog = async () => {
  const result = await squareClient.catalog.list({
    cursor: "",
    types: "",
  });

//   console.log(result);

  Imprimir(result, "catalog.json");

  // return result;
};
