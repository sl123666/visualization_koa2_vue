<template>
    <div class="hotTable">
        <div ref="hotTable" class="box"></div>
        <span class="iconfont arr_left" :style="comStyle" @click="toLeft">&#xe6ef;</span>
        <span class="iconfont arr_right" :style="comStyle" @click="toRight">&#xe6ed;</span>
        <span class="cat_name">{{catTitle}}</span>
    </div>
</template>

<script>
    export default {
        name: "hotTable",
        data(){
            return{
                echartsInstances: null,
                apiData: null,
                currentIndex: 0,
                fontsize: null,
            }
        },
        computed: {
            catTitle(){
                if (!this.apiData){
                    return ''
                }
                return this.apiData[this.currentIndex].name
            },
            comStyle(){
                return {
                    'font-size': this.fontsize + 'px'
                }
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
        },
        methods: {
            initChart(){
                this.echartsInstances = this.$echarts.init(this.$refs.hotTable, "chalk");
                let initOption = {
                    legend: {
                        top: '15%',
                        icon: 'circle'
                    },
                    title: {
                        text: '▎ 热销商品销售金额占比统计',
                        left: 20,
                        top: 20
                    },
                    series: [
                        {
                            type: "pie",
                            label: {
                                show: false
                            },
                            labelLine: {
                                // 隐藏线
                                show: false
                            },
                            emphasis: {
                                label: {
                                    // 高亮显示文字
                                    show: true
                                }
                            }
                        }
                    ],
                    tooltip: {
                        trigger: "item",
                        formatter: (args)=>{
                            let tipArr = [];
                            args.data.children.forEach((item)=>{
                                let childStr = ` ${item.name}&nbsp;&nbsp;&nbsp; ${parseInt((item.value / args.value) * 100) + '%'} `
                                tipArr.push(childStr)
                            });
                            return tipArr.join('<br/>');
                        }
                    }
                };
                this.echartsInstances.setOption(initOption);
            },
            async getApiData(){
                let data = await this.$http.get(baseURL + 'hotproduct');
                this.apiData = data.data;
                this.updateChart();
            },
            updateChart(){
                let seriesData = this.apiData[this.currentIndex].children.map((item)=>{
                    return {
                        name: item.name,
                        value: item.value,
                        children: item.children
                    }
                });
                let legendData = this.apiData[this.currentIndex].children.map((item)=>{
                    return item.name
                });
                let option = {
                    legend: {
                        data: legendData
                    },
                    series: [
                        {
                            data: seriesData
                        }
                    ]
                };
                this.echartsInstances.setOption(option);
            },
            screenAdapter(){
                let fontsize = this.$refs.hotTable.offsetWidth / 100 * 4;
                this.fontsize = fontsize;
                let adapterOption = {
                    title: {
                        textStyle: {
                            fontSize: this.fontsize
                        }
                    },
                    legend: {
                        itemWidth: this.fontsize / 2,
                        itemHeight: this.fontsize / 2,
                        itemGap: this.fontsize / 2,
                        textStyle: {
                            fontSize: this.fontsize / 2
                        }
                    },
                    series: [
                        {
                            radius: this.fontsize * 4.5,
                            center: ['50%', '60%'],
                        }
                    ]
                };
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            },
            toLeft(){
                this.currentIndex--;
                if (this.currentIndex < 0){
                    this.currentIndex = this.apiData.length - 1;
                };
                this.updateChart();
            },
            toRight(){
                this.currentIndex++;
                if (this.currentIndex >= this.apiData.length){
                    this.currentIndex = 0;
                };
                this.updateChart();
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/font/iconfont.css';
    .hotTable{
        width: 100%;
        height: 100%;
        color: white;
        .box{
            width: 100%;
            height: 100%;
        }
        .arr_left {
            position: absolute;
            left: 10%;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .arr_right {
            position: absolute;
            right: 10%;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .cat_name {
            position: absolute;
            left: 80%;
            bottom: 20px;
            font-weight: bold;
        }
    }
</style>