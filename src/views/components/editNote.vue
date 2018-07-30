<style lang="scss" scoped>
    .text-edit{
        padding-top: 20px;
        background: #fff;
    }
    .btn-list{
        display: flex;
        justify-content: center;
        padding: 20px 0;
        .add-note{
            width: 200px;
        }
    }
</style>

<template>
    <div class="text-edit">
        <el-form>
            <el-form-item label="笔记标题：" label-width="90px">
                <el-input placeholder="请输入笔记标题" v-model="noteTitle">
                </el-input>
            </el-form-item>
        </el-form>
        <rich-text :content="noteInfo.content"></rich-text>
        <div class="btn-list">
            <el-button class="add-note" type='primary' @click="editNote">修改</el-button>
        </div>
    </div>
</template>
<script>
import richText from './richEdit';
import Bus from '../../libs/bus.js'
export default {
    name: 'editNote',
    data () {
        return {
            spinShow: true,
            noteTitle: '',
            noteInfo: {},
            editId: ''
        };
    },
    components: {
        richText,
    },
    methods: {
        editNote() {
            // 获取带标签文本
            let content = tinyMCE.activeEditor.getContent();
            // 获取不带标签文本
            var activeEditorText = tinymce.activeEditor; 
            var editBody = activeEditorText.getBody(); 
            activeEditorText.selection.select(editBody); 
            var desc = activeEditorText.selection.getContent( { 'format' : 'text' } );
            let data = {
                id: this.editId,
                title: this.noteTitle,
                content: content,
                desc: desc
            }
            if (!this.noteTitle) {
                this.$message.error('请输入笔记标题');
                return false;
            } else if(!desc) {
                this.$message.error('请输入笔记内容');
                return false;
            }
            this.request('editNote', data, true).then(res => {
                this.$message.success('修改成功!');
                setTimeout(() => {
                    this.$router.push({path: '/home'});
                }, 1000)
            })
        },
    },
    mounted() {
        this.editId = this.$route.query.id;
        this.request('getNote', {id: this.editId}, true).then(res => {
            this.noteInfo = res.result.list[0];
            this.noteTitle = res.result.list[0].title;
        })
    }
}
</script>
