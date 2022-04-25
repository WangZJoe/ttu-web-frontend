<template>
    <div class="leakage-analysis">
        <div class="card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数读取</h3>
            </div>
            <div class="card-content">

            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数写入</h3>
            </div>
            <div class="card-content params-content">

            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数写入</h3>
            </div>
            <div class="card-content params-content">

            </div>
        </div>
        <div class="card-box">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数写入</h3>
            </div>
            <div class="card-content params-content">

            </div>
        </div>
    </div>
</template>

<script>
// import { GetDeviceHistoryData } from "../../../api/api"

export default {
    props: ["curveDev"],
    data() {
        return {
            //表格数据
            tableData: [],
            //页面loading
            getLoading: false,
            pushLoading: false,
            //漏电电流 时间
            leakageDatas: [],
            //x相电流 时间
            electricDatasA: [],
            electricDatasB: [],
            electricDatasC: [],
            //x相电压 时间
            voltageDatasA: [],
            voltageDatasB: [],
            voltageDatasC: [],
        };
    },
    methods: {
        //参数读取
        getParams() {
            this.getLoading = true;
            setTimeout(() => {
                this.getLoading = false;
            }, 1000);
        },
        //上传
        pushParams() {
            this.pushLoading = true;
            setTimeout(() => {
                this.pushLoading = false;
            }, 1000);
        }
        //获取历史设备数据参数
        // getHistoryDataParams(dev) {
        //     let params = {
        //         dev: dev,
        //         start_time: this.start_time,
        //         end_time: this.end_time,
        //         time_span_unit: this.time_span_unit,
        //         time_span_number: this.time_span_number,
        //     }
        //     this.rest();
        //     return params
        // },
        //请求历史台账数据
        // async getHistoryDatas(params) {
        //     if (params) {
        //         let res = await GetDeviceHistoryData(params);
        //         if (res.data.code != 0) {
        //             this.$message.error('设备数据请求失败');
        //             this.setDataCensusCharts();
        //         } else {
        //             let data = res.data.data;
        //             data.record.forEach(item => {
        //                 this.dataTimes.push(item.time);
        //                 this.leakageDatas.push(item.In_Avg);
        //                 this.electricDatasA.push(item.Ia);
        //                 this.electricDatasB.push(item.Ib);
        //                 this.electricDatasC.push(item.Ic);
        //                 this.voltageDatasA.push(item.Ua);
        //                 this.voltageDatasB.push(item.Ub);
        //                 this.voltageDatasC.push(item.Uc);
        //             });
        //             this.tableData = data.record;
        //             this.setDataCensusCharts();
        //         }
        //     }
        // },
        //初始化数据
        // rest() {
        //     this.tableData = [];
        //     this.leakageDatas = [];
        //     this.dataTimes = [];
        //     this.electricDatasA = [];
        //     this.electricDatasB = [];
        //     this.electricDatasC = [];
        //     this.voltageDatasA = [];
        //     this.voltageDatasB = [];
        //     this.voltageDatasC = [];
        // },
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                // let params = this.getHistoryDataParams(newVal);
                // this.getHistoryDatas(params);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    }
};
</script>
<style lang="scss">
@import "./leakageAnalysis.scss";
</style>