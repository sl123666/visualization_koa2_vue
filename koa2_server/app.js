const Koa = require("koa");
const KoaResponseDuration = require("./middleware/koa_response_duration");
const KoaResponseHeader = require("./middleware/koa_response_header");
const KoaResponseData = require("./middleware/koa_response_data");

let app = new Koa();

app.use(KoaResponseDuration);//计算请求处理时间中间件
app.use(KoaResponseHeader);//设置响应头中间件
app.use(KoaResponseData);//响应数据

app.listen(8080)