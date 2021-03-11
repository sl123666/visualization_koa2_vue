# visualization_koa2_vue

可视化电商平台（个人项目）

启动项目：
    
    后端：进入koa2_server目录，npm install安装所需依赖，命令窗输入node app.js
    
    前端：

架构：

    前端：vue+echarts
    
    后端：node-koa2
    
目录

--后端

|---koa2_server

    |---app.js：项目入口文件

    |---data：用来存放所有模块的 json 文件数据
        
    |---middleware：用来存放所有的中间件代码
        
        |---koa_response_data.js 是业务逻辑中间件
        
        |---koa_response_duration.js 是计算服务器处理时长的中间件
        
        |---koa_response_header.js 是用来专门设置响应头的中间件
    
    |---utils：封装一些公共方法