//计算服务器处理时长中间件

module.exports = async (ctx, next)=>{
    let start = Date.now();
    await next();
    let end = Date.now();
    let duration = end - start;
    //设置响应时间
    ctx.set("X-Response-Time", duration + "ms");
}