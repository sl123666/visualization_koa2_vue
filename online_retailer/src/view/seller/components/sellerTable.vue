<template>
    <div class="seller_table" ref="seller_table">
        商家销量拍行表
    </div>
</template>

<script>
    export default {
        name: "sellerTable",
        data(){
            return{
                echartsInstances: null,//echarts实例对象
                apiData: null,
                currentPage: 1,
                allPage: 0,
                timer: null
            }
        },
        mounted() {
            this.initChart();
            this.getApiData();
            window.addEventListener('resize', this.screenAdapter);//监听浏览器窗口大小变化
            this.screenAdapter();
        },
        destroyed() {
            window.removeEventListener('resize', this.screenAdapter);
        },
        methods: {
            initChart(){//初始化echarts
                this.echartsInstances = this.$echarts.init(this.$refs.seller_table, "chalk");
                this.echartsInstances.on('mouseover', ()=>{
                    clearInterval(this.timer);
                });
                this.echartsInstances.on('mouseout', ()=>{
                    this.startInterval();
                })
                let initOption = {
                    title: {//标题
                        text: '▎ 商家销量排行',
                        left: 20,
                        top: 20,
                        textStyle: {
                            textStyle: {
                                "color": "#fff"
                            }
                        }
                    },
                    grid: { //控制直角坐标系的布局和大小
                        top: '20%',
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: { //鼠标进入的提示和背景
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            z: 0,
                            lineStyle: {
                                width: 66, color: '#2D3443'
                            }
                        }
                    },
                    xAxis: {
                        type: "value"
                    },
                    yAxis: {
                        type: "category"
                    },
                    series: {
                        type: "bar",
                        label: {//显示文字数据
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        barWidth: 66,//柱体宽度
                        itemStyle: {//柱体样式
                            barBorderRadius: [0, 33, 33, 0], //圆角
                            //颜色渐变
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: '#5052EE'
                                },
                                {
                                    offset: 1,
                                    color: '#AB6EE5'
                                }
                            ])
                        }
                    }
                };
                this.echartsInstances.setOption(initOption);
            },
            async getApiData(){//获取数据
                let data = await this.$http.get('seller');
                this.apiData = data.data;
                this.apiData.sort((a, b)=>{
                    return a.value - b.value
                });
                console.log(this.apiData);
                this.allPage = Math.floor(this.apiData.length / 5);
                await this.updateChart();
                this.startInterval();
            },
            updateChart(){//渲染echarts
                let start = (this.currentPage-1) * 5;
                let end = this.currentPage * 5;
                let showData = this.apiData.slice(start, end);
                let sellerName = showData.map((item)=>{
                    return item.name;
                });
                let sellerValue = showData.map((item)=>{
                    return item.value;
                });
                let option = {
                    xAxis: {
                        max: sellerValue[sellerValue.length - 1].value
                    },
                    yAxis: {
                        data: sellerName
                    },
                    series: {
                        data: sellerValue
                    }
                };
                this.echartsInstances.setOption(option);
            },
            startInterval(){//分页切换效果
                if (this.timer){
                    clearInterval(this.timer);
                };
                this.timer = setInterval(()=>{
                    this.currentPage++;
                    if (this.currentPage > this.allPage){
                        this.currentPage = 1;
                    }
                    this.updateChart();
                }, 3000)
            },
            screenAdapter(){
                console.log(this.$refs.seller_table.offsetWidth);
                let fonsize = this.$refs.seller_table.offsetWidth / 100 * 4;
                let adapterOption = {
                    title: {
                        textStyle: {
                            fonSize: fonsize
                        }
                    },
                    tooltip: {
                        axisPointer: {
                            lineStyle: {
                                width: fonsize
                            }
                        }
                    },
                    series: [
                        {
                            barWidth: fonsize,
                            itemStyle: {
                                barBorderRadius: [0, fonsize/2, fonsize/2, 0]
                            }
                        }
                    ]
                };
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            }
        },

    }
</script>

<style scoped lang="less">
.seller_table{
    width: 100%;
    height: 100%;
}
</style>