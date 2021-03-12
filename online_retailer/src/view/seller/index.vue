<template>
    <div class="seller">
        <sellerTable></sellerTable>
    </div>
</template>

<script>
    import sellerTable from "./components/sellerTable";
    export default {
        name: "index",
        components: {sellerTable}
    }
</script>

<style scoped lang="less">
.seller{
    width: 100%;
    height: 100%;
}
</style>