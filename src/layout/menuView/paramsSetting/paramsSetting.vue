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
              <div class="loudianbaohu img"></div>
              <p class="text">漏电保护状态 :</p>
            </div>
            <div class="right-text switch-text">
              <div class="off-gap" v-if="leakage_protection_status == 0"></div>
              <p class="gap-comp" v-if="leakage_protection_status == 0">关闭</p>
              <div class="on-gap" v-if="leakage_protection_status == 1"></div>
              <p class="gap-comp" v-if="leakage_protection_status == 1">开启</p>
            </div>
          </div>
          <div class="row-params-status">
            <div class="left-text">
              <div class="edingyuzhi img"></div>
              <p class="text">额定漏电保护阈值 :</p>
            </div>
            <div class="right-text">
              <div class="value">
                {{ rated_protection_current_threshold }}
              </div>
              <p class="comp">mA</p>
            </div>
          </div>
          <div class="row-params-status">
            <div class="left-text">
              <div class="yuzhibaohu img"></div>
              <p class="text">阈值保护动作时间 :</p>
            </div>
            <div class="right-text">
              <div class="value">
                {{ threshold_protection_action_time }}
              </div>
              <p class="comp">mS</p>
            </div>
          </div>
          <div class="row-params-status">
            <div class="left-text">
              <div class="edingloudian img"></div>
              <p class="text">额定漏电保护差值 :</p>
            </div>
            <div class="right-text">
              <div class="value">
                {{ rated_leakage_protection_difference }}
              </div>
              <p class="comp">mA</p>
            </div>
          </div>
          <div class="row-params-status">
            <div class="left-text">
              <div class="yuzhibaohu img"></div>
              <p class="text">插值保护动作时间 :</p>
            </div>
            <div class="right-text">
              <div class="value">
                {{ interpolation_protection_action_time }}
              </div>
              <p class="comp">mS</p>
            </div>
          </div>
        </div>
        <div class="params-button left-button">
          <el-button @click="getParams(true)">参数读取</el-button>
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
        <div class="params-msg right-msg">
          <el-form
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
            label-width="200px"
            class="demo-ruleForm"
          >
            <el-form-item label="漏电保护状态" prop="loudianbaohu">
              <div class="form-left" slot="label">
                <div class="loudianbaohu img"></div>
                <p class="text">漏电保护状态 :</p>
              </div>
              <el-select
                v-model="ruleForm.loudianbaohu"
                placeholder="请选择"
                style="width: 80%"
              >
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :key="item.item"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="额定漏电保护阈值" prop="edingyuzhi">
              <div class="form-left" slot="label">
                <div class="edingyuzhi img"></div>
                <p class="text">额定漏电保护阈值 :</p>
              </div>
              <el-input
                placeholder="请输入"
                type="number"
                v-model="ruleForm.edingyuzhi"
                style="width: 80%"
              ></el-input>
              <p class="comp">mA</p>
            </el-form-item>
            <el-form-item label="阈值保护动作时间" prop="yuzhibaohu">
              <div class="form-left" slot="label">
                <div class="edingyuzhi img"></div>
                <p class="text">阈值保护动作时间 :</p>
              </div>
              <el-input
                placeholder="请输入"
                type="number"
                style="width: 80%"
                v-model="ruleForm.yuzhibaohu"
              ></el-input>
              <p class="comp">mS</p>
            </el-form-item>
            <el-form-item label="额定漏电保护差值" prop="edingloudian">
              <div class="form-left" slot="label">
                <div class="edingyuzhi img"></div>
                <p class="text">额定漏电保护差值 :</p>
              </div>
              <el-input
                placeholder="请输入"
                type="number"
                style="width: 80%"
                v-model="ruleForm.edingloudian"
              ></el-input>
              <p class="comp">mA</p>
            </el-form-item>
            <el-form-item label="插值保护动作时间" prop="chazhibaohu">
              <div class="form-left" slot="label">
                <div class="edingyuzhi img"></div>
                <p class="text">插值保护动作时间 :</p>
              </div>
              <el-input
                placeholder="请输入"
                type="number"
                style="width: 80%"
                v-model="ruleForm.chazhibaohu"
              ></el-input>
              <p class="comp">mS</p>
            </el-form-item>
          </el-form>
        </div>
        <div class="params-button right-button">
          <el-button @click="pushParams('ruleForm')">上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDevParams, SetDevParams } from "../../../api/api";

export default {
  props: ["curveDev"],
  data() {
    return {
      //漏电保护状态
      leakage_protection_status: "",
      //额定漏电保护阈值
      rated_protection_current_threshold: 0,
      //阈值保护动作时间
      threshold_protection_action_time: 0,
      //额定漏电保护差值
      rated_leakage_protection_difference: 0,
      //插值保护动作时间
      interpolation_protection_action_time: 0,
      //输入参数
      options: [
        { value: "1", label: "开启" },
        { value: "0", label: "关闭" },
      ],
      getLoading: false,
      pushLoading: false,
      ruleForm: {
        loudianbaohu: "",
        edingloudian: null,
        edingyuzhi: null,
        chazhibaohu: null,
        yuzhibaohu: null,
      },
      //校验规则
      rules: {
        edingyuzhi: [
          {
            required: true,
            message: "请输入额定漏电保护阈值",
            trigger: "blur",
          },
        ],
        loudianbaohu: [
          {
            required: true,
            message: "请选择漏电保护状态",
            trigger: "blur",
          },
        ],
        yuzhibaohu: [
          {
            required: true,
            message: "请选择阈值保护动作时间",
            trigger: "blur",
          },
        ],
        edingloudian: [
          {
            required: true,
            message: "请选择额定漏电保护差值",
            trigger: "blur",
          },
        ],
        chazhibaohu: [
          {
            required: true,
            message: "请选差值保护动作时间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //参数读取
    getParams(click) {
      this.getLoading = true;
      setTimeout(() => {
        let params = this.getReadParams(this.curveDev);
        this.getDevParams(params, click);
        this.getLoading = false;
      }, 1000);
    },
    //上传
    pushParams(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.pushLoading = true;
          setTimeout(() => {
            let params = this.getPushParams(this.curveDev);
            this.setDevParams(params);
            this.pushLoading = false;
          }, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取数据参数的参数
    getReadParams(dev) {
      let params = {
        dev: dev,
      };
      this.restRead();
      return params;
    },
    getNumber(str) {
      return Number(str);
    },
    //获取上传数据的参数
    getPushParams(dev) {
      let params = {
        dev: dev,
        leakage_protection_statu: this.ruleForm.loudianbaohu,
        rated_leakage_protection_difference: this.getNumber(
          this.ruleForm.edingloudian
        ),
        rated_protection_current_threshold: this.getNumber(
          this.ruleForm.edingyuzhi
        ),
        interpolation_protection_action_time: this.getNumber(
          this.ruleForm.chazhibaohu
        ),
        threshold_protection_action_time: this.getNumber(
          this.ruleForm.yuzhibaohu
        ),
      };
      this.restPush();
      return params;
    },
    //请求设备参数
    async getDevParams(params, click) {
      if (params) {
        let res = await GetDevParams(params);
        if (res.data.code != 0) {
          this.$message.error("参数读取失败");
        } else {
          //判断是否手动读取
          if (click) {
            this.$message.success("参数读取成功");
          }
          let data = res.data.data;
          (this.leakage_protection_status = data.leakage_protection_status),
            console.log(this.leakage_protection_status);
          (this.rated_protection_current_threshold =
            data.rated_protection_current_threshold),
            (this.threshold_protection_action_time =
              data.threshold_protection_action_time),
            (this.rated_leakage_protection_difference =
              data.rated_leakage_protection_difference),
            (this.interpolation_protection_action_time =
              data.interpolation_protection_action_time);
        }
      }
      this.getLoading = false;
    },
    //设置设备参数
    async setDevParams(params) {
      if (params) {
        let res = await SetDevParams(params);
        if (res.data.code != 0) {
          this.$message.error("上传失败");
        } else {
          console.log(res.data);
          this.$message.success("上传成功");
          // let data = res.data.data;
          // this.leakage_protection_status = data.leakage_protection_status,
          // this.rated_protection_current_threshold = data.rated_protection_current_threshold,
          // this.threshold_protection_action_time = data.threshold_protection_action_time,
          // this.rated_leakage_protection_difference = data.rated_leakage_protection_difference,
          // this.interpolation_protection_action_time = data.interpolation_protection_action_time
        }
      }
      this.pushLoading = false;
    },
    //初始化读取数据
    restRead() {
      (this.leakage_protection_status = 0),
        (this.rated_protection_current_threshold = 0),
        (this.threshold_protection_action_time = 0),
        (this.rated_leakage_protection_difference = 0),
        (this.interpolation_protection_action_time = 0);
    },
    //初始化上传数据
    restPush() {
      this.ruleForm = {
        loudianbaohu: "",
        edingloudian: null,
        edingyuzhi: null,
        chazhibaohu: null,
        yuzhibaohu: null,
      };
    },
  },
  watch: {
    //设备切换重新请求数据
    curveDev: {
      immediate: true,
      handler(newVal) {
        this.$emit("requstStatus", true);
        let params = this.getReadParams(newVal);
        this.restPush();
        this.getDevParams(params);
        setTimeout(() => {
          this.$emit("requstStatus", false);
        }, 500);
      },
    },
  },
};
</script>
<style lang="scss">
@import "./paramsSetting.scss";
</style>
