import { Typography } from "@mui/material";
import { PropsWithChildren, useMemo } from "react";

import { useGetMenuItems } from "../../network/menuItems/getMenuItems";
import { MenuItem } from "../../types/menu.interfaces";
import { RemotesContext } from "./microfrontends-setup.context";
import { Loader } from "../../components/loader/loader";

const RemotesProvider = ({ children }: PropsWithChildren) => {
  const { isLoading, isError, data } = useGetMenuItems();

  const routes: MenuItem[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  const value = {
    data,
    routes,
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Typography component="h1" fontWeight="bold" variant="h2">
        Some error occurred
      </Typography>
    );
  }

  return (
    <RemotesContext.Provider value={value}>{children}</RemotesContext.Provider>
  );
};

export { RemotesProvider };
