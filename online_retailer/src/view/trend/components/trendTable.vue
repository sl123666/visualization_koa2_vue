<template>
    <div class="trendTable">
        <div class="title" :style="comStyle">
            <span>{{'▎ ' + title}}</span>
            <span class="iconfont title-icon" :style="comStyle" @click="isShowChoice=!isShowChoice">&#xe6eb;</span>
            <div class="select-con" v-if="isShowChoice">
                <div class="select-item" v-for="item in selectTypes"
                     :key="item.key" @click="handleSelect(item.key)"> {{'&nbsp;&nbsp;&nbsp;'+ item.text}} </div>
            </div>
        </div>
        <div class="trendBox" ref="trendTable"></div>
    </div>
</template>

<script>
    export default {
        name: "trendTable",
        data(){
            return{
                echartsInstances: null,
                apiData: null,
                currentType: "map",
                isShowChoice: false,
                titleFontSize: 0,
            }
        },
        computed: {
            selectTypes () {
                if (!this.apiData || ! this.apiData.type) {
                    return []
                } else {
                    return this.apiData.type.filter(item => {
                        return item.key !== this.dataType
                    })
                }
            },
            title () {
                if (!this.apiData) {
                    return ''
                } else {
                    return this.apiData[this.currentType].title
                }
            },
            comStyle () {
                return {
                    fontSize: this.titleFontSize + 'px'
                }
            }
        },
        mounted() {
            this.echartInit();
            this.getApiData();
            window.addEventListener('resize', this.screenAdapter);
            this.screenAdapter();
        },
        methods:{
            echartInit(){
                this.echartsInstances = this.$echarts.init(this.$refs.trendTable, 'chalk');
                let initOption = {
                    grid: {
                        top: '35%',
                        left: '3%',
                        right: '4%',
                        bottom: '1%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: '15%',
                        icon: 'circle',
                        left: 20
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false
                    },
                    yAxis: {
                        type: "value"
                    }
                };
                this.echartsInstances.setOption(initOption);
            },
            async getApiData(){
                let data = await this.$http.get('trend');
                this.apiData = data.data;
                console.log(this.apiData);
                this.updateChart();
            },
            updateChart(){
                //半透明颜色值
                let colorArr1 = [ 'rgba(11, 168, 44, 0.5)', 'rgba(44, 110, 255, 0.5)', 'rgba(22, 242, 217, 0.5)', 'rgba(254, 33, 30, 0.5)', 'rgba(250, 105, 0, 0.5)' ];
                //全透明颜色值
                let colorArr2 = [ 'rgba(11, 168, 44, 0)', 'rgba(44, 110, 255, 0)', 'rgba(22, 242, 217, 0)', 'rgba(254, 33, 30, 0)', 'rgba(250, 105, 0, 0)' ];
                let timeArr = this.apiData.common.month;
                let valueArr = this.apiData[this.currentType].data;
                let seriesArr = valueArr.map((item, index)=>{
                    return {
                        type: "line",
                        name: item.name,
                        data: item.data,
                        stack: 'map',
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: colorArr1[index] },
                                { offset: 1, color: colorArr2[index] }
                                ])
                        },
                    }
                });
                let legendArr = valueArr.map((item)=>{
                    return item.name;
                });
                let option = {
                    xAxis: {
                        data: timeArr
                    },
                    legend: {
                        data: legendArr
                    },
                    series: seriesArr
                };
                this.echartsInstances.setOption(option);
            },
            handleSelect(key){
                this.currentType = key;
                this.updateChart();
                this.isShowChoice = false;
            },
            screenAdapter () {
                // console.log(this.$refs.trendTable.offsetWidth,6666)
                this.titleFontSize = this.$refs.trendTable.offsetWidth / 100 * 3.6;
                const adapterOption = {
                    legend: {
                        itemWidth: this.titleFontSize,
                        itemHeight: this.titleFontSize,
                        itemGap: this.titleFontSize,
                        textStyle: {
                            fontSize: this.titleFontSize / 2
                        }
                    }
                }
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            },
        }
    }
</script>

<style scoped lang="less">
    @import '../../../assets/font/iconfont.css';
    .trendTable{
        width: 100%;
        height: 100%;
        .trendBox{
            width: 100%;
            height: 100%;
        }
        .title {
            position: absolute;
            left: 20px;
            top: 20px;
            z-index: 99999;
            color: white;
            .title-icon {
                margin-left: 10px;
                cursor: pointer;
            }
            .select-con{
                background: #222733;
            }
            .select-item {
                cursor: pointer;
            }
        }
    }
</style>