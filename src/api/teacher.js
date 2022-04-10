import request from '@/utils/request'

export default {
  findTeacherByPage(currentPage, limit, teacher) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/conditionPageQuery/${currentPage}/${limit}`,
      method: 'post',
      data: teacher
    })
  },
  deleteTeacherById(deleteId) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/deleteTeacherById/${deleteId}`,
      method: 'get',

    })
  },
  findTeacherById(id) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/findTeacherById/${id}`,
      method: 'get',

    })
  },
  addTeacher(teacher) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  updateTeacher(teacher) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  },
  findTeacherAll() {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url: `/teacher/findTeacherAll`,
      method: 'get',
    })
  },

}