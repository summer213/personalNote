
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
      <el-main>
            <quill-editor :content="content"
                          :options="editorOption"
                          @change="onEditorChange($event)">
            </quill-editor>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      content: 'Welcome to Your Vue.js App',
      editorOption: { /* quill options */ }
    }
  },
  methods: {
    onEditorChange(event) {
      console.log('123123123')
    }
  },
  mounted() {

  }
}
</script>
