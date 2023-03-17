import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "./routes/routeList";
import NavBar from "./components/NavBar";
import ErrorFallback from "./components/fallbacks/ErrorFallback";
import Loading from "./components/fallbacks/Loading";

import { fetcher } from "./utils/fetcher";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig
          value={{
            fetcher,
            suspense: true,
            revalidateOnFocus: false,
            revalidateIfStale: false,
          }}
        >
          <BrowserRouter>
            <NavBar />
            <ErrorBoundary
              FallbackComponent={() => (
                <ErrorFallback text="Oops! Looks like such page does not exist..." />
              )}
            >
              <Suspense fallback={<Loading />}>
                <AppRoutes />
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;
