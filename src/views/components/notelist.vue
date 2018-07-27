<template>
    <div class="list-con">
        <el-card class="box-card list-item" v-for="(item, index) in NoteList" :key="index">
            <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                    
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>编辑</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-button>
            </div>
            <div class="text item">
                {{item.dec}}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: 'notelist',
    data () {
        return {
            NoteList: []
        };
    },
    methods: {
        getNote() {
            this.request('getNote', {}, true).then(res => {
                this.NoteList = res.result.list;
            })
        }
    },
    mounted () {
        this.getNote();
    }
}
</script>
