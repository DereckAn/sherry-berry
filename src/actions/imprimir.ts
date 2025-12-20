"use server";

import fs from "fs";
import path from "path";

export const Imprimir = async (cartData: any, fileName: string) => {
  const orderSummaryJson = JSON.stringify(
    cartData,
    (_, value) => (typeof value === "bigint" ? value.toString() : value),
    2
  );
  const filePath = path.join("./src/data/", fileName);
  fs.writeFileSync(filePath, orderSummaryJson, "utf-8");
};
