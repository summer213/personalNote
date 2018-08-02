<style lang="scss" scoped>
    .title {
        font-size: 40px;
        text-align: center;
        padding: 20px 0;
    }
    .creatAt {
        text-align: center;
        color: rgba(136,136,136,0.8);
        font-size: 22px;
        padding: 0 0 10px 0;
    }
    .note-detail{
        padding: 50px 20px;
        display: flex;
        justify-content: center;
        .note{
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 4px 1px 32px -6px #9c9c9c;
            width: 85%;
            overflow: hidden;
            overflow-x: auto;
            .title{
                text-align: center;
                font-size: 30px;
            }
        }
    }
</style>

<template>
    <div class="note-con">
        <div class="title">{{noteInfo.title}}</div>
        <div class="creatAt">{{noteInfo.createAt}}</div>
        <div class="note-detail">
            <div class="note">
                <div class="content">
                    <p v-html="noteInfo.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            noteInfo: {},
            content: ''
        }
    },
    methods: {

    },
    mounted() {
        let id = this.$route.query.id;
        this.request('getNote', {id: id}, true).then(res => {
            this.noteInfo = res.result.list[0];
        })
    }
}
</script>

