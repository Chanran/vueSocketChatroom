# socket.io 即时聊天室

## 界面一瞥

- login page

  ![login page](./login.png)

- group chat page

  ![group chat page](./group_chat.png)

- others list
  ![others](./others.png)

- private chat page

  ![private chat](./private_chat.png)

## 安装依赖

1. node7.x

2. 自动重启node服务工具

```
npm i -g nodemon
```

3. QA(代码质量保证) 工具

    给你的编辑器装一个eslint插件(比如vscode的"eslint")

## 下载

``` bash
# 克隆
git clone git@github.com:Chanran/vueSocketChatroom.git
cd vueSocketChatroom

# 安装依赖
npm install -d
```

## 启动

```
npm run dev
npm run server # 另开一个终端
```

访问 [http://localhost:8080/](http://localhost:8080/)

## 部署

```
npm install -g pm2 // 只安装一次
npm run deploy
```

## 技术文档

- [api文档](https://www.showdoc.cc/1629169?page_id=14974136)
- [vue2(前端MVVM框架)](https://cn.vuejs.org/)
- [vue-router2(前端路由框架)](https://router.vuejs.org/zh-cn/)
- [vue-loader(webpack的loader,vue-cli使用的)](https://lvyongbo.gitbooks.io/vue-loader/content/)
- [vux(前端UI框架)](https://vux.li/#/)
- [express4.x(node框架)](http://www.expressjs.com.cn/)
- [mongodb(数据库)](http://mongodb.github.io/node-mongodb-native/2.2/installation-guide/installation-guide/)

## License

[MIT](../LICENSE)
