
<template>
  <div>
      <!-- <el-main> -->
            <!-- <quill-editor :content="content"
                          :options="editorOption"
                          @change="onEditorChange($event)">
            </quill-editor> -->
      <!-- </el-main> -->
    <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
// import Editor from '@tinymce/tinymce-vue'
export default {
    name: 'text-editor',
    props: {
        content: String
    },
    data () {
        return {
            spinShow: true,
        };
    },
    methods: {
        init () {
            this.$nextTick(() => {
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: '#tinymceEditer',
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'zh_CN.GB2312',
                    language_url: '/static/tinymce/zh_CN.GB2312.js',
                    // images_upload_url: '/api/upfile',
                    images_upload_handler : this.images_upload_handler ,
                    skin_url: '/static/tinymce/skins/lightgray',
                    menubar: 'edit insert view format table tools',
                    plugins: ['link lists image code table colorpicker textcolor preview wordcount contextmenu'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                        let that = this;
                        editor.on('init', function (e) {
                            vm.spinShow = false;
                            // if (localStorage.editorContent) {
                                // 初始化，从缓存中读内容
                                // tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
                                // 设置初始内容为空
                                setTimeout(()=> {
                                    if(vm.content){
                                        tinymce.get('tinymceEditer').setContent(vm.content);
                                    } else {
                                        tinymce.get('tinymceEditer').setContent('');
                                    }
                                },1000)
                            // }
                        });
                        editor.on('keydown', function (e) {
                            localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
                        });
                    }
                });
            });
        },
        images_upload_handler (blobInfo, success, failure) {
            this.handleImgUpload(blobInfo, success, failure);
        },
        handleImgUpload (blobInfo, success, failure) {
            // let formdata = new FormData()
            // success(blobInfo.content.data.fileURI);
            success('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532577823094&di=338f9f4093aee9278dfc25b6601584a3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e8a157f86d8ca84a0d304fcb9943.jpg%402o.jpg')
            // formdata.set('upload_file', blobInfo.blob())
            // axios.post('/api/upload', formdata).then(res => {
            //     success(res.data.data.src)
            // }).catch(res => {
            //     failure('error')
            // })
        }
    },
    mounted () {
        this.init();
    },
    destroyed () {
        tinymce.get('tinymceEditer').destroy();
    }
};
</script>
