import request from '@/utils/request'

export default {
    findChapterAll(courseId) {
        return request({
            url: `/chapter/findChapterAll/${courseId}`,
            method: 'get',
        })
    },
    addChapter(chapter) {
        return request({
            url: `/chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },
}