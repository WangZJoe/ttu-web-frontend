<template>
    <div class="date-pick-search">
        <el-date-picker v-model="dateVal" @change="changeTime" :type="rangeType" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
            dateVal: new Date(),
        };
    },
    computed: {
        rangeType() {
            if (this.dateType == "日") {
                return "date";
            } else if (this.dateType == "周") {
                return "week";
            } else if (this.dateType == "月") {
                return "month";
            } else {
                return "year"
            }
        },
    },
    methods: {
        changeTime(value) {
            let dates = {
                value: value,
                type: this.dateType
            }
            this.$emit('getTime', dates);
        }
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.date-pick-search {
    padding: 0 0 12px 12px;
    display: flex;
    flex-direction: row-reverse;
    .el-date-editor {
        margin-left: 18px;
    }
}
</style>
