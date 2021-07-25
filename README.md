# dev3cli

自己用的Web前端工程初始化工具，支持`vite vue3.x/react`(eslint/prettier/typescript), `webpack es6/vue2.x/react/typescript`(eslint)。

Quickly build command line interface for Web front end development environment.

Build by webpack, vue/react/typescript and babel/eslint/sass/scss

When using vite/vue3, execute the command: `dev3cli init ProjectName vite`

When using vite/react, execute the width command: `dev3cli init ProjectName vite react`

<p align="left">
  <a href="https://npmcharts.com/compare/dev3cli?minimal=true"><img src="https://img.shields.io/npm/dm/dev3cli.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/dev3cli"><img src="https://img.shields.io/npm/v/dev3cli.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/dev3cli"><img src="https://img.shields.io/npm/l/dev3cli.svg?sanitize=true" alt="License"></a>
</p>

## Install

```shell script
# npm
npm install -g dev3cli
# or
npm i -g dev3cli

# yarn
yarn global add dev3cli
```

## Create a New Project

```shell script
dev3cli init project-name
```

### use vite/vue3.x

```shell script
dev3cli init project-name vite
```

### use vite/react

```shell script
dev3cli init project-name vite react
```

### use React(webpack)

```shell script
dev3cli init project-name react
# use typescript
dev3cli init project-name react ts
```

### use Vue2.x(webpack)

```shell script
dev3cli init project-name vue
# use typescript
dev3cli init project-name vue ts
```

### use typescript only(webpack)

```shell script
dev3cli init project-name typescript
# or
dev3cli init project-name ts
```

## Run the project

```shell script
# cd project-name
npm run dev
```

The project will run at `http://0.0.0.0:4000/` or `http://localhost/:4000/`
