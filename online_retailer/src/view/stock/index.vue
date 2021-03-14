<template>
    <div class="stock">
        <stockTable></stockTable>
    </div>
</template>

<script>
    import stockTable from "./components/stockTable";
    export default {
        name: "index",
        components: {stockTable}
    }
</script>

<style scoped lang="less">
    .stock{
        width: 100%;
        height: 100%;
    }
</style>