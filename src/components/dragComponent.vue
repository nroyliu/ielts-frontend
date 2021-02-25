<template>
	<div class="dragComponent">
		<div class="m-topic">
			<div class="topic" v-for="item in topic" :key="item.id">
				<div class="markdown-body" v-html="item"></div>
			</div>
		</div>
		<div class="m-options" draggable="false">
			<div
				class="dragable"
				v-for="(item1, index) in dragData.options"
				:key="item1.option"
				draggable="true"
				:name="item1.option"
				@mousedown="dragStart(index)"
			>
				<span v-if="!idObj[item1.option]">
					{{ `${item1.option}. ${item1.text}` }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
const obj = {}
let currentTag = null
const eleMap = []
let currentIndex = 0

const dragStart = (e) => {
	currentTag = e.target
	// console.log(e)
}

const dragEnd = (e) => {
	// console.log(e)
}

function dragOver(e) {
	e.preventDefault()
}

function dragEnter(e) {
	e.preventDefault()
	// console.log(e)
}

function dragLeave(e) {
	// console.log(e)
}

const Vue = {
	props: {
		dragData: Object
	},
	data() {
		return {
			topic: [],
			pagegation: [],
			currentIndex: 0,
			idObj: {},
			arr: []
		}
	},
	computed: {},
	watch: {},
	methods: {
		dragStart(index) {
			currentIndex = index
			this.currentIndex = index
		}
	},
	created() {
		this.pagegation = this.$utils.getSession('pagegation')
		this.$nextTick(() => {
			let questions = this.dragData.questions
			questions.forEach((item) => {
				let obj = marked(item.content).replace(
					'[d[=NO=]]',
					`<h5 style="margin:0 6px 15px">${this.pagegation.indexOf(item.id) +
						1}.</h5 ><div class="ondrag" style="margin:0 6px 15px"  draggable="false" id="${
						item.id
					}"></div>`
				)
				this.topic.push(obj)
			})
		})
	},
	mounted() {
		// 松手触发事件
		let _this = this
		// 监听drop
		const dragDrop = (e) => {
			let txt = eleMap[currentIndex].innerText
			if (e.target.innerHTML) {
				// 获取span 上面的 name（为当前题目的 id） dom 操作 会有问题 所以 直接添加 text
				let id = e.target.getAttribute('name')
				obj[id] = eleMap[currentIndex].getAttribute('name')
				_this.$emit('changeData', obj)
				e.target.innerHTML = ''
				e.target.innerHTML = `${txt}`
				for (let key in _this.idObj) {
					if (_this.idObj[key] === id) {
						_this.idObj[key] = ''
					}
				}
				_this.$set(_this.idObj, eleMap[currentIndex].getAttribute('name'), id)
			} else {
				let id = e.target.id
				obj[id] = eleMap[currentIndex].getAttribute('name')
				_this.$emit('changeData', obj)
				e.target.innerHTML = `<span draggable="true"  name="${e.target.id}" style="display:block">${txt}</span>`
				_this.$set(_this.idObj, eleMap[currentIndex].getAttribute('name'), id)
			}
		}

		const dragables = document.querySelectorAll('.dragable')
		dragables.forEach((el) => {
			// 监听draggable的相关事件
			el.addEventListener('dragstart', dragStart)
			el.addEventListener('dragend', dragEnd)
			let element = el.cloneNode(true)
			eleMap.push(element)
		})
		let arr = []
		setTimeout(() => {
			this.dragData.questions.forEach((item, index) => {
				arr.push(document.getElementById(`${item['id']}`))
			})
			arr.forEach((droppable) => {
				droppable.addEventListener('dragover', dragOver)
				droppable.addEventListener('dragleave', dragLeave)
				droppable.addEventListener('dragenter', dragEnter)
				droppable.addEventListener('drop', dragDrop)
			})
		})
	}
}
export default Vue
</script>
<style>
.ondrag {
	min-width: 80px;
	min-height: 20px;
	border: 1px solid #ccc;
}
.dragComponent p {
	line-height: 20px;
}
</style>
<style lang="less" scoped>
.markdown-body {
	display: flex;
	align-items: center;
	font-weight: bold;
}
.dragComponent {
	display: flex;
	justify-content: space-between;
	.m-options {
		.dragable span {
			display: block;
			margin-bottom: 10px;
			height: 30px;
			border: 1px solid #333;
		}
	}
}
</style>
