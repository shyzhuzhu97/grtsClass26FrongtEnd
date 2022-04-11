import request from '@/utils/request'

export default {
    addCourse(course) {
        return request({
            // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
            url: `/course/addCourse`,
            method: 'post',
            data: course,

        })
    },
    updateCourse(course) {
        return request({
            // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
            url: `/course/updateCourse`,
            method: 'post',
            data: course,

        })
    },
    getCourseById(id) {
        return request({
            // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
            url: `/course/getCourseById/${id}`,
            method: 'get',

        })
    },
    


}

export function uploadImg(file) {
    return request({
        url: `/course/uploadImg`,
        method: 'post',
        data: file
    })
}