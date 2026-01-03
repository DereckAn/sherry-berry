import { SquareClient, SquareEnvironment } from "square";

if (!process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error("SQUARE_ACCESS_TOKEN is not defined");
}

if (!process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT) {
  throw new Error("NEXT_PUBLIC_SQUARE_ENVIRONMENT is not defined");
}

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export default squareClient;
