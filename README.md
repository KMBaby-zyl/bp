> A better `npm publish`
> support single package or multiple packages (lerna).

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

# 配置
lerna 
> 是否是lerna多包

registry
> npm源

# 使用
```
// 发正式版，最小版本号+1
// 0.1.2 -> 0.1.3
// 0.1.2-beta.1 -> 0.1.3
bp pub
```

```
// 发beta版, beta后面的版本号+1
// 0.1.2 -> 0.1.2-beta.1
// 0.1.2-beta.1 -> 0.1.2-beta.2
pub --tag=beta
```

# 参数