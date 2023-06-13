import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import { App } from "./App";
import { ThemeProvider } from "./theme";
import reducer from "./redux/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as any).render(
  <StyledEngineProvider injectFirst>
    <Provider store={reducer.store}>
      <PersistGate loading={null} persistor={reducer.persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StyledEngineProvider>
);
