<template>
  <div @click="onPagerClick" class="table-pager">
    <el-button class="d-arrow-left" type="button" :disabled="isMin"
      ><i class="el-icon-d-arrow-left"></i
    ></el-button>
    <el-button class="arrow-left" type="button" :disabled="isMin"
      ><i class="el-icon-arrow-left"></i
    ></el-button>
    <span>第</span>
    <input
      class="pager-input"
      v-model="inputPage"
      @input="numberChange()"
      @keyup.enter="keyupEnter()"
      type="number"
    />
    <span>共{{ pageCount }}页</span>
    <el-button class="arrow-right" type="button" :disabled="isMax"
      ><i class="el-icon-arrow-right"></i
    ></el-button>
    <el-button class="d-arrow-right" type="button" :disabled="isMax"
      ><i class="el-icon-d-arrow-right"></i
    ></el-button>
    <span
      >共<span style="color: #19807c">{{ pagerCount }}</span
      >条记录</span
    >
  </div>
</template>

<script>
export default {
  props: ["currentPage", "pagerCount", "pageSize"],
  data() {
    return {
      //当前页面
      inputPage: 1,
      //页面总数
      pageCount: 1,
      //翻页页数
      pagerCountOffset: 5,
      //可否向左翻页
      isMin: Boolean,
      //可否向右翻页
      isMax: Boolean,
    };
  },
  mounted: function () {
    this.rest();
  },
  computed: {},
  methods: {
    //初始化
    rest(page = this.currentPage, count = this.pagerCount) {
      this.inputPage = page;
      this.pageCount = Math.ceil(count / this.pageSize);
      this.isMin = this.inputPage == 1;
      this.isMax = this.inputPage == this.pageCount;
    },
    //输入限制
    numberChange() {
      //数字类型转换
      let page = this.inputPage;
      if (page < 1) this.inputPage = 1;
      else this.inputPage = Math.min(this.inputPage, this.pageCount);
    },
    //输入页面跳转
    keyupEnter() {
      this.$emit("changePager", this.inputPage);
    },
    //按钮页面跳转
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName == "I" || target.tagName == "BUTTON") {
        let newPage = currentPage;
        const pageCount = this.pageCount;
        const currentPage = this.currentPage;
        const pagerCountOffset = this.pagerCountOffset;

        if (target.className.indexOf("left") !== -1) {
          if (target.className.indexOf("d") !== -1) {
            newPage = currentPage - pagerCountOffset;
          } else {
            newPage = currentPage - 1;
          }
        } else {
          if (target.className.indexOf("d") !== -1) {
            newPage = currentPage + pagerCountOffset;
          } else {
            newPage = currentPage + 1;
          }
        }

        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }

          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        if (newPage !== currentPage) {
          this.$emit("changePager", newPage);
        }
      }
    },
  },
  watch: {
    //页面变化
    currentPage: {
      immediate: true,
      handler(newCount) {
        this.rest(newCount);
      },
    },
    //总记录变化
    pagerCount: {
      immediate: true,
      handler(newCount) {
        this.rest(1, newCount);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table-pager {
  padding: 3px 22px 5px 10px;
  height: 35px;
  display: flex;
  display: -webkit-flex;
  align-items: center;

  .el-button {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 10px;
    margin: 1px;
    border-color: #fff;
  }

  span {
    font-size: 14px;
    font-family: "Source Han Sans CN-Normal, Source Han Sans CN";
    font-weight: 400;
  }

  .pager-input {
    text-align: center;
    font-family: "Source Han Sans CN-Normal, Source Han Sans CN";
    font-weight: 400;
    width: 30px;
    height: 30px;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #d5d5d5;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}

.el-icon-arrow-left {
  width: 10px;
  height: 20px;
  content: url(../assets/img/arrow-left.png);
}

.el-icon-d-arrow-left {
  width: 10px;
  height: 20px;
  content: url(../assets/img/d-arrow-left.png);
}

.el-icon-arrow-right {
  width: 10px;
  height: 20px;
  content: url(../assets/img/arrow-right.png);
}

.el-icon-d-arrow-right {
  width: 10px;
  height: 20px;
  content: url(../assets/img/d-arrow-right.png);
}
</style>
