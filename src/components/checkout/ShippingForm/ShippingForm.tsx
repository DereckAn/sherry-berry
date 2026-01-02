"use client";

import { Button } from "@/components/ui/Button";
import { calculateShippingRates } from "@/lib/shipping/calculator";
import {
  COUNTRY_NAMES,
  SUPPORTED_COUNTRIES,
  ShippingAddressSchema,
  type ShippingAddress,
  type ShippingRate,
} from "@/types/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Loader2, Truck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ShippingFormProps {
  onShippingUpdate: (address: ShippingAddress, rate: ShippingRate) => void;
  initialAddress?: Partial<ShippingAddress>;
  className?: string;
}

export function ShippingForm({
  onShippingUpdate,
  initialAddress,
  className = "",
}: ShippingFormProps) {
  const [availableRates, setAvailableRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);
  const [isCalculatingRates, setIsCalculatingRates] = useState(false);
  const [ratesError, setRatesError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: initialAddress,
    mode: "onChange",
  });

  const watchedCountry = watch("country");

  // Calculate shipping rates when address is valid
  const handleAddressComplete = async (address: ShippingAddress) => {
    setIsCalculatingRates(true);
    setRatesError(null);

    try {
      const rates = await calculateShippingRates(address);
      setAvailableRates(rates);

      // Auto-select standard shipping by default
      const standardRate = rates.find((rate) => rate.method === "standard");
      if (standardRate) {
        setSelectedRate(standardRate);
        onShippingUpdate(address, standardRate);
      }
    } catch (error) {
      setRatesError(
        error instanceof Error
          ? error.message
          : "Failed to calculate shipping rates"
      );
      setAvailableRates([]);
      setSelectedRate(null);
    } finally {
      setIsCalculatingRates(false);
    }
  };

  const handleRateSelection = (rate: ShippingRate) => {
    setSelectedRate(rate);
    const currentAddress = watch();
    if (isValid) {
      onShippingUpdate(currentAddress, rate);
    }
  };

  const onSubmit = (data: ShippingAddress) => {
    handleAddressComplete(data);
  };

  return (
    <div
      className={`bg-white/70 rounded-lg border border-gray-200 p-6 ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Shipping Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Enter your shipping address to calculate rates
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name *
            </label>
            <input
              {...register("firstName")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name *
            </label>
            <input
              {...register("lastName")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Address Information */}
        <div>
          <label
            htmlFor="address1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 1 *
          </label>
          <input
            {...register("address1")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="123 Main Street"
          />
          {errors.address1 && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address1.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 2 (Optional)
          </label>
          <input
            {...register("address2")}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Apartment, suite, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City *
            </label>
            <input
              {...register("city")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="New York"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State/Province *
            </label>
            <input
              {...register("state")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="NY"
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Postal Code *
            </label>
            <input
              {...register("postalCode")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="10001"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country *
          </label>
          <select
            {...register("country")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Select a country</option>
            {SUPPORTED_COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {COUNTRY_NAMES[country]}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Calculate Rates Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={!isValid || isCalculatingRates}
            className="w-full"
          >
            {isCalculatingRates ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Calculating Rates...
              </>
            ) : (
              <>
                <Truck className="w-4 h-4 mr-2" />
                Calculate Shipping Rates
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Shipping Rates Selection */}
      {availableRates.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-900 mb-4">
            Choose Shipping Method
          </h3>
          <div className="space-y-3">
            {availableRates.map((rate) => (
              <ShippingRateOption
                key={rate.method}
                rate={rate}
                isSelected={selectedRate?.method === rate.method}
                onSelect={() => handleRateSelection(rate)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {ratesError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{ratesError}</p>
        </div>
      )}
    </div>
  );
}

interface ShippingRateOptionProps {
  rate: ShippingRate;
  isSelected: boolean;
  onSelect: () => void;
}

function ShippingRateOption({
  rate,
  isSelected,
  onSelect,
}: ShippingRateOptionProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        isSelected
          ? "border-pink-500 bg-pink-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            checked={isSelected}
            onChange={onSelect}
            className="text-pink-500 focus:ring-pink-500"
          />
          <div>
            <div className="flex items-center space-x-2">
              {rate.method === "express" ? (
                <Clock className="w-4 h-4 text-orange-500" />
              ) : (
                <Truck className="w-4 h-4 text-blue-500" />
              )}
              <span className="font-medium text-gray-900">{rate.name}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{rate.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Estimated delivery: {rate.estimatedDays}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-semibold text-gray-900">
            {formatPrice(rate.price, rate.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
