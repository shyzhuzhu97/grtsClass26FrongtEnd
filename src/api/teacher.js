import request from '@/utils/request'

export default{
  findTeacherByPage(currentPage,limit,teacher) {
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url:`/teacher/conditionPageQuery/${currentPage}/${limit}`,
      method: 'post',
      data:{
        teacher
      }
    })
  },
  deleteTeacherById(deleteId){
    return request({
      // url: '/teacher/conditionPageQuery/'+currentPage+'/'+'limit',
      url:`/teacher/deleteTeacherById/${deleteId}`,
      method: 'get',
      
    })
  }

  
}