
<style>
  @import './main.scss';
    .list-con {
        padding: 0 20px;
    }
    .list-item{
        margin-top: 20px;
    }
    .plus-note{
        color: #fff;
        font-size: 26px;
        float: right;
        margin-top: 15px;
        cursor: pointer;
    }
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
            <el-menu-item index="1" @click="toPage('home')">记录</el-menu-item>
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
            <i class="el-icon-plus plus-note" @click="toPage('addNote')"></i>
            </el-menu>
        </el-header>
        <router-view>
            
        </router-view>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {
            spinShow: true,
            NoteList: []
        };
    },
    methods: {
        getMenu() {
            this.request('getMenue', {}, true).then(res => {
                console.log(res);
            })
        },
        toPage(page) {
            this.$router.push({path: page});
        }
    },
    mounted () {
        this.getMenu();
    }
};
</script>
