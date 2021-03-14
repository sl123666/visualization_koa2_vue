<template>
    <div ref="stockTable" class="stockTable">库存两</div>
</template>

<script>
    export default {
        name: "stockTable",
        data(){
            return{
                echartsInstances: null,
                apiData: null,
                currentIndex: 0,
                timer: null,
                titleFontSize: null,
            }
        },
        mounted() {
            this.initChart();
            this.getApiData();
            window.addEventListener('resize', this.screenAdapter);
            this.screenAdapter();
        },
        destroyed() {
            clearInterval(this.timer);
            window.removeEventListener('resize', this.screenAdapter);
        },
        methods: {
            initChart(){
                this.echartsInstances = this.$echarts.init(this.$refs.stockTable, "chalk");
                let centerPointers = [ ['18%', '40%'], ['50%', '40%'], ['82%', '40%'], ['34%', '75%'], ['66%', '75%'] ];
                let initOption = {
                    title: {
                        text: '▎ 库存销售量',
                        left: 20, top: 20
                    },
                    series: [
                        {
                            type: 'pie',
                            center: centerPointers[0],
                            hoverAnimation: false,
                            label: {
                                show: true,
                                position: 'center'
                            },
                            labelLine: { show: false }
                        },
                        {
                            type: 'pie',
                            center: centerPointers[1],
                            hoverAnimation: false,
                            label: {
                                show: true,
                                position: 'center'
                            },
                            labelLine: { show: false }
                        },
                        {
                            type: 'pie',
                            center: centerPointers[2],
                            hoverAnimation: false,
                            label: {
                                show: true,
                                position: 'center'
                            },
                            labelLine: { show: false }
                        },
                        {
                            type: 'pie',
                            center: centerPointers[3],
                            hoverAnimation: false,
                            label: {
                                show: true,
                                position: 'center'
                            },
                            labelLine: { show: false }
                        },
                        {
                            type: 'pie',
                            center: centerPointers[4],
                            hoverAnimation: false,
                            label: {
                                show: true,
                                position: 'center'
                            },
                            labelLine: { show: false }
                        }
                    ]
                };
                this.echartsInstances.setOption(initOption);
                this.echartsInstances.on('mouseover', () => {
                    clearInterval(this.timer);
                });
                this.echartsInstances.on('mouseout', () => {
                    this.startInterval();
                });
            },
            async getApiData(){
                let data = await this.$http.get(baseURL + 'stock');
                console.log(data);
                this.apiData = data.data;
                this.updateChart();
                this.startInterval();
            },
            updateChart(){
                // 增加5个圆环的渐变颜色范围
                let colorArrs = [ ['#4FF778', '#0BA82C'], ['#E5DD45', '#E8B11C'], ['#E8821C', '#E55445'], ['#5052EE', '#AB6EE5'], ['#23E5E5', '#2E72BF'] ];

                let start = this.currentIndex * 5;
                let end = this.currentIndex * 5 + 5;
                let showData = this.apiData.slice(start, end);
                let seriesArr = showData.map((item, index)=>{
                    return {
                        data: [
                            {
                                value: item.sales,
                                name: item.name + '\n\n' + item.sales,
                                itemStyle: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: colorArrs[index][0] },
                                        { offset: 1, color: colorArrs[index][1] }
                                    ])
                                }
                            },
                            {
                                value: item.stock,
                                itemStyle: { color: '#333843' }
                            }
                        ],
                        label: {
                          show: true,
                          position: "center",
                            color: colorArrs[index][0]
                        }
                    }
                })
                let option = {
                    series: seriesArr
                };
                this.echartsInstances.setOption(option);
            },
            startInterval(){
                if (this.timer){
                    clearInterval(this.timer);
                };
                this.timer = setInterval(()=>{
                    this.currentIndex++;
                    let num = Math.floor(this.apiData.length/5);
                    if (this.currentIndex+1 > num){
                        this.currentIndex = 0;
                    };
                    this.updateChart();
                },3000)

            },
            screenAdapter(){
                this.titleFontSize = this.$refs.stockTable.offsetWidth / 100 * 4;
                let innerRadius = this.titleFontSize * 2;
                let outterRadius = innerRadius * 1.125
                let adapterOption = {
                    title: {
                        textStyle: {
                            fontSize: this.titleFontSize
                        }
                    },
                    series: [
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: this.titleFontSize/2
                            }
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: this.titleFontSize/2
                            }
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: this.titleFontSize/2
                            }
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: this.titleFontSize/2
                            }
                        },
                        {
                            radius: [outterRadius, innerRadius],
                            label: {
                                fontSize: this.titleFontSize/2
                            }
                        }
                    ]
                };
                this.echartsInstances.setOption(adapterOption);
                this.echartsInstances.resize();
            }
        }
    }
</script>

<style scoped lang="less">
    .stockTable{
        width: 100%;
        height: 100%;
    }
</style>