<template>
  <div class="container">
    <div class="header">
      <div class="left-title">
        <img src="../../assets/img/title-img.png" alt="" />
        <span class="main-title">低压台区漏电管家</span>
      </div>
      <div class="tabs">
        <el-menu
          :default-active="currentTabComponent"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#19807C"
          @select="changeTopMenu"
        >
          <el-menu-item index="real-time-monitoring"
            ><img :src="realWatch" alt="" /><span>实时监测</span></el-menu-item
          >
          <el-menu-item index="history-standing-book"
            ><img :src="historyData" alt="" /><span
              >历史台账</span
            ></el-menu-item
          >
          <el-menu-item index="warn-event"
            ><img :src="warningEvent" alt="" /><span
              >告警事件</span
            ></el-menu-item
          >
          <el-menu-item index="error-state"
            ><img :src="errorStatus" alt="" /><span
              >故障波形</span
            ></el-menu-item
          >
          <el-menu-item
            index="params-setting"
            v-if="!curveDev.startsWith('LTU')"
            ><img :src="paramsSetting" alt="" /><span
              >参数整定</span
            ></el-menu-item
          >
          <el-menu-item index="leakage-analysis"
            ><img :src="leakageAnalysis" alt="" /><span
              >漏电分析</span
            ></el-menu-item
          >
        </el-menu>
      </div>
      <div class="right-compoment">
        <div class="time">
          <div>{{ nowDate }}</div>
          <div>{{ nowHMS }}</div>
        </div>
        <el-dropdown trigger="click" style="margin-right: 30px">
          <div class="msg"></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息提醒1</el-dropdown-item>
            <el-dropdown-item>消息提醒2</el-dropdown-item>
            <el-dropdown-item>消息提醒3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="setting"></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="view-body">
      <div class="left-menu" v-loading="loading">
        <div class="center-title">
          <span class="position-title">{{ station }}</span>
        </div>
        <el-menu
          background-color="#006F6B"
          text-color="#FFFFFF"
          :default-active="curveDev"
          @select="handleSelect"
          active-text-color="#189E99FF"
        >
          <el-submenu
            v-for="menu in menuList"
            :key="menu.name"
            :index="menu.name + ''"
          >
            <template slot="title">
              <i
                :class="[
                  menu.icon == 0 ? 'el-icon-kaiguan' : 'el-icon-bianyaqi',
                ]"
              ></i>
              <span slot="title"
                >{{ menu.name }}({{ menu.online }}/{{ menu.total }})</span
              >
            </template>
            <el-menu-item
              v-for="cons in menu.device"
              :key="cons.dev"
              :index="cons.dev + ''"
              :class="[cons.online ? 'online' : 'off-line']"
            >
              <div class="circel"></div>
              <span slot="title">{{ cons.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right-body" v-loading="requstLoading">
        <router-view
          :curveDev="curveDev"
          :eventData="eventData"
          @requstStatus="requstStatus"
          @changeToErrorStatus="changeToErrorStatus"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDeviceList } from "../../api/api";
export default {
  created: async function () {
    //获取设备列表
    var res = await GetDeviceList();
    if (res.data.code != 0) {
      this.$message.error("设备列表获取失败");
    } else {
      this.station = res.data.data.station;
      let obj = res.data.data.group.find((obj) => {
        if (obj.device.length > 0) {
          return obj;
        }
      });
      this.curveDev = obj.device[0].dev;
      this.menuList = res.data.data.group;
      this.loading = false;
    }
    //右上时间定时器
    this.timer = window.setInterval(() => {
      this.nowDate = this.$moment().format("YYYY-MM-DD");
      this.nowHMS = this.$moment().format("HH:mm:ss");
    }, 100);
    //防止用户手动刷新网页 menu组件显示错误
    let curPath = this.$route.path;
    if (curPath.indexOf("realTime") != -1) {
      this.changeTopMenu("real-time-monitoring", null, null, true);
    } else if (curPath.indexOf("historyStandingBook") != -1) {
      this.changeTopMenu("history-standing-book", null, null, true);
    } else if (curPath.indexOf("warnEvent") != -1) {
      this.changeTopMenu("warn-event", null, null, true);
    } else if (curPath.indexOf("errorState") != -1) {
      this.changeTopMenu("error-state", null, null, true);
    } else if (curPath.indexOf("paramsSetting") != -1) {
      this.changeTopMenu("params-setting", null, null, true);
    } else if (curPath.indexOf("leakageAnalysis") != -1) {
      this.changeTopMenu("leakage-analysis", null, null, true);
    }
  },
  data() {
    return {
      //当前时间
      nowDate: this.$moment().format("YYYY-MM-DD"),
      nowHMS: this.$moment().format("HH:mm:ss"),
      //设备列表loading
      loading: true,
      //当前设备位置
      station: "",
      //当前选择的组件
      currentTabComponent: "real-time-monitoring",
      //当前选取设备
      curveDev: "",
      //侧边栏设备数据
      menuList: [
        {
          name: "线路终端",
          total: 4,
          online: 4,
          icon: "",
          device: [
            {
              dev: "LTU_bb38620dc4e710b0",
              name: "设备10b0",
              online: true,
              badge: 0,
            },
            {
              dev: "LTU_dfba6966bdd28141",
              name: "设备8141",
              online: true,
              badge: 0,
            },
            {
              dev: "LTU_7c0d5e2c7f832ccb",
              name: "设备2ccb",
              online: true,
              badge: 0,
            },
            {
              dev: "LTU_e21789ecb746d813",
              name: "设备d813",
              online: true,
              badge: 0,
            },
          ],
        },
        {
          name: "智能开关",
          total: 2,
          online: 2,
          icon: "",
          device: [
            {
              dev: "Switch_85df8af68ad778b9",
              name: "设备78b9",
              online: true,
              badge: 0,
            },
            {
              dev: "Switch_f422f2db428c764c",
              name: "设备764c",
              online: true,
              badge: 0,
            },
          ],
        },
      ],
      //请求加载loading
      requstLoading: true,
      //导航icon png
      png: ".png",
      //实时监测
      realWatch: require("../../assets/img/real-watch-on.png"),
      //历史数据
      historyData: require("../../assets/img/history-off.png"),
      //告警事件
      warningEvent: require("../../assets/img/warning-off.png"),
      //故障波形
      errorStatus: require("../../assets/img/error-off.png"),
      //参数整定
      paramsSetting: require("../../assets/img/params-off.png"),
      //漏电分析
      leakageAnalysis: require("../../assets/img/leakage-off.png"),
      //故障波形选中表格参数
      eventData: 0,
    };
  },
  methods: {
    //设置下拉菜单
    handleCommand(cmd) {
      if (cmd == "outLogin") {
        window.sessionStorage.removeItem("token");
        location.href = "login.html"; //location.href = "./login.html";两种写法都可以
      }
    },
    //切换设备
    handleSelect(devName) {
      this.curveDev = devName;
    },
    //切换导肮组件
    changeTopMenu(comName, indexPath, v, hasPath) {
      //hasPath 如果有该参数则不重新跳转路由
      this.currentTabComponent = comName;
      switch (comName) {
        case "real-time-monitoring":
          this.realWatch = require("../../assets/img/real-watch-on.png");
          this.historyData = require("../../assets/img/history-off.png");
          this.warningEvent = require("../../assets/img/warning-off.png");
          this.errorStatus = require("../../assets/img/error-off.png");
          this.paramsSetting = require("../../assets/img/params-off.png");
          this.leakageAnalysis = require("../../assets/img/leakage-off.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/realTime");
          }
          break;
        case "history-standing-book":
          this.realWatch = require("../../assets/img/real-watch-off.png");
          this.historyData = require("../../assets/img/history-on.png");
          this.warningEvent = require("../../assets/img/warning-off.png");
          this.errorStatus = require("../../assets/img/error-off.png");
          this.paramsSetting = require("../../assets/img/params-off.png");
          this.leakageAnalysis = require("../../assets/img/leakage-off.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/historyStandingBook");
          }
          break;
        case "warn-event":
          this.realWatch = require("../../assets/img/real-watch-off.png");
          this.historyData = require("../../assets/img/history-off.png");
          this.warningEvent = require("../../assets/img/warning-on.png");
          this.errorStatus = require("../../assets/img/error-off.png");
          this.paramsSetting = require("../../assets/img/params-off.png");
          this.leakageAnalysis = require("../../assets/img/leakage-off.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/warnEvent");
          }
          break;
        case "error-state":
          this.realWatch = require("../../assets/img/real-watch-off.png");
          this.historyData = require("../../assets/img/history-off.png");
          this.warningEvent = require("../../assets/img/warning-off.png");
          this.errorStatus = require("../../assets/img/error-on.png");
          this.paramsSetting = require("../../assets/img/params-off.png");
          this.leakageAnalysis = require("../../assets/img/leakage-off.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/errorState");
          }
          break;
        case "params-setting":
          this.realWatch = require("../../assets/img/real-watch-off.png");
          this.historyData = require("../../assets/img/history-off.png");
          this.warningEvent = require("../../assets/img/warning-off.png");
          this.errorStatus = require("../../assets/img/error-off.png");
          this.paramsSetting = require("../../assets/img/params-on.png");
          this.leakageAnalysis = require("../../assets/img/leakage-off.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/paramsSetting");
          }
          break;
        case "leakage-analysis":
          this.realWatch = require("../../assets/img/real-watch-off.png");
          this.historyData = require("../../assets/img/history-off.png");
          this.warningEvent = require("../../assets/img/warning-off.png");
          this.errorStatus = require("../../assets/img/error-off.png");
          this.paramsSetting = require("../../assets/img/params-off.png");
          this.leakageAnalysis = require("../../assets/img/leakage-on.png");
          if (hasPath) {
            return;
          } else {
            this.$router.push("/main/leakageAnalysis");
          }
          break;
      }
    },
    //组件请求状态loading
    requstStatus(val) {
      this.requstLoading = val;
    },
    //跳转故障波形界面
    changeToErrorStatus(val) {
      this.eventData = val;
      this.changeTopMenu("error-state");
    },
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
@import "./mainView.scss";
</style>
