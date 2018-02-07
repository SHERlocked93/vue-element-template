# vue-element-template
<p align="center">
	<a href="https://github.com/vuejs/vue">
		<img src="https://img.shields.io/badge/vue-2.5.2-brightgreen.svg" alt="vue">
	</a>
	<a href="https://github.com/ElemeFE/element">
		<img src="https://img.shields.io/badge/element--ui-2.0.11-brightgreen.svg" alt="element-ui">
	</a>
	<a href="https://travis-ci.org/PanJiaChen/vue-element-admin" rel="nofollow">
		<img src="https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master" alt="Build Status">
	</a>
	<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
	</a>
</p>

> 一个简单的vue实例，包括登陆页、权限控制、基于token的身份验证 etc..

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

## 待办

- [x] 登录/注销
- [x] 权限验证
- [x] 动态路由/侧边栏
- [ ] 多级动态路由/侧边栏
- [x] 头像上传
- [x] 密码修改
- [x] 密码修改
- [x] 角色配置
- [x] 角色权限配置
- [x] 用户配置
- [ ] 多环境发布
- [x] 动态面包屑
- [ ] websocket通信应用通知
- [ ] 国际化多语言
- [ ] 多种动态换肤
- [ ] 快捷导航(标签页)
- [ ] 富文本编辑器
- [ ] Markdown编辑器
- [ ] JSON编辑器
- [ ] Screenfull全屏
- [ ] 列表拖拽
- [ ] Svg Sprite 图标
- [ ] Dashboard
- [ ] 本地mock数据
- [ ] Echarts 图表
- [ ] Clipboard(剪贴复制)
- [x] 404错误页面
- [ ] 错误日志
- [ ] 导出excel
- [ ] 导出zip
- [ ] 前端可视化excel
- [ ] 树形table
- [ ] 动态table example
- [ ] 拖拽table example
- [ ] 内联编辑table example
- [ ] 微信/QQ登录


## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
