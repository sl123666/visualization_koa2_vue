<template>
    <div class="rankTable" ref="rankTable">排行</div>
</template>

<script>
    export default {
        name: "rankTable",
        data(){
            return{
                echartsInstances: null,
                apiData: null,
                startValue: 0,
                endValue: 9,
                timer: null,
            }
        },
        mounted() {
            this.initChart();
            this.getApiData();
            window.addEventListener('resize', this.screenAdapter);
            this.screenAdapter();
        },
        destroyed() {
            window.removeEventListener('resize', this.screenAdapter);
            clearInterval(this.timer);
        },
        methods: {
            initChart(){
                this.echartsInstances = this.$echarts.init(this.$refs.rankTable, 'chalk');
                let initOption = {
                    title: {
                        text: '▎ 地区销售排行',
                        left: 20,
                        top: 20
                    },
                    grid: {
                        top: "40%",
                        left: "5%",
                        right: "5%",
                        bottom: "5%",
                        containLabel: true
                    },
                    tooltip: { show: true },
                    xAxis: {
                        type: "category"
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: [
                        {
                            type: "bar"
                        }
                    ]
                };
                this.echartsInstances.setOption(initOption);
                this.echartsInstances.on('mouseover', ()=>{
                    clearInterval(this.timer);
                });
                this.echartsInstances.on('mouseout', ()=> {
                    this.startInterval()
                });
            },
            async getApiData(){
                let data = await this.$http.get(baseURL+ 'rank');
                console.log(data);
                this.apiData = data.data;
                this.apiData.sort((a, b)=>{
                    return b.value - a.value;
                })
                this.updateChart();
                this.startInterval();
            },
            updateChart(){
                let colorArr = [ ['#0BA82C', '#4FF778'], ['#2E72BF', '#23E5E5'], ['#5052EE', '#AB6EE5'] ];
                let nameArr = this.apiData.map((item)=>{
                    return item.name;
                });
                let valueArr = this.apiData.map((item)=>{
                    return item.value;
                });
                let option = {
                    xAxis: {
                        data: nameArr
                    },
                    dataZoom: {
                        show: false,
                        startValue: this.startValue,
                        endValue: this.endValue
                    },
                    series: [
                        {
                            data: valueArr,
                            itemStyle: {
                                color: arg => {
                                    let targetColorArr = colorArr[0]
                                    if (arg.value >= 300) {
                                        targetColorArr = colorArr[0]
                                    } else if (arg.value >= 200) {
                                        targetColorArr = colorArr[1]
                                    } else {
                                        targetColorArr = colorArr[2]
                                    }
                                    return new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: targetColorArr[0] },
                                        { offset: 1, color: targetColorArr[1] }
                                    ])
                                }
                            }
                        }
                    ]
                };
                this.echartsInstances.setOption(option);
            },
            startInterval(){
                if (this.timer){
                    clearInterval(this.timer);
                }
                this.timer = setInterval(()=>{
                    this.startValue++;
                    this.endValue++;
                    if (this.endValue > this.apiData.length-1){
                        this.startValue = 0;
                        this.endValue = 9;
                    };
                    this.updateChart();
                }, 3000)
            },
            screenAdapter(){
                let fontsize = this.$refs.rankTable.offsetWidth / 100 * 4;
                const adapterOption = {
                    title: {
                        textStyle: {
                            fontSize: fontsize
                        }
                    },
                    series: [
                        {
                            barWidth: fontsize,
                            itemStyle: {
                                barBorderRadius: [0.5 * fontsize, 0.5 * fontsize, 0, 0]
                            }
                        }
                    ]
                }
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            }
        }
    }
</script>

<style scoped lang="less">
    .rankTable{
        width: 100%;
        height: 100%;
    }
</style>