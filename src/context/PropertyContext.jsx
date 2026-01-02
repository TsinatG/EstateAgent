import React, { createContext, useState, useContext, useEffect } from 'react';
import propertyData from '../data/properties.json';

const PropertyContext = createContext(undefined);

export const PropertyProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => []);
  const initialProperties = propertyData.properties;
  const [searchResults, setSearchResults] = useState(initialProperties);
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 2000000,
    minBedrooms: 0,
    maxBedrooms: 10,
    dateAddedAfter: '',
    postcodeArea: ''
  });

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const performSearch = () => {
    const filtered = initialProperties.filter(prop => {
      // Type Check
      if (searchCriteria.type !== 'any' && prop.type.toLowerCase() !== searchCriteria.type.toLowerCase()) {
        return false;
      }
      
      // Price Check
      if (prop.price < searchCriteria.minPrice || prop.price > searchCriteria.maxPrice) {
        return false;
      }

      // Bedroom Check (JSON uses 'bedrooms')
      if (prop.bedrooms < searchCriteria.minBedrooms || prop.bedrooms > searchCriteria.maxBedrooms) {
        return false;
      }

      // Postcode Check
      if (searchCriteria.postcodeArea) {
        // Extract postcode from location string "Street, Area, Postcode"
        const locationParts = prop.location.split(', ');
        const postcode = locationParts[locationParts.length - 1]; // "Orpington BR5" or just "BR5" if specific
  
        const normalizedSearch = searchCriteria.postcodeArea.trim().toLowerCase();
        const normalizedLocation = prop.location.toLowerCase();
        
        if (!normalizedLocation.includes(normalizedSearch)) {
           return false;
        }
      }

      // Date Check
      if (searchCriteria.dateAddedAfter) {
        // Construct date from JSON object { month: "October", day: 12, year: 2022 }
        const propDateStr = `${prop.added.month} ${prop.added.day}, ${prop.added.year}`;
        const propDate = new Date(propDateStr);
        const searchDate = new Date(searchCriteria.dateAddedAfter);
        
        // Checking if property date is valid and AFTER the search date
        if (!isNaN(propDate) && !isNaN(searchDate)) {
             if (propDate < searchDate) return false;
        }
      }

      return true;
    });
    setSearchResults(filtered);
  };

  return (
    <PropertyContext.Provider value={{
      properties: initialProperties,
      searchResults,
      favorites,
      searchCriteria,
      setSearchCriteria,
      performSearch,
      addToFavorites,
      removeFromFavorites,
      clearFavorites
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

