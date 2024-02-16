import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  PersistQueryClientProvider,
  persistQueryClient,
} from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
      // refetchOnWindowFocus: false,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: persister,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </PersistQueryClientProvider>
  </React.StrictMode>,
);
