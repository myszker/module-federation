import React from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ProductInterface } from "../network/useGetProducts";

interface Settings {
  displayStock?: boolean;
  minCostValue?: number;
  sortBy?: "none" | "label" | "price" | "stock";
}

interface ProductsProps {
  settings: Settings;
  products?: ProductInterface[];
}

const Products = ({ settings, products }: ProductsProps) => {
  const { minCostValue, sortBy, displayStock } = settings || {};

  let dataToDisplay: ProductInterface[];

  if (minCostValue) {
    dataToDisplay = (products || []).filter(
      ({ price }) => price >= minCostValue!
    );
  } else {
    dataToDisplay = (products || []).slice();
  }

  if (sortBy && sortBy === "price") {
    dataToDisplay.sort((a, b) => b.price - a.price);
  }

  if (sortBy && sortBy === "stock" && displayStock) {
    dataToDisplay.sort((a, b) => b.stock - a.stock);
  }

  if (sortBy && sortBy === "label") {
    dataToDisplay.sort((a, b) => a.label.localeCompare(b.label));
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            {displayStock && <StyledTableCell>Stock</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToDisplay.map(({ label, id, price, stock }, index) => (
            <TableRow key={`item-${id}`}>
              <TableCell>{index}</TableCell>
              <TableCell>{label}</TableCell>
              <TableCell>{price}</TableCell>
              {displayStock && <TableCell>{stock}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;
export { Products, Settings };
