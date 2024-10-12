import { createContext, useContext } from "react";

const FormIdContext = createContext<string | null>(null);

export const FormIdContextProvider = FormIdContext.Provider;

export const useFormIdContext = () => useContext(FormIdContext);
