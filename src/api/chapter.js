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
    findChapterAll(courseId) {
        return request({
            // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
            url: `/course/addCourse`,
            method: 'post',
            data: course,

        })
    },
}