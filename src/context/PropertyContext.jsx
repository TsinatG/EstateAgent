import React, { createContext, useContext } from 'react';
import { properties as initialProperties } from '../data/properties';

const PropertyContext = createContext(undefined);

export const PropertyProvider = ({ children }) => {

  return (
    <PropertyContext.Provider value={{
      properties: initialProperties,
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
