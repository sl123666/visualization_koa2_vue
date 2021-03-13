<template>
    <div class="hot">
        <hotTable></hotTable>
    </div>
</template>

<script>
    import hotTable from "./components/hotTable";
    export default {
        name: "index",
        components: {hotTable}
    }
</script>

<style scoped lang="less">
    .hot{
        width: 100%;
        height: 100%;
    }
</style>