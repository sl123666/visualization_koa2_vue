<template>
    <div class="screen-container">
        <header>
            <span class="title">电商平台实时监控系统(总览)</span>
        </header>
        <article class="screen-body">
            <section class="screen-left">
                <div id="left-top" :class="{fullscreen:fullScreenStatus.trend}">
                    <!-- 销量趋势图表 -->
                    <trendTable ref="trend"></trendTable>
                    <div class="resize" @click="changeSize('trend')">
                        <span class="iconfont" :class="fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
                <div id="left-bottom" :class="{fullscreen:fullScreenStatus.seller}">
                    <!-- 商家销售金额图表 -->
                    <sellerTable ref="seller"></sellerTable>
                    <div class="resize" @click="changeSize('seller')">
                        <span class="iconfont" :class="fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
            </section>
            <section class="screen-middle">
                <div id="middle-top" :class="{fullscreen:fullScreenStatus.map}">
                    <!-- 商家分布图表 -->
                    <mapTable ref="map"></mapTable>
                    <div class="resize"  @click="changeSize('map')">
                        <span class="iconfont" :class="fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
                <div id="middle-bottom" :class="{fullscreen:fullScreenStatus.rank}">
                    <!-- 地区销量排行图表 -->
                    <rankTable ref="rank"></rankTable>
                    <div class="resize" @click="changeSize('rank')">
                        <span class="iconfont" :class="fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
            </section>
            <section class="screen-right">
                <div id="right-top" :class="{fullscreen:fullScreenStatus.hot}">
                    <!-- 热销商品占比图表 -->
                    <hotTable ref="hot"></hotTable>
                    <div class="resize"  @click="changeSize('hot')">
                        <span class="iconfont" :class="fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
                <div id="right-bottom" :class="{fullscreen:fullScreenStatus.stock}">
                    <!-- 库存销量分析图表 -->
                    <stockTable ref="stock"></stockTable>
                    <div class="resize" @click="changeSize('stock')">
                        <span class="iconfont" :class="fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt'"></span>
                    </div>
                </div>
            </section>
        </article>
    </div>
</template>

<script>
    import sellerTable from '../view/seller/components/sellerTable';
    import stockTable from '../view/stock/components/stockTable';
    import trendTable from '../view/trend/components/trendTable';
    import rankTable from '../view/rank/components/rankTable';
    import mapTable from '../view/map/components/mapTable';
    import hotTable from '../view/hot/components/hotTable';
    export default {
        name: "screenPage",
        data(){
            return{
                fullScreenStatus: {
                    trend: false,
                    seller: false,
                    map: false,
                    rank: false,
                    hot: false,
                    stock: false
                }
            }
        },
        components: {
            sellerTable, stockTable, trendTable, rankTable, mapTable, hotTable
        },
        methods: {
            changeSize(chartName){
                const targetValue = !this.fullScreenStatus[chartName];

                Object.keys(this.fullScreenStatus).forEach(item => {
                    this.fullScreenStatus[item] = false;
                });

                this.fullScreenStatus[chartName] = targetValue;
                this.$nextTick(() => {
                    this.$refs[chartName].screenAdapter();
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/font/iconfont.css";
    .screen-container {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        background-color: #161522;
        color: #fff;
        box-sizing: border-box;
        header{
            width: 100%;
            height: 64px;
            text-align: center;
            line-height: 64px;
        }
        .screen-body {
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 10px;
            .screen-left {
                height: 100%;
                width: 27.6%;
                #left-top {
                    height: 53%;
                    position: relative;
                }
                #left-bottom {
                    height: 31%;
                    margin-top: 25px;
                    position: relative;
                }
            }
            .screen-middle {
                height: 100%;
                width: 41.5%;
                margin-left: 1.6%;
                margin-right: 1.6%;
                #middle-top {
                    width: 100%;
                    height: 56%;
                    position: relative;
                }
                #middle-bottom {
                    margin-top: 25px;
                    width: 100%;
                    height: 28%;
                    position: relative;
                }
            }
            .screen-right {
                height: 100%;
                width: 27.6%;
                #right-top {
                    height: 46%;
                    position: relative;
                }
                #right-bottom {
                    height: 38%;
                    margin-top: 25px;
                    position: relative;
                }
            }
        }
    }
    .resize {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
    .fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        z-index: 9999;
    }
</style>