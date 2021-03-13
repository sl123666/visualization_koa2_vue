<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="to_view(1)">商家销量排行</button>
        <button @click="to_view(2)">销量趋势分析</button>
        <button @click="to_view(3)">商家地图分析</button>
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
}
</style>
