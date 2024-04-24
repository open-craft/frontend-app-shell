/* eslint-disable @typescript-eslint/no-explicit-any */
// Declare some very minimal types for @edx packages that don't have types
declare module '@edx/frontend-platform' {
  const APP_INIT_ERROR: string;
  const APP_READY: string;
  const initialize: function;
  const mergeConfig: function;
  const subscribe: (type: string, callback: function) => string;
  const getConfig: () => Record<string, any>;
}

declare module '@edx/frontend-platform/react' {
  const AppProvider: React.FC<any>;
  const AppContext: React.Context<any>;
  const ErrorPage: React.FC<any>;
  const ErrorBoundary: React.FC<any>;
  const PageWrap: React.FC<any>;
}

declare module '@edx/frontend-platform/i18n' {
    export {
        useIntl,
        injectIntl,
        intlShape,
        defineMessages,
        IntlProvider,
    } from 'react-intl';
}

declare module '@edx/frontend-component-header' {
    const Header: React.FC<any>;
    export default Header;
}


declare module '@edx/frontend-component-footer' {
    const Footer: React.FC<any>;
    export default Footer;
}

