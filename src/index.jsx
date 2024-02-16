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

// const queryClient = new QueryClient();

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

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <StyledEngineProvider injectFirst>
//         <App />
//       </StyledEngineProvider>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root"),
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
