<template>
    <div>
        <data-statistics></data-statistics>
        <data-monitoring :tableData="tableData" class="monitoring"></data-monitoring>
    </div>
</template>

<script>
import DataStatistics from "../../../components/DataStatistics.vue";
import DataMonitoring from "../../../components/DataMonitoring.vue";
import { GetHistoryData } from "../../../api/api"

export default {
    components: { DataStatistics, DataMonitoring },
    mounted: async () => {
        // let historyData = await GetHistoryData({
        //   "dev": "LTU_bb38620dc4e710b0",
        //   "upperN": 10,
        //   "frozen_type": "SchFroz",
        //   "body": "-"
        // })
        // this.tableData = historyData
    },
    data() {
        const item = {
            time: "2016-05-02 12:00:00",
            name: "25.45",
        };
        return {
            tableData: [], //Array(10).fill(item),

            lineData: {
                "10:00": 30,
                "11:00": 20,
                "12:00": 50,
                "13:00": 60,
                "14:00": 70,
                "15:00": 90,
                "16:00": 55,
                "17:00": 33,
            },
        };
    },
};
</script>
