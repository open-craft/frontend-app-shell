import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';

import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';

import App from './App.tsx'
import './index.scss'

const messages = {};  // TODO: each MFE needs to load its messages separately.

subscribe(APP_READY, () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProvider store={undefined} wrapWithRouter={false}>
        <Header />
        <main id="main">
            <App />
        </main>
        <Footer />
      </AppProvider>
    </React.StrictMode>
  );
});

subscribe(APP_INIT_ERROR, (error: unknown) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorPage message={error && typeof error === "object" && 'message' in error ? error.message : error} />
  );
});

initialize({
  messages,
  hydrateAuthenticatedUser: true,
});
