/* eslint-disable max-len */
import { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

import {
  getTheme,
  loadColorMode,
  storeColorMode,
  ColorMode,
} from "@namada/utils";

import { TopNavigation } from "./TopNavigation";
import {
  AppContainer,
  TopSection,
  BottomSection,
  MotionContainer,
  GlobalStyles,
  ContentContainer,
  AppLoader,
} from "./App.components";
import { persistor, store, useAppDispatch, useAppSelector } from "store";
import { Toasts } from "App/Toast";
import { SettingsState } from "slices/settings";
import { chains } from "@namada/chains";
import { useIntegration, useUntilIntegrationAttached } from "@namada/hooks";
import { Outlet } from "react-router-dom";
import { addAccounts, fetchBalances } from "slices/accounts";
import { Account } from "@namada/types";

export const history = createBrowserHistory({ window });

export const AnimatedTransition = (props: {
  children: React.ReactNode;
  elementKey: string;
}): JSX.Element => {
  const { children, elementKey } = props;
  return (
    <MotionContainer
      key={elementKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </MotionContainer>
  );
};

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const initialColorMode = loadColorMode();
  const [colorMode, setColorMode] = useState<ColorMode>(initialColorMode);
  const theme = getTheme(colorMode);

  const toggleColorMode = (): void => {
    setColorMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  const { chainId, connectedChains } = useAppSelector<SettingsState>(
    (state) => state.settings
  );
  const chain = chains[chainId];

  const integration = useIntegration(chainId);

  useEffect(() => storeColorMode(colorMode), [colorMode]);

  const extensionAttachStatus = useUntilIntegrationAttached(chain);
  const currentExtensionAttachStatus =
    extensionAttachStatus[chain.extension.id];

  useEffect(() => {
    const fetchAccounts = async (): Promise<void> => {
      const accounts = await integration?.accounts();
      if (accounts) {
        dispatch(addAccounts(accounts as Account[]));
        dispatch(fetchBalances());
      }
    };
    if (
      currentExtensionAttachStatus === "attached" &&
      connectedChains.includes(chainId)
    ) {
      fetchAccounts();
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
        <Toasts />
        <GlobalStyles colorMode={colorMode} />
        {(currentExtensionAttachStatus === "attached" ||
          currentExtensionAttachStatus === "detached") && (
          <AppContainer data-testid="AppContainer">
            <TopSection>
              <TopNavigation
                colorMode={colorMode}
                toggleColorMode={toggleColorMode}
                setColorMode={setColorMode}
                store={store}
              />
            </TopSection>
            <BottomSection>
              <AnimatePresence exitBeforeEnter>
                <ContentContainer>
                  <Outlet />
                </ContentContainer>
              </AnimatePresence>
            </BottomSection>
          </AppContainer>
        )}
        {currentExtensionAttachStatus === "pending" && <AppLoader />}
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
