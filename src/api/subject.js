import request from '@/utils/request'

export default {
    getSubjectOne() {
        return request({
            url: `/subject/getSubjectOne`,
            method: 'get',
        })
    },
    getSubjectTwo(id) {
        return request({
            url: `/subject/getSubjectTwo/${id}`,
            method: 'get',
        })
    },
    querySubject(title) {
        return request({
            url: `/subject/querySubject/${title}`,
            method: 'get',
        })
    },



}