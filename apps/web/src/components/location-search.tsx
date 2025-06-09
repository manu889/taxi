"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { GoogleMapsService, Location } from "@/lib/services/google-maps-service";

interface LocationSearchProps {
  name: string;
  label: string;
  placeholder?: string;
  onLocationSelect?: (location: Location) => void;
}

export function LocationSearch({
  name,
  label,
  placeholder = "Search location...",
  onLocationSelect,
}: LocationSearchProps) {
  const { register, setValue } = useFormContext();
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const locations = await GoogleMapsService.getInstance().searchLocations(value);
      setSuggestions(locations);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (location: Location) => {
    setValue(name, location.address);
    setShowSuggestions(false);
    onLocationSelect?.(location);
  };

  return (
    <div className="relative">
      <Input
        {...register(name)}
        ref={inputRef}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        className="w-full"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
        </div>
      )}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((location) => (
            <button
              key={location.placeId}
              type="button"
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              onClick={() => handleSelect(location)}
            >
              {location.address}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 