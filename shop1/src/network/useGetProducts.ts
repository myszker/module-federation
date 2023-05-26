import { useQuery } from "react-query";
import { useAppAuth } from "../auth/auth.context";

interface ProductInterface {
  id: string;
  label: string;
  stock: number;
  price: number;
}

const useGetProducts = () => {
  const { token } = useAppAuth();
  const getSetup = async () => {
    const res = await fetch("http://localhost:5001/downstream/products", {
      headers: { Authorization: `Bearer ${token || ""}` },
    });
    return res.json();
  };

  return useQuery(["products"], (): Promise<ProductInterface[]> => getSetup(), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export { useGetProducts, ProductInterface };
