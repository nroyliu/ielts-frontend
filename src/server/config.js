/**
 * 1. 创建实例
 * 2. 设置默认基础属性
 * 3. 设置baseURL
 * 4. 请求拦截
 * 5. header配置
 * 6. 请求拦截
 * 7. 响应拦截
 */

// request.js
import axios from 'axios' // 引入axios
import Qs from 'qs' // 引入qs模块，用来序列化post类型的数据
// import { autoMatch, checkStatus } from './utils' // 处理函数
// import { Toast } from 'vant' // 提示框

// 创建axios实例
const instance = axios.create({
	// baseURL: process.env.BASE_URL,
	timeout: 180000, // 请求超时时间
	// `transformRequest` 允许在向服务器发送前，修改请求数据
	transformRequest: [
		function (data) {
			// 对 data 进行任意转换处理
			// data = JSON.stringify(data)
			return data
		}
	],
	// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
	transformResponse: [
		function (data) {
			// 对 data 进行任意转换处理
			if (typeof data === 'string' && data.startsWith('{')) {
				data = JSON.parse(data)
			}
			return data
		}
	]
})

// 环境的切换
if (process.env.NODE_ENV === 'development') {
	// 生产环境默认地址
	instance.defaults.baseURL = 'https://api.papaen.com/v1/exam/papers/115/listening'
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境默认地址
	instance.defaults.baseURL = 'https://api.forbiger.com'
}

instance.interceptors.request.use(
	function (config) {
		// 在发送请求之前做处理...
		// config.headers = Object.assign(
		// 	config.method === 'get'
		// 		? {
		// 				Accept: 'application/json',
		// 				'Content-Type': 'application/json; charset=UTF-8'
		// 		  }
		// 		: {
		// 				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		// 		  },
		// 	config.headers
		// )

		if (config.method === 'post') {
			const contentType = config.headers['Content-Type']
			// 根据Content-Type转换data格式
			if (contentType) {
				if (contentType.includes('multipart')) {
					// 类型 'multipart/form-data;'
					config.data = data;
				} else if (contentType.includes('json')) {
					// 类型 'application/json;'
					// 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
					config.data = JSON.stringify(config.data)
				} else {
					// 类型 'application/x-www-form-urlencoded;'
					// 服务器收到的raw body(原始数据) name=nowThen&age=18
					config.data = Qs.stringify(config.data)
				}
			} else {
				// 请求头为空 设置默认请求头
				config.data = Qs.stringify(config.data)
				config.headers = Object.assign({
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					config.headers
				)
			}
		} else if (config.method === 'get') {
			config.headers = Object.assign({
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8'
				},
				config.headers
			)
			config.data = JSON.stringify(config.data)
		} else {
			config.data = Qs.stringify(config.data)
			config.headers = Object.assign({
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				config.headers
			)
		}
		return Promise.resolve(config)
	},
	function (error) {
		// 对请求错误做处理...
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(res) => {
		return Promise.resolve(res)
	},
	(err) => {
		return Promise.reject(err.response)
	}
)
export default instance