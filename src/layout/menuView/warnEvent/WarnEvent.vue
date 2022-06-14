<template>
    <div class="warn-events-book">
        <date-pick-search @getTime="getTime"></date-pick-search>
        <div class="card-box">
            <div class="table-body">
                <el-table
                    :data="showData"
                    border
                    height="100%"
                    :header-cell-style="{
                        background: '#FBFBFD',
                        'text-align': 'center',
                        color: '#333333',
                    }"
                    :cell-style="{ 'text-align': 'center', color: '#585858' }"
                >
                    <el-table-column label="序号">
                        <template slot-scope="scope">
                            {{
                                scope.$index + (currentPage - 1) * pageSize + 1
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="alarm_type"
                        label="事件类型"
                        :filters="typeList"
                        :filter-method="handlerFilterChange"
                    >
                    </el-table-column>
                    <el-table-column prop="remark" label="事件说明">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template slot-scope="scope">
                            <div class="status">
                                <div
                                    :style="readed(scope.row.status)"
                                    class="fill"
                                ></div>
                                <p class="gap-comp">{{ scope.row.status }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="故障波形">
                        <template slot-scope="scope">
                            <el-button @click="showDetail(scope)" type="text"
                                >查看</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination
                :currentPage="currentPage"
                :pagerCount="tableData.length"
                :pageSize="pageSize"
                @changePager="changePager"
            ></pagination>
        </div>
    </div>
</template>

<script>
import DatePickSearch from "../../../components/DatePickSearch.vue";
import { GetAlarmEvent } from "../../../api/api";
import Pagination from "../../../components/Pagination.vue";

export default {
    components: { DatePickSearch, Pagination },
    props: ["curveDev"],
    data() {
        return {
            //表格数据
            tableData: [],
            //表格显示数据
            showData: [],
            //类型过滤器
            typeList: [],
            //表格当前页面
            currentPage: 1,
            //页面大小
            pageSize: 14,
            //开始 结束时间
            start_time: this.$moment().format("YYYY-MM-DD"),
            end_time: this.$moment().add(1, "days").format("YYYY-MM-DD"),
        };
    },
    methods: {
        //获取告警事件数据参数
        getAlarmDataParams(dev) {
            let params = {
                dev: dev,
                start_time: this.start_time,
                end_time: this.end_time,
            };
            this.rest();
            return params;
        },
        //请求告警事件数据
        async getAlarmDatas(params) {
            if (params) {
                let res = await GetAlarmEvent(params);
                if (res.data.code != 0) {
                    this.$message.error("告警事件数据请求失败");
                } else {
                    let data = res.data.data.alarm;
                    this.tableData = data;
                    this.typeFilter();
                    this.showData = this.tableData.slice(0, this.pageSize);
                }
            }
        },
        //初始化数据
        rest() {
            this.tableData = [];
            this.showData = [];
        },
        //日期选择切换查询历史数据
        getTime(time) {
            if (time.type == "日") {
                this.start_time = this.$moment(time.value).format("YYYY-MM-DD");
                this.end_time = this.$moment(time.value)
                    .add(1, "days")
                    .format("YYYY-MM-DD");
            } else if (time.type == "周") {
                this.start_time = this.$moment(time.value)
                    .startOf("week")
                    .add(1, "days")
                    .format("YYYY-MM-DD");
                this.end_time = this.$moment(time.value)
                    .endOf("week")
                    .add(2, "days")
                    .format("YYYY-MM-DD");
            } else if (time.type == "月") {
                this.start_time = this.$moment(time.value)
                    .startOf("month")
                    .format("YYYY-MM-DD");
                this.end_time = this.$moment(time.value)
                    .add(1, "months")
                    .startOf("month")
                    .format("YYYY-MM-DD");
            } else if (time.type == "年") {
                this.start_time = this.$moment(time.value)
                    .startOf("year")
                    .format("YYYY-MM-DD");
                this.end_time = this.$moment(time.value)
                    .add(1, "years")
                    .startOf("year")
                    .format("YYYY-MM-DD");
            }
            this.$emit("requstStatus", true);
            let params = this.getAlarmDataParams(this.curveDev);
            this.getAlarmDatas(params);
            setTimeout(() => {
                this.$emit("requstStatus", false);
            }, 500);
        },
        //事件类型列过滤器
        typeFilter() {
            var list = [
                ...new Set(this.tableData.map((item) => item.alarm_type)),
            ];
            this.typeList = list.reduce((types, item, index) => {
                types.push({
                    text: item,
                    value: index,
                });
                return types;
            }, []);
        },
        handlerFilterChange(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },
        //状态列格式
        readed(status) {
            if (status === "已读") {
                return {
                    width: "10px",
                    height: "10px",
                    background: "#C8C8C8",
                    "border-radius": "50%",
                    margin: "auto 20px auto 0",
                };
            } else {
                return {
                    width: "10px",
                    height: "10px",
                    background: "#FFC95D",
                    "border-radius": "50%",
                    margin: "auto 20px auto 0",
                };
            }
        },
        //查看按钮跳转故障波形界面
        showDetail(scope) {
            this.$emit("changeToErrorStatus", scope.$index);
            // this.$router.push({
            //     path: '/error-state?currentTabComponent=error-state',
            //     query: {
            //         dev: this.curveDev,
            //         time: scope.row.time,
            //     }
            // });
        },
        //切换页面
        changePager(newPage) {
            this.currentPage = newPage;
            let min = (newPage - 1) * this.pageSize,
                max =
                    newPage * this.pageSize > this.tableData.length
                        ? this.tableData.length
                        : newPage * this.pageSize;
            this.showData = this.tableData.slice(min, max);
        },
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit("requstStatus", true);
                let params = this.getAlarmDataParams(newVal);
                this.getAlarmDatas(params);
                setTimeout(() => {
                    this.$emit("requstStatus", false);
                }, 500);
            },
        },
    },
};
</script>
<style lang="scss">
@import "./WarnEvent.scss";
</style>