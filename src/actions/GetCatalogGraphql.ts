"use server";

import { GraphQLClient } from "graphql-request";
import { Imprimir } from "./imprimir";

// Interfaces para la respuesta de GraphQL
interface SquareCatalogGraphQLResponse {
  catalog: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    nodes: SquareCatalogNode[];
  };
}

// La consulta GraphQL actualizada
const catalogQuery = `
query CatalogQuery($merchantId: ID!) {
  catalog (
    filter: { 
      merchantId: { 
        equalToAnyOf: [$merchantId] 
      }
      type:{
        equalToAnyOf:[ITEM]
      }
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename
      id
      ... on CatalogItem {
        name
        productType
        category {
          id
          name
          parentCategory {
            category {
              id
              name
            }
          }
        }
        descriptionHtml
        foodAndBeverageDetails {
          calorieCount
          dietaryPreferences {
            type
            standardName
            customName
          }
          ingredients {
            type
            standardName
            customName
          }
        }
        images {
          id
          url
        }
        options {
          id
          name
          values {
            id
            name
          }
        }
        modifierListInfos {
          minSelectedModifiers
          maxSelectedModifiers
           modifierList{
            id
            name
          }
          modifierOverrides {
            onByDefault
            modifier {
              id
              name
              priceMoney {
                currency
                amount
              }	
            }
          }         
        }
        taxes {
          id
          name
          percentage
        }
        variations {
          id
          name
          priceMoney {
            amount
          }
        }
      }
    }
  }
}
`;

export const getCatalogGraphQL =
  async (): Promise<SquareCatalogGraphQLResponse> => {
    try {
      // Verificar que existe el token de acceso y el ID del comerciante
      if (!process.env.SQUARE_ACCESS_TOKEN) {
        throw new Error("SQUARE_ACCESS_TOKEN is not defined");
      }

      if (!process.env.SQUARE_MERCHANT_ID) {
        throw new Error("SQUARE_MERCHANT_ID is not defined");
      }

      // Crear el cliente GraphQL
      const endpoint = "https://connect.squareup.com/public/graphql";
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      // Variables para la consulta
      const variables = {
        merchantId: process.env.SQUARE_MERCHANT_ID,
      };

      // Ejecutar la consulta
      const data = await graphQLClient.request<SquareCatalogGraphQLResponse>(
        catalogQuery,
        variables
      );

      // note: La funcion imprimir puede que lleve a un bluque infinito de renderizado
        Imprimir(data, "catalog_graphql.json");

      return data;
    } catch (error) {
      console.error("Error fetching catalog with GraphQL:", error);
      throw error;
    }
  };
