<template>
	<div class="write">
		<div class="left-content">
			<div v-for="(item, index) in topic.groups" :key="index">
				<div
					v-for="(item1, index1) in topic.groups[index].questions"
					:key="index1"
				>
					<div class="markdown-body" v-html="getHtml(item1.content)"></div>
				</div>
			</div>
		</div>
		<div class="right-content">
			<div class="textarea-box">
				<textarea
					name=""
					:id="topic.groups[0].questions[0].id"
					class="textare"
					@keyup="getValue"
				></textarea>
				<p class="word-count">Word count: {{ this.value.length }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
import { mapState, mapMutations } from 'vuex'
import { answerTopic } from '@/server/api'
export default {
	components: {},
	props: {
		topic: Object
	},
	data() {
		return {
			content: '',
			value: ''
		}
	},
	computed: {
		...mapState(['writeContent'])
	},
	methods: {
		...mapMutations(['setWriteContent']),
		// 获取html格式
		getHtml(markdown) {
			let txt = marked(markdown)
			return txt
		},
		// 拼接对象
		mergeData(obj) {
			let writeContent = this.writeContent
			Object.assign(writeContent, obj)
			this.setWriteContent(writeContent)
			let arr = []
			let answerData = {}
			answerData.section = 'listening'
			answerData.is_finished = 1
			answerData.record_id = this.$utils.getSession('curInfo').id
			let obj1 = {}
			for (let key in obj) {
				obj1.question_id = key
				obj1.answer = obj[key]
				arr.push(obj1)
			}
			answerData.answer = arr
			this.answerTopic(answerData)
		},
		getValue(e) {
			this.value = e.target.value
			let id = this.topic.groups[0].questions[0].id
			let obj = {}
			obj[id] = this.value
			this.mergeData(obj)
		},
		answerTopic(obj) {
			answerTopic(obj).then((res) => {})
		}
	},
	mounted() {
		this.pagegation = this.$utils.getSession('pagegation')
		this.part = this.$utils.getSession('part')
		const link = document.createElement('link')
		link.type = 'text/css'
		link.rel = 'stylesheet'
		link.href =
			'https://cdn.bootcss.com/github-markdown-css/2.10.0/github-markdown.min.css'
		document.head.appendChild(link)
		this.content = this.topic.content
	}
}
</script>

<style lang="less" scoped>
.left-content {
	flex: 0.5;
	padding: 0 30px 0 15px;
	width: 50%;
	height: 615px;
	box-sizing: border-box;
	overflow-y: auto;
}
.right-content {
	flex: 0.5;
	width: 50%;
	height: 615px;
	overflow-y: auto;
}
.write {
	display: flex;
}

.markdown-body {
	font-weight: bold;
}
.textarea-box {
	margin: 20px auto 0;
	width: 500px;
	.textare {
		padding: 15px;
		width: 100%;
		min-height: 300px;
		color: #333;
		font-size: 16px;
	}
}
</style>
