
<style>
  @import './main.scss';
</style>
<template>
  <div class="index">
    <el-container>
        <el-header>
            <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#2a303c"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">记录</el-menu-item>
            <el-submenu index="2">
                <template slot="title">日期归档</template>
                <el-menu-item index="2-1">2015-1</el-menu-item>
                <el-menu-item index="2-2">2015-2</el-menu-item>
                <el-menu-item index="2-3">2015-3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            </el-menu>
        </el-header>
        <el-card class="box-card" v-for="k in 5" :key="k">
            <div slot="header" class="clearfix">
                <span>撒大大</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'text-editor',
    data () {
        return {
            spinShow: true
        };
    },
    methods: {
        getMenu() {
            this.request('getMenue', {}, true).then(res => {
                console.log(res);
            })
        }
    },
    mounted () {
        this.getMenu();
    }
};
</script>
