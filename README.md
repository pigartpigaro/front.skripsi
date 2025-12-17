# Swastha App (swastha)

Front Swastha App

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your GitHub token to `.env`:
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

3. Make sure to never commit `.env` file

## GitHub Token Setup

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate new token with these permissions:
   - repo (full)
   - read:user
   - user:email
3. Copy token and paste it in `.env` file
