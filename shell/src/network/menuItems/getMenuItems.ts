import { useQuery } from "react-query";
import { useAppAuth } from "../../auth/auth.context";
import { MenuItem } from "../../types/menu.interfaces";

const useGetMenuItems = () => {
  const { token } = useAppAuth();
  const getSetup = async () => {
    const res = await fetch("http://localhost:5000/shell/setup", {
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    return res.json();
  };

  return useQuery(["menuItems"], (): Promise<MenuItem[]> => getSetup(), {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
export { useGetMenuItems };
