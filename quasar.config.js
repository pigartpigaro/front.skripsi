// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'

export default defineConfig((ctx) => {
  // console.log('module', ctx)
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['axios', 'global-components', 'editor-componens', 'other-components', 'static-components', 'router',
      // ini juga baru untuk optimasi dan monitoring
      'performance', 'memory-monitor', 'error-tracking'
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font', // optional, you are not bound to it
      // 'material-icons' // optional, you are not bound to it yaaa
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      env: {
        // NODE_OPTIONS: '--max-old-space-size=20480',
        API: ctx?.dev
          ? 'http://localhost:8080'
          // ? 'http://103.139.192.183:3501'
          // : 'http://192.168.150.111:3507',
          : 'http://103.139.192.183:3501',

        WSHOST: ctx?.dev
          ? '103.139.192.183'
          // ? 'localhost'
          : '103.139.192.183',

        PATHIMG: ctx?.dev
          // ? 'http://localhost:8000/storage/'
          ? 'http://103.139.192.183:3501/'
          : 'http://103.139.192.183:3501/',



        BPOM_URL: ctx?.dev
          ? '/bpom'
          : '/bpom'

      },

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir


      // ini baru saya optimasi


      rollupOptions: {
        plugins: [
          {
            name: 'optimize-images',
            async generateBundle(options, bundle) {
              // Optimize hanya file yang dibutuhkan
              const imagePattern = /\.(jpg|jpeg|png|gif|webp)$/;
              for (const fileName in bundle) {
                if (imagePattern.test(fileName)) {
                  // Gunakan sharp yang sudah ada
                  const file = bundle[fileName];
                  // Proses optimasi
                }
              }
            }
          }
        ]
      },

      // Tambahkan source maps untuk production debugging
      sourcemap: false,
      // Tambahkan performance budgets
      performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
      viteVuePluginOptions: {
        reactivityTransform: true
      },

      extendViteConf(viteConf) {
        viteConf.build.chunkSizeWarningLimit = 5000
        viteConf.build.rollupOptions = {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            }
          }
        };
      },
      // viteVuePluginOptions: {},

      // vitePlugins: [
      //   ['vite-plugin-checker', {
      //     eslint: {
      //       lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
      //       useFlatConfig: true
      //     }
      //   }, { server: false }]
      // ]
      // Monitor build size
      analyze: false  // Gunakan webpack-bundle-analyzer
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true
      port: ctx.mode.spa
        ? 9001
        : (ctx.mode.pwa ? 9100 : 9200),
      open: true, // opens browser window automatically


      proxy: {
        '/bpom': {
          target: 'http://103.139.192.183:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/bpom/, ''),
        }
      }

    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {
        dark: 'auto',  // 'auto' akan mengikuti sistem, atau bisa set langsung ke true
        brand: {
          third: '#214738',
          'dark-page': '#151521' // Darker background untuk contrast
        }
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack
      lang: 'id', // Quasar language pack ganti jadi bahas Indonesia
      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      components: ['QIcon', 'QBtn'],
      // directives: [],

      // Quasar plugins
      // plugins: []
      plugins: ['Notify', 'LocalStorage', 'Dialog', 'Loading', 'AppFullscreen', 'BottomSheet']
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut', 'slideInLeft', 'slideInDown', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'bounce', 'bounceIn', 'flip'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW' // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json'
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'swastha'
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: []
    }
  }
})
