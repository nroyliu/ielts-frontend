import axios from './config'

// 考试类型选项
export const getSub = (data) => axios.get('/exam/subjects/options', data)

// 课程来源选项
export const getOriginalOptions = (data) => axios.get('/exam/materials/options', data)

//试卷列表
export const getPaper = (data) => axios.get(`/exam/papers?subject_id=${data.subject_id}&material_id=${data.material_id}`, data)

// 获取听力试题
export const getListen = (data) => axios.get(`/exam/papers/${data.id}/listening`, data)

// 获取阅读试题
export const getRead = (data) => axios.get(`/exam/papers/${data.id}/reading`, data)

// 获取写作试题
export const getWrite = (data) => axios.get(`/exam/papers/${data.id}/writing`, data)

// 开始考试
export const startExam = data => axios.post(`/exam/paper/start`,data)

// 答题
export const answerTopic = data => axios.put(`/exam/paper/records/${data.record_id}`,data)

// 获取听力答案
export const listenAnswer = data => axios.get(`/exam/paper/records/selected/${data.id}/listening`,data)

// 获取阅读答案
export const readAnswer = data => axios.get(`/exam/paper/records/selected/${data.id}/reading`,data)

// 获取写作答案
export const writeAnswer = data => axios.get(`/exam/paper/records/selected/${data.id}/writing`,data)