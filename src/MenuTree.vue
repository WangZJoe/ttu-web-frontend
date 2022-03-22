<template>
  <div style="background-color: #176AD5;">
    <template v-for="menu in this.menuData">
      <el-submenu :key="menu.index" :index="menu.index" v-if="menu.children">
          <template slot="title">
              <i :class="menu.icon"></i>
              <span slot="title" class="menu-items">{{menu.name}}</span>
          </template>
          <menu-tree :menuData="menu.children" class="menu-items"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.index" :index="menu.index" v-else>
          <i :class="menu.icon"></i>
          <span slot="title" class="menu-items">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
 
<script>
export default {
  props: ['menuData'],
  name: 'MenuTree'
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