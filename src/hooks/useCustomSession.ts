
import { useCustomSessionContext } from "./CustomSessionProvider";

export const useCustomSession = () => {
  return useCustomSessionContext();
};

// Re-export CustomSessionProvider from the correct location
export { CustomSessionProvider } from "./CustomSessionProvider";
