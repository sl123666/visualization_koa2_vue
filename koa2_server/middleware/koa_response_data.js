//业务逻辑中间件
let path = require("path");
let fileUtils = require("../utils/utils");

module.exports = async (ctx, next)=>{
    let url = ctx.request.url;  // /api/seller
    // console.log(url)
    let filePath = url.replace("/api", "");
    filePath = "../data" + filePath + ".json";
    filePath = path.join(__dirname, filePath);
    // console.log(filePath)
    try{
        let res = await fileUtils.getFileJsonData(filePath);
        ctx.response.body = res;
    }catch (e) {
        let errMessage = {
            message: "读取文件内容失败, 文件资源不存在",
            status: 404
        };
        ctx.response.body = errMessage;
    }
    await next();
}