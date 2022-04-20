<template>
    <div class="date-pick-search">
        <el-date-picker
            v-model="dateVal"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
        >
        </el-date-picker>
        <el-radio-group fill="#19807C" v-model="dateType">
            <el-radio-button label="日"></el-radio-button>
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
            <el-radio-button label="年"></el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            dateType: "日",
            dateVal: "",
        };
    },
    methods: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.date-pick-search {
    padding: 12px 0 12px 12px;
    display: flex;
    flex-direction: row-reverse;
    .el-date-editor {
        margin-left: 18px;
    }
}
</style>
