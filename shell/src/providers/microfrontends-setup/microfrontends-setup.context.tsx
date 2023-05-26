import { createContext, useContext } from "react";
import { MenuItem } from "../../types/menu.interfaces";

type MicrofrontendsSetupResponse = {
  data?: MenuItem[];
};

const RemotesContext = createContext<MicrofrontendsSetupResponse>(
  {} as MicrofrontendsSetupResponse
);

const useMicrofrontendsSetup = (): MicrofrontendsSetupResponse =>
  useContext(RemotesContext);

export { RemotesContext, useMicrofrontendsSetup, MicrofrontendsSetupResponse };
