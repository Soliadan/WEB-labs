import React, { createContext, useState } from "react";
import { perfumes as initialPerfumes } from "./perfumes";

export const PerfumeContext = createContext();

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState(initialPerfumes);

  const value = { perfumes, setPerfumes };

  return (
    <PerfumeContext.Provider value={value}>
      {children}
    </PerfumeContext.Provider>
  );
};
