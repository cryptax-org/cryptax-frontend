# Cryptax frontend

[![Build Status](https://travis-ci.org/cryptax-org/cryptax-frontend.svg?branch=master)](https://travis-ci.org/cryptax-org/cryptax-frontend)

## Pre-requisite

- Node v8.x.x

## Installation
- Clone the repository: `git clone git@github.com:cryptax-org/cryptax-frontend.git`
- Navigate into the project directory: `cd cryptax-frontend`
- Install dependencies: `npm install`

## Running

### dev

- Add a `.env` file following `.env.template` (you can copy its exact content)
- Run: `npm run dev`

### production build

- Add a `.env.production` file following `.env.template` with your appropriate production settings
- Run: `npm run build`
- Run: `npm start`

## This project uses...

- Ducks architecture
- Redux
- Express
- Axios
- Semantic UI React styling
- CSS Modules
- Redux Dev Tools / HMR
- Codesplitting
- Webpack
- Jest

## See the website live

- The website is currently live and available at https://www.cryptax.app
