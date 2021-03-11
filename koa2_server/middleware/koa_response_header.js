//设置响应头的中间件

module.exports = async (ctx, next)=>{
    ctx.set("Content-Type", "application/json; charset=utf-8");
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    await next();
}