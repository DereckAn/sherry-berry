/**
 * Tax Calculator
 * Calculates taxes for Mexico (IVA), USA (Sales Tax), and Canada (GST/PST)
 */

import type { Country, ShippingAddress, TaxInfo } from "@/types/checkout";

// Tax rates by country and region
const TAX_RATES: Record<
  Country,
  { base: number; name: string; description: string }
> = {
  MX: {
    base: 0.16, // 16% IVA
    name: "IVA",
    description: "Impuesto al Valor Agregado",
  },
  US: {
    base: 0.08, // 8% default (varies by state)
    name: "Sales Tax",
    description: "State and Local Sales Tax",
  },
  CA: {
    base: 0.05, // 5% GST base (+ provincial taxes)
    name: "GST",
    description: "Goods and Services Tax",
  },
};

// US State-specific tax rates (simplified - in production, use a tax service)
const US_STATE_TAX_RATES: Record<string, number> = {
  AL: 0.04, // Alabama
  AK: 0.0, // Alaska (no state sales tax)
  AZ: 0.056, // Arizona
  AR: 0.065, // Arkansas
  CA: 0.0725, // California
  CO: 0.029, // Colorado
  CT: 0.0635, // Connecticut
  DE: 0.0, // Delaware (no sales tax)
  FL: 0.06, // Florida
  GA: 0.04, // Georgia
  HI: 0.04, // Hawaii
  ID: 0.06, // Idaho
  IL: 0.0625, // Illinois
  IN: 0.07, // Indiana
  IA: 0.06, // Iowa
  KS: 0.065, // Kansas
  KY: 0.06, // Kentucky
  LA: 0.0445, // Louisiana
  ME: 0.055, // Maine
  MD: 0.06, // Maryland
  MA: 0.0625, // Massachusetts
  MI: 0.06, // Michigan
  MN: 0.06875, // Minnesota
  MS: 0.07, // Mississippi
  MO: 0.04225, // Missouri
  MT: 0.0, // Montana (no state sales tax)
  NE: 0.055, // Nebraska
  NV: 0.0685, // Nevada
  NH: 0.0, // New Hampshire (no sales tax)
  NJ: 0.06625, // New Jersey
  NM: 0.05125, // New Mexico
  NY: 0.08, // New York
  NC: 0.0475, // North Carolina
  ND: 0.05, // North Dakota
  OH: 0.0575, // Ohio
  OK: 0.045, // Oklahoma
  OR: 0.0, // Oregon (no sales tax)
  PA: 0.06, // Pennsylvania
  RI: 0.07, // Rhode Island
  SC: 0.06, // South Carolina
  SD: 0.045, // South Dakota
  TN: 0.07, // Tennessee
  TX: 0.0625, // Texas
  UT: 0.0485, // Utah
  VT: 0.06, // Vermont
  VA: 0.053, // Virginia
  WA: 0.065, // Washington
  WV: 0.06, // West Virginia
  WI: 0.05, // Wisconsin
  WY: 0.04, // Wyoming
};

// Canadian Provincial tax rates (GST + PST/HST)
const CA_PROVINCIAL_TAX_RATES: Record<string, { rate: number; name: string }> =
  {
    AB: { rate: 0.05, name: "GST" }, // Alberta (GST only)
    BC: { rate: 0.12, name: "GST + PST" }, // British Columbia (5% GST + 7% PST)
    MB: { rate: 0.12, name: "GST + PST" }, // Manitoba (5% GST + 7% PST)
    NB: { rate: 0.15, name: "HST" }, // New Brunswick (15% HST)
    NL: { rate: 0.15, name: "HST" }, // Newfoundland and Labrador (15% HST)
    NT: { rate: 0.05, name: "GST" }, // Northwest Territories (GST only)
    NS: { rate: 0.15, name: "HST" }, // Nova Scotia (15% HST)
    NU: { rate: 0.05, name: "GST" }, // Nunavut (GST only)
    ON: { rate: 0.13, name: "HST" }, // Ontario (13% HST)
    PE: { rate: 0.15, name: "HST" }, // Prince Edward Island (15% HST)
    QC: { rate: 0.14975, name: "GST + QST" }, // Quebec (5% GST + 9.975% QST)
    SK: { rate: 0.11, name: "GST + PST" }, // Saskatchewan (5% GST + 6% PST)
    YT: { rate: 0.05, name: "GST" }, // Yukon (GST only)
  };

/**
 * Calculates tax for a given address and amount
 */
export async function calculateTax(
  address: ShippingAddress,
  amount: number,
  includeShipping: boolean = true
): Promise<TaxInfo> {
  const country = address.country;

  if (!TAX_RATES[country]) {
    throw new Error(`Tax calculation not supported for ${country}`);
  }

  let taxRate: number;
  let taxName: string;
  let description: string;
  let region: string | undefined;

  switch (country) {
    case "MX":
      taxRate = TAX_RATES.MX.base;
      taxName = TAX_RATES.MX.name;
      description = TAX_RATES.MX.description;
      break;

    case "US":
      const stateCode = address.state.toUpperCase();
      taxRate = US_STATE_TAX_RATES[stateCode] || TAX_RATES.US.base;
      taxName = TAX_RATES.US.name;
      description = `${TAX_RATES.US.description} (${stateCode})`;
      region = stateCode;
      break;

    case "CA":
      const provinceCode = address.state.toUpperCase();
      const provinceTax = CA_PROVINCIAL_TAX_RATES[provinceCode];

      if (provinceTax) {
        taxRate = provinceTax.rate;
        taxName = provinceTax.name;
        description = `${provinceTax.name} (${provinceCode})`;
        region = provinceCode;
      } else {
        // Default to GST only
        taxRate = TAX_RATES.CA.base;
        taxName = TAX_RATES.CA.name;
        description = TAX_RATES.CA.description;
      }
      break;

    default:
      throw new Error(`Unsupported country: ${country}`);
  }

  const taxAmount = amount * taxRate;

  return {
    rate: taxRate,
    amount: taxAmount,
    name: taxName,
    description,
    country,
    region,
  };
}

/**
 * Gets tax rate for a specific country/region without calculating amount
 */
export function getTaxRate(country: Country, state?: string): number {
  switch (country) {
    case "MX":
      return TAX_RATES.MX.base;

    case "US":
      if (state) {
        const stateCode = state.toUpperCase();
        return US_STATE_TAX_RATES[stateCode] || TAX_RATES.US.base;
      }
      return TAX_RATES.US.base;

    case "CA":
      if (state) {
        const provinceCode = state.toUpperCase();
        const provinceTax = CA_PROVINCIAL_TAX_RATES[provinceCode];
        return provinceTax?.rate || TAX_RATES.CA.base;
      }
      return TAX_RATES.CA.base;

    default:
      return 0;
  }
}

/**
 * Formats tax rate as percentage
 */
export function formatTaxRate(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

/**
 * Validates if tax calculation is supported for a country
 */
export function isTaxCalculationSupported(country: string): boolean {
  return country in TAX_RATES;
}

/**
 * Gets tax information without calculating amount (for display purposes)
 */
export function getTaxInfo(
  country: Country,
  state?: string
): {
  rate: number;
  name: string;
  description: string;
} {
  switch (country) {
    case "MX":
      return {
        rate: TAX_RATES.MX.base,
        name: TAX_RATES.MX.name,
        description: TAX_RATES.MX.description,
      };

    case "US":
      const stateCode = state?.toUpperCase();
      const usRate = stateCode
        ? US_STATE_TAX_RATES[stateCode] || TAX_RATES.US.base
        : TAX_RATES.US.base;

      return {
        rate: usRate,
        name: TAX_RATES.US.name,
        description: stateCode
          ? `${TAX_RATES.US.description} (${stateCode})`
          : TAX_RATES.US.description,
      };

    case "CA":
      const provinceCode = state?.toUpperCase();
      const provinceTax = provinceCode
        ? CA_PROVINCIAL_TAX_RATES[provinceCode]
        : null;

      if (provinceTax) {
        return {
          rate: provinceTax.rate,
          name: provinceTax.name,
          description: `${provinceTax.name} (${provinceCode})`,
        };
      }

      return {
        rate: TAX_RATES.CA.base,
        name: TAX_RATES.CA.name,
        description: TAX_RATES.CA.description,
      };

    default:
      return {
        rate: 0,
        name: "No Tax",
        description: "Tax not applicable",
      };
  }
}
