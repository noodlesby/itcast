# my-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 配置eslint

- .eslintrc.js 中增加规则

```js
// 不检查console
'no-console': 'off',
// 不检查结束的,
"comma-dangle": [2, "never"],
```

## 配置package.json中 使用eslint修改代码格式

```js
"lintfix": "eslint --ext .js,.vue src --fix",
```