# vue-element-template

> Vue demo from Q.Y

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

# run build dll-plugin and pack packaging
npm run build:dll

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 打包
请先生成dll-plugin包：
```bash
npm run build --report
```

## 动态路由思路
1. 创建vue实例的时候，加载`vuex`与`vue-router`。这时，vue-router中只有login、404、不需要权限管理的homepage。vuex中的模块有app页面状态、user用户信息、permission权限信息。vuex的getter中有以上模块信息的映射，以方便引用
2. Login页面登陆成功后返回用户Token，放在以后所有通信的header里，以后每次前后台通讯的时候都验证Token的有效性，无token或者token过期都要重新登陆并重新获取权限列表
3. Login之后去后台询问该用户的权限列表，与本地的Router配置根据path比对，生成用户有权限的路由列表，并在导航守卫里通过addRouters动态添加到路由里，路由添加好了之后就可以导航到用户首页了
4. Layout的侧边栏由步骤3里生成的用户有权限的路由表动态生成

