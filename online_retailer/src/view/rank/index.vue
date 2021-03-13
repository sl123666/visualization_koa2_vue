<template>
    <div class="rank">
        <rankTable></rankTable>
    </div>
</template>

<script>
    import rankTable from './components/rankTable'
    export default {
        name: "index",
        components: {rankTable}
    }
</script>

<style scoped lang="less">
    .rank{
        width: 100%;
        height: 100%;
    }
</style>