import { createContext, useEffect, useState } from "react";
import { getPerfumes } from "../api/products";

export const PerfumeContext = createContext([]);

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getPerfumes();
      setPerfumes(data);
    }
    load();
  }, []);

  return (
    <PerfumeContext.Provider value={{ perfumes }}>
      {children}
    </PerfumeContext.Provider>
  );
};
