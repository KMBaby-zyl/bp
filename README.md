> a better `npm publish`
> support single package, multiple packages please use lerna

### Install
```
// npm
$ npm install --global better-publish
// yarn
$ yarn global add better-publish
```

### 功能
1. 自动增加版本号
2. 自动打tag
3. 支持tag
4. 支持命令行式选择版本号 TODO

### 约定
1. 执行命令之前代码必须已经commit

# 配置
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
