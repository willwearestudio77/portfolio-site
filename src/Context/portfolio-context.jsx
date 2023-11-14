import React, { createContext, useState, useCallback, useEffect } from "react";
import {
    useQuery,
  } from '@tanstack/react-query'
  
  
  const ENDPOINT = 'https://api-eu-west-2.hygraph.com/v2/clod99tovs2fn01uhdz015c3y/master'
  
  const getAllCars = `
  query AllCars {
    cars {
      id
      name
      bhp
      avatar
    }
  }
  `

  export const PortfolioContext = createContext({
    items: '',
    isLoading: true,
    error: null,
  });
  
  export const PortfolioProvider = ({ children }) => {
    const [items, setItems] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const { isLoading: queryLoading, error: queryError, data } = useQuery({
      queryKey: 'cars',
      queryFn: async () => {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: getAllCars,
          }),
        });
  
        if (!res.ok) throw new Error('Failed to fetch');
  
        return await res.json();
      },
    });
  
    // Update state based on the query result
    setItems(data);
    setLoading(queryLoading);
    setError(queryError);
  
    return (
      <PortfolioContext.Provider value={{ items, isLoading, error }}>
        {children}
      </PortfolioContext.Provider>
    );
  };