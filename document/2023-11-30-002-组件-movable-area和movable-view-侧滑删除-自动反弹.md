# 组件-movable-area和movable-view-侧滑删除-自动反弹

[toc]

## 一、目标

实现movable-area和moveable-view滑动回弹效果。

效果：在滑动不超过一半的时候，让它自动弹回去。让滑动超出一半的时候，让它弹出来。

## 二、使用miniprogram-slide-view组件实现

```shell
-- 第一步：进入项目目录
$ cd QuickStart/
-- 第二步：执行npm的初始化，如果没有初始化这一步，下一步在选择菜单构建npm时，软件会提示找不到npm包的错误
-- 完成项目的初始化，完成之后，项目中生成一个package.json文件，接下来安装的所有模块以及这个模块的版本信息，在这个文件里面都有描述
$ npm init -y
-- 第三步：用npm install指令，开始安装上面提到的小程序组件：https://github.com/wechat-miniprogram/slide-view
-- 安装完成之后，会多出来一个node_modules目录，这个目录是本地存放模块源码的目录，以后所有下载的模块都会被放在这个目录里面
$ npm install --save miniprogram-slide-view
-- 第四步：现在还不能立马使用，需要在微信开发工具里面选择菜单-工具，构建npm。
-- 这一步微信开发工具把编译时需要文件，仅仅是编译时需要的文件，从node_modules目录下移动到miniprogram_npm下，第一次执行菜单的时候，miniprogram_npm目录并不存在，微信开发者工具会帮助我们自动创建。
-- 第五步：在小程序页面的json配置文件里面，使用usingComponents配置，添加对组件的引用。
完成配置以后就可以在wxml代码里面使用这个组件
```

index.json

```json
{
    "usingComponents": {
        "slide-view": "miniprogram-slide-view"
    }
}
```

常见错误：

> Component is not found in path

检查是不是在小程序的源码目录下初始化npm模块的。

> 在项目文件project.config.json里面，配置文件中miniprogramRoot指定的目录，才是我们选择npm初始化的目录