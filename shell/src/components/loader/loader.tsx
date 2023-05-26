import React from "react";
import { CircularProgress, styled } from "@mui/material";

interface LoaderProps {
  isLoading?: boolean;
}

const Loader = ({ isLoading = true }: LoaderProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <SpinnerContainer>
      <CircularProgress />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export { Loader };
