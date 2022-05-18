# SITE-STARTER-REACT-BASIC
This repository provides a basic example of how to start developing a React site on the Yext Sites system.

## Getting Started
### Prerequisites
1. You must have access to the yext github organization: https://github.com/yext
1. You must have access to the yext npm organization: https://www.npmjs.com/org/yext
1. Have the Yext CLI installed: https://hitchhikers.yext.com/guides/cli-getting-started-resources/01-install-cli/
1. Have Deno installed: https://deno.land/manual/getting_started/installation
1. Have node installed, version 16 or later: https://nodejs.org/en/download/

    * It's recommend to use nvm: https://github.com/nvm-sh/nvm#installing-and-updating or via brew `brew install nvm`
1. Optional: Have a Yext account (necessary for production builds, deploying on Yext Sites, and pulling local stream document data)

### Clone this repo and install dependencies
```shell
git clone git@github.com:yext/site-starter-react-basic.git
cd site-starter-react-basic
npm install
```

### Useful commands
`yext init` - Authenticates usage with your Yext account

`npm run dev` - runs your code against a local dev server using Vite
* All stream documents come from the `localData` folder

`npm run dev -- dynamic` - same as above except instead of using files from `localData` it will pull the document from Yext on the fly

`yext sites generate-test-data` - pull an example set of `localData` from your account

`yext sites build` - Runs a production build against your `localData`

`yext sites serve` - Runs a local server against your production-built files

* It's recommended to build and serve before committing in order to test that a real production build won't have any issues. This is because a local dev build (via `npm run dev`) works differently from a production build.

`npm run fmt` - Automatically formats all code

`npm run lint` - Run ESLint to check for errors and warnings

## Repository Layout
```
root
└───localData
└───sites-config
│   │   ci_config.json
└───src
│   │   index.css
│   │   wrapper.ts
│   │
│   └───components
│   │
│   └───templates
│       │   index.tsx
│       │   static.tsx
```
### localData
Contains example stream documents that are used while local developing. By default this repo contains an example `foo.json` that works with the provided example templates. You can generate real stream documents specific to your Yext account via `yext sites generate-test-data`.

NOTE: You normally wouldn't want to check in the localData folder as it's only used for local dev. It is gitignored by default.

### sites-config
Contains a single `ci_config.json` file. This file defines how the Yext CI system will build your project. It is not used during local dev; however, it is used when running a local production build (i.e. `yext sites build`).

NOTE: A `features.json` file will automatically be generated during CI build for you based on the `config`s defined in your templates.

### src
#### components
This is where all of your custom components _may_ live. This folder is not required and you can set up your own custom folder structure for your own components in any way you'd like, as long as it lives in the `src` directory.

#### templates
Required. This is where your actual templates live. There are effectively two types of components:

1. stream-based templates: those that have an exported `config`
1. static templates: those that don't have an exported `config`. Furthermore, they may also export a `getStaticProps` function if external data is required.

NOTE: It's not currently possible to generate multiple html files using a static template, even if `getStaticProps` returns arrayed data.

#### index.css
Not required. In this example this sets up Tailwind CSS.

#### wrapper.ts
A convenient function that handles the boilerplate of how to render the template during a production build. It is called in the `render` function of each template.

NOTE: Future work may remove wrapper.ts and the need for a `render` function entirely.

### Everything else
The rest of the files are basic config setup common to many other React projects. In this examples we've enabled:

1. Tailwind CSS (which includes PostCSS) - used for easy styling
1. ESLint - catches errors in your code
1. Prettier - formats your code
1. TypeScript - Add typing to Javascript for a better developer experience
