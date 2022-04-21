<template>
    <div class="container">
        <div class="header">
            <div class="left-title">
                <span class="main-title">低压台区漏电管家</span>
            </div>
            <div class="tabs">
                <el-menu default-active="data-curve" class="el-menu-demo" mode="horizontal" active-text-color="#19807C" @select="changeTopMenu">
                    <el-menu-item index="data-curve">实时监测</el-menu-item>
                    <el-menu-item index="data-before">历史台账</el-menu-item>
                    <el-menu-item index="3">告警事件</el-menu-item>
                    <el-menu-item index="4">故障波形</el-menu-item>
                    <el-menu-item index="5">参数整定</el-menu-item>
                    <el-menu-item index="6">漏电分析</el-menu-item>
                </el-menu>
            </div>
            <div class="right-compoment">
                <el-dropdown>
                    <span>2022-03-20 15:12:55</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>消息提醒</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>参数设置</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="view-body">
            <div class="left-menu" v-loading="loading">
                <div class="center-title">
                    <span class="position-title">{{station}}</span>
                </div>
                <el-menu background-color="#006F6B" text-color="#FFFFFF" :default-active="defaultActive" @select="handleSelect" active-text-color="#ffd04b">
                    <el-submenu v-for="menu in menuList" :key="menu.name" :index="menu.name + ''">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">{{ menu.name }}({{menu.online}}/{{menu.total}})</span>
                        </template>
                        <el-menu-item v-for="cons in menu.device" :key="cons.dev" :index="cons.dev + ''" :class="[cons.online ? 'online' : 'off-line']">
                            <div class="circel"></div>
                            <span slot="title">{{ cons.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="right-body" v-loading="requstLoading">
                <component :is="currentTabComponent" :curveDev="curveDev" @requstStatus="requstStatus"></component>
            </div>
        </div>
    </div>
</template>

<script>
import DataCurve from "../tableView/dataCurve/DataCurve.vue";
import DataBefore from "../tableView/dataBefore/DataBefore.vue";
import { GetDeviceList } from "../../api/api";
export default {
    components: { DataCurve, DataBefore },
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
            this.defaultActive = obj.device[0].dev;
            this.curveDev = obj.device[0].dev;
            this.menuList = res.data.data.group;
            this.loading = false;
        }
    },
    data() {
        return {
            //设备列表loading
            loading: true,
            //当前设备位置
            station: "",
            //当前选择的组件
            currentTabComponent: "data-curve",
            //设备列表默认打开的子菜单
            defaultActive: "LTU_bb38620dc4e710b0",
            //当前选取设备
            curveDev: "",
            //侧边栏设备数据
            menuList: [{
                "name": "线路终端",
                "total": 4,
                "online": 4,
                "icon": "",
                "device": [
                    {
                        "dev": "LTU_bb38620dc4e710b0",
                        "name": "设备10b0",
                        "online": true,
                        "badge": 0
                    },
                    {
                        "dev": "LTU_dfba6966bdd28141",
                        "name": "设备8141",
                        "online": true,
                        "badge": 0
                    },
                    {
                        "dev": "LTU_7c0d5e2c7f832ccb",
                        "name": "设备2ccb",
                        "online": true,
                        "badge": 0
                    },
                    {
                        "dev": "LTU_e21789ecb746d813",
                        "name": "设备d813",
                        "online": true,
                        "badge": 0
                    }
                ]
            },
            {
                "name": "智能开关",
                "total": 2,
                "online": 2,
                "icon": "",
                "device": [
                    {
                        "dev": "Switch_85df8af68ad778b9",
                        "name": "设备78b9",
                        "online": true,
                        "badge": 0
                    },
                    {
                        "dev": "Switch_f422f2db428c764c",
                        "name": "设备764c",
                        "online": true,
                        "badge": 0
                    }
                ]
            }],
            //请求加载loading
            requstLoading: true,
        };
    },
    methods: {
        //切换设备
        handleSelect(devName) {
            this.curveDev = devName;
        },
        //切换导肮组件
        changeTopMenu(comName) {
            this.curveDev = this.defaultActive;
            this.currentTabComponent = comName;
        },
        //组件请求状态loading
        requstStatus(val) {
            this.requstLoading = val;
        }
    }

};
</script>
<style lang="scss">
@import "./mainView.scss";
</style>