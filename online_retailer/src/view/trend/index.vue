<template>
    <div class="trend">
        <trendTable></trendTable>
    </div>
</template>

<script>
    import trendTable from "./components/trendTable";
    export default {
        name: "index",
        components: {trendTable}
    }
</script>

<style scoped lang="less">
.trend{
    width: 100%;
    height: 100%;
}
</style>