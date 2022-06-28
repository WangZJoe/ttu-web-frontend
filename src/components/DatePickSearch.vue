<template>
  <div class="date-pick-search">
    <el-date-picker
      v-model="dateVal"
      @change="changeTime"
      :type="rangeType"
      :format="dateFormat"
      :picker-options="{ firstDayOfWeek: 1 }"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <el-radio-group fill="#19807C" v-model="dateType" @change="dateTypeChange">
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
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    dateFormat() {
      if (this.dateType == "日") {
        return "yyyy年M月d日";
      } else if (this.dateType == "周") {
        return this.startDate + "-" + this.endDate;
      } else if (this.dateType == "月") {
        return "yyyy年M月";
      } else {
        return "yyyy年";
      }
    },
    rangeType() {
      if (this.dateType == "日") {
        return "date";
      } else if (this.dateType == "周") {
        return "week";
      } else if (this.dateType == "月") {
        return "month";
      } else {
        return "year";
      }
    },
  },
  methods: {
    changeTime(value) {
      this.startDate = this.$moment(this.dateVal)
        .startOf("week")
        .add(1, "days")
        .format("YYYY年M月D日");
      this.endDate = this.$moment(this.dateVal)
        .endOf("week")
        .add(1, "days")
        .format("YYYY年M月D日");
      let dates = {
        value: value,
        type: this.dateType,
      };
      this.$emit("getTime", dates);
    },
    dateTypeChange(value) {
      let dates = {
        value: this.dateVal,
        type: value,
      };
      this.$emit("getTime", dates);
    },
  },
  watch: {
    dateType(newVal) {
      let dom = document.querySelector(".el-date-editor");
      if (newVal == "周") {
        this.startDate = this.$moment(this.dateVal)
          .startOf("week")
          .add(1, "days")
          .format("YYYY年M月D日");
        this.endDate = this.$moment(this.dateVal)
          .endOf("week")
          .add(1, "days")
          .format("YYYY年M月D日");
        dom.style.width = 260 + "px";
      } else {
        dom.style.width = 220 + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.date-pick-search {
  padding: 0 0 10px 12px;
  display: flex;
  flex-direction: row-reverse;
  .el-date-editor {
    margin-left: 18px;
  }
  .el-textarea__inner,
  .el-input__inner {
    background: transparent !important;
  }
  .el-radio-button__inner {
    background: #00000000 !important;
  }
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    color: #f7f7f7 !important;
    background-color: rgb(25, 128, 124) !important;
    border-color: rgb(25, 128, 124) !important;
  }
}
</style>
