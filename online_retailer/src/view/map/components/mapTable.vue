<template>
    <div class="mapTable" @click="restarMap" ref="mapTable"></div>
</template>

<script>
    import { getProvinceMapInfo } from '../../../utils/map_utils';
    export default {
        name: "mapTable",
        data(){
            return{
                echartsInstances: null,
                apiData: null
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
            restarMap(){
              this.echartsInstances.setOption({
                  geo: {
                      map: "china"
                  }
              })
            },
            async initChart(){
                this.echartsInstances = this.$echarts.init(this.$refs.mapTable, "chalk");
                let data = await this.$http.get('http://'+location.host+'/static/map/china.json');
                console.log(data)
                this.$echarts.registerMap("china", data.data);
                let initOption = {
                    geo: {
                        type: "map",
                        map: "china",
                        top: '5%',
                        bottom: '5%',
                        itemStyle: {
                            areaColor: '#2E72BF',
                            borderColor: 'red'
                        }
                    },
                    title: {
                        text: '▎ 商家分布',
                        left: 20, top: 20
                    },
                };
                this.echartsInstances.setOption(initOption);
                this.echartsInstances.on('click', async (arg)=>{
                    let  provinceInfo = getProvinceMapInfo(arg.name);
                    let res = await this.$http.get('http://'+location.host+provinceInfo.path);
                    console.log(res)
                    this.$echarts.registerMap(provinceInfo.key, res.data);
                    this.echartsInstances.setOption({
                        geo: {
                            map: provinceInfo.key
                        }
                    });
                    this.screenAdapter();
                })
            },
            async getApiData(){
                let data = await this.$http.get(baseURL + 'map');
                this.apiData = data.data;
                this.updateChart();
            },
            updateChart(){
                let legendData = this.apiData.map((item)=>{
                    return item.name;
                });
                let seriesArr = this.apiData.map((item)=>{
                    return{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        name: item.name,
                        data: item.children,
                        rippleEffect: { scale: 5, brushType: 'stroke' },
                    }
                })
                let option = {
                    legend: {
                        data: legendData
                    },
                    series: seriesArr
                };
                this.echartsInstances.setOption(option);
            },
            screenAdapter () {
                let fontsize = this.$refs.mapTable.offsetWidth / 100 * 4;
                let adapterOption = {
                    title: {
                        textStyle: {
                            fontSize: fontsize
                        }
                    },
                    legend: {
                        itemWidth: fontsize / 2,
                        itemHeight: fontsize / 2,
                        itemGap: fontsize / 2,
                        textStyle: {
                            fontSize: fontsize / 2
                        }
                    }
                };
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            }
        }
    }
</script>

<style scoped lang="less">
.mapTable{
    width: 100%;
    height: 100%;
    .box{
        width: 100%;
        height: 100%;
    }
}
</style>