<template>
    <div class="warn-events-book">
        <date-pick-search @getTime="getTime"></date-pick-search>
        <div class="card-box">
            <pagination :currentPage="currentPage" :pagerCount="200" @changePager="changePager"></pagination>
            <div class="table-body">
                <el-table :data="tableData" border height="100%" :header-cell-style="{background:'#FBFBFD', 'text-align':'center', color:'#333333'}"
                          :cell-style="{'text-align':'center', color:'#585858'}">
                    <el-table-column label="序号">
                        <template slot-scope="scope"> {{scope.$index+1}} </template>
                    </el-table-column>
                    <el-table-column prop="time" label="时间">
                    </el-table-column>
                    <el-table-column prop="alarm_type" label="事件类型">
                    </el-table-column>
                    <el-table-column prop="remark" label="事件说明">
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                    </el-table-column>
                    <el-table-column label="故障波形">
                        <template slot-scope="scope">
                            <el-button @click="showDetail(scope)" type="text">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import DatePickSearch from "../../../components/DatePickSearch.vue";
import { GetAlarmEvent } from "../../../api/api"
import Pagination from "../../../components/Pagination.vue"

export default {
    components: { DatePickSearch , Pagination},
    props: ["curveDev"],
    data() {
        return {
            //表格数据
            tableData: [],

            //表格当前页面
            currentPage:1,

            //开始 结束时间
            // start_time: this.$moment().format('YYYY-MM-DD'),
            start_time: "2022-04-04",
            // end_time: this.$moment().format('YYYY-MM-DD'),
            end_time: "2022-04-24"
        };
    },
    methods: {
        //获取告警事件数据参数
        getAlarmDataParams(dev) {
            let params = {
                dev: dev,
                start_time: this.start_time,
                end_time: this.end_time
            }
            this.rest();
            return params
        },
        //请求告警事件数据
        async getAlarmDatas(params) {
            if (params) {
                let res = await GetAlarmEvent(params);
                // console.log(res.data)
                if (res.data.code != 0) {
                    this.$message.error('告警事件数据请求失败');
                } else {
                    let data = res.data.data.alarm;
                    // console.log(data)
                    this.tableData = data;
                }
            }
        },
        //初始化数据
        rest() {
            this.tableData = [];
        },
        //日期选择切换查询历史数据
        getTime(val) {
            this.start_time = val[0];
            this.end_time = val[1];
            this.$emit('requstStatus', true);
            let params = this.getAlarmDataParams(this.curveDev);
            this.getAlarmDatas(params);
            setTimeout(() => {
                this.$emit('requstStatus', false);
            }, 500);
        },
        //查看按钮跳转故障波形界面
        showDetail(scope) {
            this.$parent.changeTopMenu('error-state');
            // this.$router.push({
            //     path: '/error-state?currentTabComponent=error-state',
            //     query: {
            //         dev: this.curveDev,
            //         time: scope.row.time,
            //     }
	        // });
        },
        //切换页面
        changePager(newPage){
            this.currentPage=newPage
            //数据逻辑
        }
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let params = this.getAlarmDataParams(newVal);
                this.getAlarmDatas(params);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    }
};
</script>
<style lang="scss">
@import "./WarnEvent.scss";
</style>