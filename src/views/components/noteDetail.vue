<style lang="scss" scoped>
    .note-detail{
        padding: 50px 20px;
        display: flex;
        justify-content: center;
        .note{
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 4px 1px 32px -6px #9c9c9c;
            width: 70%;
            .title{
                text-align: center;
                font-size: 30px;
            }
        }
    }
</style>

<template>
    <div class="note-detail">
        <div class="note">
            <div class="title">{{noteInfo.title}}</div>
            <div class="content">
                <p v-html="noteInfo.content"></p>
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

