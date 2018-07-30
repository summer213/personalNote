const methodMap = {
    // 获取顶部分类菜单
    getMenue: { url: '/menus/list', method: 'get' },
    // 获取note列表
    getNote: {url: '/note/list', method: 'get'},
    // 新增笔记
    addNote: { url:'/note/create', method: 'post'},
    // 删除笔记
    deleteNote: { url:'/note/delete', method: 'post'},
    // 修改笔记
    editNote: { url:'/note/edit', method: 'post'}

};
export default methodMap;