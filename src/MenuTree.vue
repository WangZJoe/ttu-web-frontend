<template>
  <div style="background-color: #176AD5;">
    <el-menu @select="handleSelect">
      <el-submenu v-for="menu in this.menuData" :key="menu.model" :index="menu.model">
        <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">{{menu.model}}</span>
        </template>
        <el-menu-item v-for="cons in menu.body" :key="cons.dev" :index="cons.dev">
          <i class="el-icon-document"></i>
          <span slot="title">{{cons.dev}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
 
<script>
export default {
  props: ['menuData','currentDev'],
  name: 'MenuTree',
  methods:{
    handleSelect(key){
      this.$emit('SelectDev',key)
    }
  }
}
</script>

<style>
.menu-items{
  color: white;
  font-size: 18px;
  font-family: 'Source Han Sans CN-Regular, Source Han Sans CN';
  font-weight: 400;
}
</style>