import { jsx as _jsx } from 'react/jsx-runtime';
import ReactDOM from 'react-dom';
import { createElement } from 'react';

import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

export const App = ({ page, translations, locale }) => {
  const i18nOptions = {
    fallbackLng: 'en',
    lng: locale,
    resources: {
      [locale]: translations,
    },
    interpolation: {
      escapeValue: false // react is already safe from xss
    },
    debug: false,
  }
  i18n.init(i18nOptions);
  return createElement(
    I18nextProvider,
    { i18n },
    createElement(page?.component, page?.props)
  );
};

const hydrate = async () => {
  // Can't use string interpolation here so src/templates is hardcoded
  const templates = import.meta.glob('/src/templates/*.(jsx|tsx)');
  const routes = Object.keys(templates).map((path) => {
    return {
      // get the filename from the path and remove its extension, default to index
      name: path.split('/').pop()?.split('.')[0] || 'index',
      path: path,
      getComponent: templates[path],
    };
  });
  /**
   * Get the templateFilename from the template. See {@link ./ssr/serverRenderRoute.ts}.
   */
  const templateFilename = window._RSS_TEMPLATE_?.split('.')[0];

  const { default: component } = (await routes.find((route) => route.name === templateFilename)?.getComponent()) || {};
  ReactDOM.hydrate(
    _jsx(App, {
      page: {
        props: window._RSS_PROPS_,
        path: window.location.pathname,
        component: component,
      },
      translations: window._RSS_I18N_,
      locale: window._RSS_LOCALE_,
    }),
    document.getElementById('root'),
  );
};
//@ts-ignore
if (!import.meta.env.SSR) hydrate();
