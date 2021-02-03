> A better `npm publish`

### Install
```
// npm
$ npm install --global better-publish
// yarn
$ yarn global add better-publish
```

### 约定
1. 执行命令之前代码必须已经commit
2. 只能在master或者release分支执行,其他分支执行会报错提示

# 使用
> pub
发正式版，最小版本号+1
* 0.1.2 -> 0.1.3
* 0.1.2-beta.1 -> 0.1.3

> pub --tag=beta
发beta版, beta后面的版本号+1
* 0.1.2 -> 0.1.2-beta.1
* 0.1.2-beta.1 -> 0.1.2-beta.2

> pub --nocheck 
跳过前置检查， 可在任何分支publish
