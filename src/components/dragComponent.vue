<template>
	<div class="dragComponent">
		<div class="m-topic">
			<div class="topic" v-for="item in topic" :key="item.id">
				<div class="markdown-body " v-html="item"></div>
			</div>
		</div>
		<div class="m-options">
			<div
				class="dragable"
				v-for="(item1, index) in dragData.options"
				:key="item1.option"
				draggable="true"
				@mousedown="dragStart(index)"
			>
				{{ `${item1.option}. ${item1.text}` }}
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'

let currentTag = null
const eleMap = []
let currentIndex = 0

const dragStart = (e) => {
	currentTag = e.target
	console.log(e)
}

const dragEnd = (e) => {
	console.log(e)
}

function dragOver(e) {
	e.preventDefault()
}

function dragEnter(e) {
	e.preventDefault()
	console.log(e)
}

function dragLeave(e) {
	console.log(e)
}

function dragDrop(e) {
	if (e.target.innerHTML) {
		console.log(e.target)
		e.target.innerHTML = ''
		setTimeout(() => {
			e.target.append(eleMap[currentIndex])
		})
	} else {
		e.target.append(eleMap[currentIndex])
	}
}

const Vue = {
	props: {
		dragData: Object
	},
	data() {
		return {
			topic: [],
			pagegation: [],
			currentIndex: 0
		}
	},
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
						1}.</h5 ><div class="ondrag" style="margin:0 6px 15px" draggable="false" id="${
						item.id
					}"></div>`
				)
				this.topic.push(obj)
			})
		})
	},
	mounted() {
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
		.dragable {
			margin-bottom: 10px;
			height: 30px;
			border: 1px solid #333;
		}
	}
}
</style>
