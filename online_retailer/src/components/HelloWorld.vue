<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="to_view(1)">商家销量排行</button>
        <button @click="to_view(2)">销量趋势分析</button>
        <button @click="to_view(3)">商家地图分析</button>
        <button @click="to_view(4)">商家销量排行</button>
        <button @click="to_view(5)">热销商品占比</button>
        <button @click="to_view(6)">库存销量分析</button>
        <button class="allData" @click="$router.push(`/screenPage`)">系统总览</button>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
          msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        to_view(type){
            switch (type) {
                case 1:
                    this.$router.push(`/seller`);
                    break;
                case 2:
                    this.$router.push(`/trend`);
                    break;
                case 3:
                    this.$router.push(`/map`);
                    break;
                case 4:
                    this.$router.push(`/rank`);
                    break;
                case 5:
                    this.$router.push(`/hot`);
                    break;
                case 6:
                    this.$router.push(`/stock`);
                    break;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
    h1{
        color: pink;
    }
    .allData{
        margin-left: 50px;
        background: #9a6e3a;
        border: 0;
        border-radius: 5px;
        width: 150px;
        height: 40px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
    }
}

</style>
