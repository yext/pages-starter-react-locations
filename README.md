# SITE-STARTER-REACT-BASIC

This repository provides a basic example of how to start developing a React site on the Yext Pages system.

## Getting Started

### Prerequisites

1. Have the Yext CLI installed: https://hitchhikers.yext.com/guides/cli-getting-started-resources/01-install-cli/
1. Have Deno installed, version 1.21.0 or later: https://deno.land/manual/getting_started/installation
1. Have node installed, version 17 or later: https://nodejs.org/en/download/

   - It's recommend to use nvm: https://github.com/nvm-sh/nvm#installing-and-updating or via brew `brew install nvm`

1. Optional: Have a Yext account (necessary for production builds, deploying on Yext Pages, and pulling local stream document data via `yext pages generate-test-data`). This starter already comes with some localData that can be used for local dev without the need to init with a Yext account.

### Clone this repo and install dependencies

```shell
git clone https://github.com/yext/pages-starter-react-locations
cd pages-starter-react-locations
npm install
```

### Useful commands

`yext init` - Authenticates the Yext CLI with your Yext account

`npm run dev` - runs your code against a local dev server using Vite

- All stream documents come from the `localData` folder
- You can visit either of these urls out of the box
  - http://localhost:3000/index/123
  - http://localhost:3000/static

`npm run dev -- dynamic` - same as above except instead of using files from `localData` it will pull the document from Yext on the fly

`yext pages generate-test-data` - pull an example set of `localData` from your account

`yext pages build` - Runs a production build against your `localData`

`yext pages serve` - Runs a local server against your production-built files

- It's recommended to `yext pages build` followed by `yext pages serve` before committing in order to test that a real production build won't have any issues. In practice, development builds (via `npm run dev`) and production builds compile and bundle assets differently. For local development, ES Modules are loaded directly by the browser, allowing fast iteration during local development and also allows for hot module replacement (HMR). Other things like CSS are also loaded directly by the browser, including linking to sourcemaps. During a production build all of the different files are compiled (via ESBuild for jsx/tsx) and minified, creating assets as small as possible so that the final html files load quickly when served to a user.

`npm run fmt` - Automatically formats all code

`npm run lint` - Run ESLint to check for errors and warnings

## Repository Layout

```
root
└───localData
└───sites-config
│   │   ci.json
└───src
│   │   index.css
│   │
│   └───components
│   │
│   └───templates
│       │   index.tsx
│       │   static.tsx
│   │
│   └───types
```

### localData

Contains example stream documents that are used while local developing. By default this repo contains example files that work with the provided example templates. You can generate real stream documents specific to your Yext account via `yext pages generate-test-data`.

NOTE: You normally wouldn't want to check in the localData folder as it's only used for local dev. It is gitignored by default.

### sites-config

Contains a single `ci.json` file. This file defines how the Yext CI system will build your project. It is not used during local dev. However, it is used when running a local production build (i.e. `yext pages build`).

NOTE: A `features.json` file will automatically be generated during CI build for you based on the `config`s defined in your templates. One has been checked in to this repo so that `yext pages generate-test-data` works out of the box (assuming you've `yext init`'ed with your Yext account). If this file doesn't exist then `yext pages build` will implicitly generate a new one when it calls `npm run directbuild` (defined in `sites-config/ci.json`).

### src

#### components

This is where all of your custom components _may_ live. This folder is not required and you can set up your own custom folder structure for your own components in any way you'd like, as long as it lives in the `src` directory.

#### templates

Required. This is where your actual templates live. There are effectively two types of components:

1. stream-based templates: those that have an exported `config`
1. static templates: those that don't have an exported `config`. Furthermore, they may also export a `getStaticProps` function if external data is required.

NOTE: It's not currently possible to generate multiple html files using a static template, even if `getStaticProps` returns arrayed data.

#### types

Here you can define any custom TypeScript types you need.

#### index.css

Not required. In this example this sets up Tailwind CSS.

### vite.config.js

Vite is now a first class member of the starter! This file defines any custom Vite configuration you want, giving you full control over your setup. Specifically, it will allows users to pass additional configuration options to the vite-plugin-yext-sites-ssg plugin when they become more widely available.

### Everything else

The rest of the files are basic config setup common to many other React projects. In this example we've enabled:

1. Tailwind CSS (which leverages PostCSS) - used for easy styling
1. ESLint - catches errors in your code
1. Prettier - formats your code (you can add .prettierrc to override any default settings)
1. TypeScript - adds typing to Javascript for a better developer experience
