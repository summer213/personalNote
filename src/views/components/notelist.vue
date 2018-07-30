<style lang="scss" scoped>
    .list-con{
        height: 100%;
    }
    .item{
        cursor: pointer;
    }
</style>

<template>
    <div class="list-con">
        <el-card class="box-card list-item" v-for="(item, index) in NoteList" :key="index" @click="viewDetail(item._id)">
            <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                    
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{id:item._id,type:'edit'}">编辑</el-dropdown-item>
                            <el-dropdown-item :command="{id:item._id,type:'delete'}">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-button>
            </div>
            <div class="text item" @click="viewDetail(item._id)">
                {{item.desc.substring(0,50)}}{{item.desc.length>50?'......':''}}
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
        },
        viewDetail(id) {
            this.$router.push({path: '/noteDetail', query: {id: id}});
        },
        handleCommand(command) {
            if (command.type == 'edit') {
                this.$router.push({path: '/editNote', query: {id: command.id}})
            } else if (command.type == 'delete') {
                this.request('deleteNote', {id: command.id}, true).then(res => {
                    this.getNote();
                })
            }
        }
    },
    mounted () {
        this.getNote();
    }
}
</script>
