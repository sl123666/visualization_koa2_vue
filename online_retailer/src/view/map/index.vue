<template>
    <div class="map">
        <mapTable></mapTable>
    </div>
</template>

<script>
    import mapTable from "./components/mapTable";
    export default {
        name: "index",
        components: {mapTable}
    }
</script>

<style scoped lang="less">
.map{
    width: 100%;
    height: 100%;
}
</style>