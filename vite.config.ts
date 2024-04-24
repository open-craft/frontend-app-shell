import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import fs from 'fs';

// Load the environment variables that we need in the index.html file
// Vite supports this natively but only if they start with a special prefix to
// indicate they are safe to include in the bundle; Open edX MFEs assume all env
// variables are public and safe to bundle, so they don't have a prefix.
const htmlTagsPlugin = (env: Record<string, string>): Plugin => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      html = html.replace(/__SITE_NAME__/g, env.SITE_NAME);
      html = html.replace(/__FAVICON_URL__/g, env.FAVICON_URL);
      return html;
    },
  }
}

/** 
 * Custom Vite plugin that allows each MFE to use the "@/" alias to refer to its
 * own root folder.
 */
const mfeRootAliasPlugin = (): Plugin => {
  return {
      name: 'mfe-root-alias', // name of the plugin
      resolveId(source, importer) {
          if (source.startsWith('@/')) {
              if (importer) {
                  // Check which MFE we're currently "in":
                  const match = /frontend-app-shell\/frontend-app-([^/]+)\/src\//.exec(importer);
                  if (match) {
                      const resolvedPath = path.resolve(__dirname, `./frontend-app-${match[1]}/src/${source.substring(2)}`);
                      for (const ext of ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx']) {
                        if (fs.existsSync(resolvedPath + ext) && fs.statSync(resolvedPath + ext).isFile()) {
                          // console.log(`✅ Aliased import ${source} in ${importer} became ${resolvedPath + ext}`);
                          return resolvedPath + ext;
                        }
                      }
                      console.log(`🛑 Aliased import ${source} in ${importer} became ${resolvedPath} but could not be resolved.`);
                  }
              }
          }
          return null; // Other paths are handled as usual
      }
  };
}

// Define our Vite configuration (https://vitejs.dev/config/)
export default defineConfig(({ mode }) => {
  const define: Record<string, string> = {
    'global': 'globalThis',  // TODO: fix @edx/frontend-platform/i18n/lib.js which uses 'global' instead of 'globalThis'
  };

  // Make *all* environment variables available as process.env.X rather than just import.meta.env.X
  // Note that normally Vite only exposes prefixed variables (VITE_) but we assume all env vars are safe to send
  // unmodified to the browser. Our MFEs don't really include any server-only code.
  const env = loadEnv(mode, __dirname, '');
  for (const [varName, value] of Object.entries(env)) {
    define[`process.env.${varName}`] = JSON.stringify(value);
  }

  return {
    server: {
      port: Number(env.PORT),
    },
    plugins: [react(), htmlTagsPlugin(env), mfeRootAliasPlugin()],
    resolve: {
      dedupe: [
        "@edx/frontend-platform",
        "@edx/frontend-component-footer",
        "@edx/frontend-component-header",
        "@openedx/frontend-plugin-framework",
        "@openedx/paragon",
        "react",
        "react-dom",
      ],
      alias: [
        {find: 'env.config', replacement: path.resolve(__dirname, 'env.config.tsx')},
        {find: '~bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap/')},
        {find: '~react-loading-skeleton', replacement: path.resolve(__dirname, 'node_modules/react-loading-skeleton/')},
      ],
    },
    define,
  };
});
