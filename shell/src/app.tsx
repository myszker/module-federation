import React from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";

import { Menu } from "./components/menu/menu";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppAuth } from "./auth/auth.provider";
import { Routing } from "./components/routing/routing";
import { RemotesProvider } from "./providers/microfrontends-setup/microfrontends-setup.provider";

const queryClient = new QueryClient();

const theme = createTheme();

const customStyles = (
  <GlobalStyles styles={{ body: { backgroundColor: "#eeeeee" } }} />
);

const App = () => {
  return (
    <Auth0Provider
      domain="dev-wurzgiw47oqv1q2n.eu.auth0.com"
      clientId="TwblXft4Vo5dMNriqwETMo6khuLgEa4Q"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-wurzgiw47oqv1q2n.eu.auth0.com/api/v2/",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {customStyles}
            <AppAuth>
              <RemotesProvider>
                <Menu />
                <Container fixed>
                  <Routing />
                </Container>
              </RemotesProvider>
            </AppAuth>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export { App };
