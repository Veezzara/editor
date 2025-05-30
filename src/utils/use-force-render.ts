import { useCallback, useState } from "react";

export const useForceRender = () => {
  const [, setState] = useState(true);
  const forceRender = useCallback(() => setState((state) => !state), []);

  return forceRender;
};
