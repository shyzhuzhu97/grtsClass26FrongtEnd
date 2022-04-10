import request from '@/utils/request'

export default {
    


}

export function uploadImg(file) {
    return request({
        url: `/course/uploadImg`,
        method: 'post',
        data: file
    })
}