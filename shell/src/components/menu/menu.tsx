import React from "react";
import { AppBar, Button, Stack, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMenuItems } from "../../network/menuItems/getMenuItems";

const Menu = () => {
  const navigate = useNavigate();
  const { data } = useGetMenuItems();

  if (!data) {
    return null;
  }

  return (
    <StyledAppBar position="static">
      <StyledStack direction={"row"}>
        <StyledButton onClick={() => navigate("/")}>HOME</StyledButton>
        {data.map(({ urlPath, id, menuLabel }) => (
          <StyledButton
            key={`menu-position-${id}`}
            onClick={() => navigate(urlPath)}
          >
            {menuLabel}
          </StyledButton>
        ))}
      </StyledStack>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)`
  margin-bottom: 32px;
  padding: 16px;
`;

const StyledStack = styled(Stack)`
  justify-content: center;
`;

const StyledButton = styled(Button)`
  color: #ffffff;
  border-color: #ffffff;
  margin: 0 16px;
  font-weight: bold;
`;

export { Menu };
