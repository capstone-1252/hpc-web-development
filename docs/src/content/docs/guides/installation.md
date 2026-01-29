---
title: Frontend Installation
description: How to set up your project locally
---
## Requirements:
- Git 
- npm latest version

## Clone the project
In your terminal use the git clone command:
```bash
git clone git@github.com:cjodo/astro-example.git
## enter the project directory
cd astro-example
```
## Install Dependencies
```bash
npm install

```
## Setup environment 
Head to .env.example, rename it to .env and replace 
```bash
PUBLIC_COCKPIT_API="<Api Url>"
COCKPIT_API_KEY="<Api Key>"
```

## Commands
>  Prefixed with npm run \<command\>

| Command | Usage | 
| ------------- | -------------- |
| dev | Starts the development server | 
| build | Builds the static website ready for deployment | 

