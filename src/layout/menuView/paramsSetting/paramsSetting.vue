<template>
    <div class="params-setting">
        <div class="get-params card-box" v-loading="getLoading">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数读取</h3>
            </div>
            <div class="card-content">
                <div class="params-msg">
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/loudianbaohu.png" alt="">
                            <p class="text">漏电保护状态 : </p>
                        </div>
                        <div class="right-text">
                            <div class="fill"></div>
                            <div class="off-gap" v-if="leakage_protection_status == 0"></div>
                            <p class="gap-comp"  v-if="leakage_protection_status == 0">关闭</p>
                            <div class="on-gap" v-if="leakage_protection_status == 1"></div>
                            <p class="gap-comp"  v-if="leakage_protection_status == 1">开启</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/edingyuzhi.png" alt="">
                            <p class="text">额定漏电保护阈值 : </p>
                        </div>
                        <div class="right-text">
                            <div class="fill"></div>
                            <div class="value">{{rated_protection_current_threshold}}</div>
                            <p class="comp">mA</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/yuzhibaohu.png" alt="">
                            <p class="text">阈值保护动作时间 : </p>
                        </div>
                        <div class="right-text">
                            <div class="fill"></div>
                            <div class="value">{{threshold_protection_action_time}}</div>
                            <p class="comp">mS</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/edingloudian.png" alt="">
                            <p class="text">额定漏电保护差值 : </p>
                        </div>
                        <div class="right-text">
                            <div class="fill"></div>
                            <div class="value">{{rated_leakage_protection_difference}}</div>
                            <p class="comp">mA</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/yuzhibaohu.png" alt="">
                            <p class="text">插值保护动作时间 : </p>
                        </div>
                        <div class="right-text">
                            <div class="fill"></div>
                            <div class="value">{{interpolation_protection_action_time}}</div>
                            <p class="comp">mS</p>
                        </div>
                    </div>
                </div>
                <div class="params-button">
                    <el-button @click="getParams">参数读取</el-button>
                </div>
            </div>
        </div>
        <div class="clearance"></div>
        <div class="push-params card-box" v-loading="pushLoading">
            <div class="title">
                <div class="tip-color"></div>
                <h3>参数写入</h3>
            </div>
            <div class="card-content params-content">
                <div class="params-msg">
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/loudianbaohu.png" alt="">
                            <p class="text">漏电保护状态 : </p>
                        </div>
                        <div class="right-text">
                            <!-- <el-input placeholder="请输入"></el-input> -->
                            <el-select v-model="input_leakage_protection_statu" placeholder="请选择">
                                <el-option v-for="item in options" :label="item.label" :key="item.item" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/edingyuzhi.png" alt="">
                            <p class="text">额定漏电保护阈值 : </p>
                        </div>
                        <div class="right-text">
                            <el-input placeholder="请输入" type="number" v-model="input_rated_protection_current_threshold"></el-input>
                            <p class="comp">mA</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/yuzhibaohu.png" alt="">
                            <p class="text">阈值保护动作时间 : </p>
                        </div>
                        <div class="right-text">
                            <el-input placeholder="请输入" type="number" v-model="input_threshold_protection_action_time"></el-input>
                            <p class="comp">mS</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/edingloudian.png" alt="">
                            <p class="text">额定漏电保护差值 : </p>
                        </div>
                        <div class="right-text">
                            <el-input placeholder="请输入" type="number" v-model="input_rated_leakage_protection_difference"></el-input>
                            <p class="comp">mA</p>
                        </div>
                    </div>
                    <div class="row-params-status">
                        <div class="left-text">
                            <img src="../../../assets/img/yuzhibaohu.png" alt="">
                            <p class="text">插值保护动作时间 : </p>
                        </div>
                        <div class="right-text">
                            <el-input placeholder="请输入" type="number" v-model="input_interpolation_protection_action_time"></el-input>
                            <p class="comp">mS</p>
                        </div>
                    </div>
                </div>
                <div class="params-button">
                    <el-button @click="pushParams">上传</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {GetDevParams,SetDevParams} from "../../../api/api"

export default {
    props: ["curveDev"],
    data() {
        return {
            //漏电保护状态
            leakage_protection_status : '',
            //额定漏电保护阈值
            rated_protection_current_threshold : 0,
            //阈值保护动作时间
            threshold_protection_action_time : 0,
            //额定漏电保护差值
            rated_leakage_protection_difference : 0,
            //插值保护动作时间
            interpolation_protection_action_time: 0,
            //输入参数
            options:[{value:'1',label:'开启'},{value:'0',label:'关闭'}],
            input_leakage_protection_statu : '',
            input_rated_leakage_protection_difference: null,
            input_rated_protection_current_threshold : null,
            input_interpolation_protection_action_time : null,
            input_threshold_protection_action_time : null,
            getLoading : false,
            pushLoading : false
        };
    },
    methods: {
        //参数读取
        getParams() {
            this.getLoading = true;
            let params = this.getReadParams(this.curveDev)
            this.getDevParams(params)
            setTimeout(() => {
                this.getLoading = false;
            }, 1000);
        },
        //上传
        pushParams() {
            this.pushLoading = true;
            let params = this.getPushParams(this.curveDev)
            this.setDevParams(params)
            setTimeout(() => {
                this.pushLoading = false;
            }, 1000);
        },
        //获取数据参数的参数
        getReadParams(dev) {
            let params = {
                dev: dev,
             }
            this.rest();
            return params
        },
        getNumber(str){
            return Number(str)
        },
         //获取上传数据的参数
        getPushParams(dev) {
            let params = {
                dev: dev,
                leakage_protection_statu: this.input_leakage_protection_statu,
                rated_leakage_protection_difference: this.getNumber(this.input_rated_leakage_protection_difference),
                rated_protection_current_threshold: this.getNumber(this.input_rated_protection_current_threshold),
                interpolation_protection_action_time: this.getNumber(this.input_interpolation_protection_action_time),
                threshold_protection_action_time: this.getNumber(this.input_threshold_protection_action_time)

            }
            return params
        },
        //请求设备参数
        async getDevParams(params) {
            if(params){
                let res = await GetDevParams(params);
                if (res.data.code != 0) {
                    this.$message.error('参数读取请求失败');
                } else {
                    let data = res.data.data;
                    this.leakage_protection_status = data.leakage_protection_status,
                    this.rated_protection_current_threshold = data.rated_protection_current_threshold,
                    this.threshold_protection_action_time = data.threshold_protection_action_time,
                    this.rated_leakage_protection_difference = data.rated_leakage_protection_difference,
                    this.interpolation_protection_action_time = data.interpolation_protection_action_time
                }
            }
            this.getLoading = false
        },
        //设置设备参数
        async setDevParams(params) {
            if(params){
                let res = await SetDevParams(params);
                if (res.data.code != 0) {
                    this.$message.error('上传请求失败');
                } else {
                    console.log(res.data)
                    // let data = res.data.data;
                    // this.leakage_protection_status = data.leakage_protection_status,
                    // this.rated_protection_current_threshold = data.rated_protection_current_threshold,
                    // this.threshold_protection_action_time = data.threshold_protection_action_time,
                    // this.rated_leakage_protection_difference = data.rated_leakage_protection_difference,
                    // this.interpolation_protection_action_time = data.interpolation_protection_action_time
                }
            }
            this.pushLoading = false
        },
        //初始化数据
        rest() {
            this.leakage_protection_status = 0,
            this.rated_protection_current_threshold = 0,
            this.threshold_protection_action_time = 0,
            this.rated_leakage_protection_difference = 0,
            this.interpolation_protection_action_time = 0,
            this.input_leakage_protection_statu = '' ,
            this.input_rated_leakage_protection_difference = null,
            this.input_rated_protection_current_threshold = null,
            this.input_interpolation_protection_action_time = null,
            this.input_threshold_protection_action_time = null
        }
    },
    watch: {
        //设备切换重新请求数据
        curveDev: {
            immediate: true,
            handler(newVal) {
                this.$emit('requstStatus', true);
                let params = this.getReadParams(newVal);
                this.getDevParams(params);
                setTimeout(() => {
                    this.$emit('requstStatus', false);
                }, 500);
            }
        },
    }
};

</script>
<style lang="scss">
@import "./paramsSetting.scss";
</style>