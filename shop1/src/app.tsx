import React from "react";
import {
  Card,
  CardContent,
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ProductsContainer } from "./components/products.container";
import { AppAuth } from "./auth/auth.provider";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme();
const customStyles = (
  <GlobalStyles styles={{ body: { backgroundColor: "#eeeeee" } }} />
);

const queryClient = new QueryClient();

const App = () => {
  return (
    <Auth0Provider
      domain="dev-wurzgiw47oqv1q2n.eu.auth0.com"
      clientId="72mmH92m0UJ5VcsTi4uTtme3mr3JpQH0"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-wurzgiw47oqv1q2n.eu.auth0.com/api/v2/",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AppAuth>
            <CssBaseline />
            {customStyles}
            <Card>
              <CardContent>
                <Typography variant="h5">Shop #1</Typography>
                <ProductsContainer />
              </CardContent>
            </Card>
          </AppAuth>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
