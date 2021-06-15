# ksher-payment SDK DEMO (NodeJs)

## 概览

使用 node 的 koa 框架, 集成了 ksherPaymentSDK 后的简单服务器端demo



## 安装

#### 下载代码

```shell
git clone https://github.com/ksher-solutions/payment_demo_nodejs my-project

cd my-project
```

#### 安装依赖

使用 yarn 安装

```shell
yarn install
```

## 开始

### 配置选项

修改 server/setting.json 配置文件

|      配置项      |       是否必选       |               描述                |
| :--------------: | :------------------: | :-------------------------------: |
|       host       |          是          |        商户的支付网关域名         |
|      token       |          是          |      商户的支付网关token签名      |
| mp_alipay_appid  | 预览支付宝小程序必选 |        支付宝小程序的appid        |
| mp_alipay_openid | 预览支付宝小程序必选 | 对应支付宝小程序的体验者的 openid |
| mp_wechat_openid |  预览微信小程序必选  |         微信小程序的appid         |
| mp_wechat_appid  |  预览微信小程序必选  |  对应微信小程序的体验者的 openid  |
|       port       |          是          |       本地服务运行的端口号        |

### 启动服务

```
yarn serve-example
```



### 体验网站支付

http://localhost:3000/h5-demo.html

注意这里使用的端口号是默认的3000, 如果你修改了setting.json 中的port选项, 这里需要改为对应的值才能访问



### 体验支付宝小程序

确保您在setting.json中配置了体验支付宝小程序必须的选项, 且拥有开发者权限

安装并打开支付宝小程序开发者工具, 选择导入项目

目录为 项目目录/mini-app/alipay

开始体验

