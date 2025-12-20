interface SquareCatalogNode {
  __typename: string;
  id: string;
  category?: {
    id: string;
    name?: string;
    parentCategory?: {
      category: {
        id: string;
        name: string;
      };
    };
  };
  descriptionHtml?: string;
  foodAndBeverageDetails?: {
    calorieCount?: number;
    dietaryPreferences?: {
      type: string;
      standardName: string;
      customName?: string;
    }[];
    ingredients?: {
      type: string;
      standardName: string;
      customName?: string;
    }[];
  };
  images?: { id: string; url: string }[];
  options?: {
    id: string;
    name: string;
    values?: {
      id: string;
      name: string;
    }[];
  }[];
  modifierListInfos?: {
    minSelectedModifiers?: number;
    maxSelectedModifiers?: number;
    modifierList: {
      id?: string;
      name?: string;
    };
    modifierOverrides?: {
      onByDefault?: boolean;
      modifier?: {
        id?: string;
        name?: string;
        priceMoney?: {
          currency?: string;
          amount?: number;
        };
      };
    }[];
  }[];
  name?: string;
  productType?: string;
  taxes?: {
    id: string;
    name: string;
    percentage?: string;
  }[];
  variations?: {
    id: string;
    name: string;
    priceMoney?: {
      amount: number;
    };
  }[];
}
