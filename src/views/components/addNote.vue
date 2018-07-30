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
        <rich-text></rich-text>
        <div class="btn-list">
            <el-button class="add-note" type='primary' @click="addNote">保存</el-button>
        </div>
    </div>
</template>
<script>
import richText from './richEdit';
export default {
    name: 'addNote',
    data () {
        return {
            spinShow: true,
            noteTitle: '',
            noteInfo: ''
        };
    },
    components: {
        richText,
    },
    methods: {
        addNote() {
            // 获取带标签文本
            let content = tinyMCE.activeEditor.getContent();
            // 获取不带标签文本
            var activeEditorText = tinymce.activeEditor; 
            var editBody = activeEditorText.getBody(); 
            activeEditorText.selection.select(editBody); 
            var desc = activeEditorText.selection.getContent( { 'format' : 'text' } );
            let data = {
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
            this.request('addNote', data, true).then(res => {
                this.$message.success('新增成功!');
                setTimeout(() => {
                    this.$router.push({path: '/home'});
                }, 1000)
            })
        },
    },
    mounted() {
    }
}
</script>
