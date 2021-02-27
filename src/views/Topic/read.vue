<template>
	<div>
		<div class="doublePage">
			<div class="left-content">
				<div>
					<div class="markdown-body" v-html="getHtml(this.content, true)"></div>
				</div>
			</div>
			<div class="right-content">
				<div class="m-part" v-for="(item, index) in topic.groups" :key="index">
					<div class="section">
						Questions {{ getSection(topic.groups[index].questions) }}
					</div>
					<div class="description" v-html="getHtml(item.description)"></div>
					<!-- 阅读单选 type 11 -->
					<div class="m-type11" v-if="item.type === 11 || item.type === 21">
						<div
							class="single-page-s-s"
							v-for="(selectItem, selectIndex) in topic.groups[index].questions"
							:key="selectItem.id"
							:id="selectItem.id"
						>
							<div class="topic">
								<div class="num">{{ getIndex(selectItem.id) }}</div>
								<div class="topic-txt">{{ selectItem.content }}</div>
							</div>

							<div
								class="option"
								:id="topic.groups[index].questions[selectIndex].id"
							>
								<singleOption
									:item="topic.groups[index].questions[selectIndex]"
									@changeData="mergeData"
								></singleOption>
							</div>
						</div>
					</div>
					<!-- 阅读单选 type 34 且不为表格-->
					<div
						class="m-type11"
						v-if="item.type === 34 && item.mode != 343 && item.mode !== 342"
					>
						<div
							class="single-page-s-s"
							v-for="(selectItem, selectIndex) in topic.groups[index].questions"
							:key="selectItem.id"
						>
							<div class="topic">
								<div class="num">{{ getIndex(selectItem.id) }}</div>
								<div class="topic-txt">{{ selectItem.content }}</div>
							</div>

							<div
								class="option"
								:id="topic.groups[index].questions[selectIndex].id"
							>
								<singleOption
									:arr="topic.groups[index].options"
									:isReadType34="true"
									:id="topic.groups[index].questions[selectIndex].id"
									@changeData="mergeData"
								></singleOption>
							</div>
						</div>
					</div>
					<!-- 阅读表格填写 -->
					<div class="type34" v-if="item.type === 34 && item.mode == 343">
						<listenImageTable
							:isRead="true"
							:item="topic.groups[index]"
							@changeData="mergeData"
						></listenImageTable>
					</div>
					<!-- 拖拽 -->
					<div class="type34" v-if="item.type === 34 && item.mode == 342">
						<div v-html="getHtml(item.content)"></div>
						<div class="m-options" draggable="false">
							<div
								class="dragable"
								v-for="(item1, index1) in item.options"
								:key="item1.option"
								draggable="true"
								:name="item1.option"
								@mousedown="dragStart(index1)"
							>
								<span v-if="!idObj[item1.option]">
									{{ item1.option | getNoma(item1.text) }}
								</span>
							</div>
						</div>
					</div>
					<!-- 多选 -->
					<div class="multipleChoice" v-if="item.type === 12">
						<div v-for="(item1, index1) in item.questions" :key="index1">
							<div style="display: flex;align-items:center;">
								<h3 style="margin-right: 10px">{{ getIndex(item1.id) }}</h3>
								<div v-html="getHtml(item1.content)"></div>
							</div>
							<div style="padding-left:32px">
								<mutipleChoice
									:item1="item1"
									@changeData="mergeData"
								></mutipleChoice>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
import singleOption from '../../components/singleOption'
import listenImageTable from '../../components/listenImageTable'
import dragComponent from '../../components/dragComponent'
import mutipleChoice from '../../components/mutipleChoice'
const eleMap = []

const dragStart = (e) => {
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

export default {
	components: { singleOption, listenImageTable, dragComponent, mutipleChoice },
	props: {
		topic: Object
	},
	data() {
		return {
			content: '',
			currentPart: 1, //当前 part
			pagegation: [], // 题目id 列表
			part: {}, //{part1:...part2:...}
			answer: {},
			idDragList: [],
			currentIndex: 0,
			idObj: {}
		}
	},
	watch: {
		currentPart(val) {
			this.pagegation = this.$utils.getSession('pagegation')
			this.part = this.$utils.getSession('part')
		}
	},
	filters: {
		getNoma(num, txt) {
			const one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
			const charCode = []
			for (let i = 0; i < 26; i++) {
				charCode.push(String.fromCharCode(65 + i))
			}
			let index = charCode.indexOf(num)
			return `${one[index]}. ${txt}`
		}
	},
	methods: {
		// 获取区间 Questions 1-10
		getSection(arr) {
			let begin = this.pagegation.indexOf(arr[0].id)
			let end = this.pagegation.indexOf(arr[arr.length - 1].id)
			if (begin == end) {
				return begin + 1
			}
			return `${begin + 1} - ${end + 1}`
		},
		// 获取html格式
		getHtml(markdown, isMain = false) {
			let txt = marked(markdown)
			// 针对拖拽单独处理
			if (isMain) {
				// 将 [d[=NO=]]转换为方框 保存可以drag的标签id
				this.topic.groups.forEach((item1) => {
					if (item1.type === 34 && item1.mode == 342) {
						item1.questions.forEach((item) => {
							txt = txt.replace(
								'[d[=NO=]]',
								`<div style="display:flex;align-items:center;"><h5 style="margin:0 6px ;">${this.pagegation.indexOf(
									item.id
								) +
									1}.</h5 ><div class="ondrag" style="margin:0 6px;" wrap="true" draggable="false" id="${
									item.id
								}"></div></div>`
							)
							if (!~this.idDragList.indexOf(item.id))
								this.idDragList.push(item.id)
						})
					}
				})
			}

			return txt
		},
		// 获取当前题号
		getIndex(id) {
			return this.pagegation.indexOf(id) + 1
		},
		// 拼接对象
		mergeData(obj) {
			Object.assign(this.answer, obj)
		},
		dragDrop(e) {
			let _this = this
			let txt = eleMap[this.currentIndex].innerText
			const obj = {}
			if (e.target.innerHTML) {
				// 获取span 上面的 name（为当前题目的 id） dom 操作 会有问题 所以 直接添加 text
				let id = e.target.getAttribute('name')
				obj[id] = eleMap[_this.currentIndex].getAttribute('name')
				this.mergeData(obj)
				e.target.innerHTML = ''
				e.target.innerHTML = `${txt}`
				for (let key in _this.idObj) {
					if (_this.idObj[key] === id) {
						_this.idObj[key] = ''
					}
				}
				_this.$set(
					_this.idObj,
					eleMap[this.currentIndex].getAttribute('name'),
					id
				)
			} else {
				let id = e.target.id
				obj[id] = eleMap[this.currentIndex].getAttribute('name')
				this.mergeData(obj)
				e.target.innerHTML = `<span draggable="true"  name="${e.target.id}" style="display:block">${txt}</span>`
				_this.$set(
					_this.idObj,
					eleMap[this.currentIndex].getAttribute('name'),
					id
				)
			}
		},
		dragStart(index) {
			this.currentIndex = index
		},
		checkBox(e) {
			console.log(e)
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
		console.log(this.content)
		const dragables = document.querySelectorAll('.dragable')
		dragables.forEach((el) => {
			// 监听draggable的相关事件
			el.addEventListener('dragstart', dragStart)
			el.addEventListener('dragend', dragEnd)
			let element = el.cloneNode(true)
			eleMap.push(element)
		})
		setTimeout(() => {
			this.idDragList.forEach((id) => {
				let droppable = document.getElementById(id)
				droppable.addEventListener('dragover', dragOver)
				droppable.addEventListener('dragleave', dragLeave)
				droppable.addEventListener('dragenter', dragEnter)
				droppable.addEventListener('drop', (e) => this.dragDrop(e))
			})
		})
	}
}
</script>

<style lang="less" scoped>
.description {
	margin-bottom: 10px;
}
.section {
	margin: 10px 0;
	font-weight: 700;
	font-family: Helvetica Neue Bold, Helvetica Neue, Helvetica, Roboto, Arial,
		sans-serif;
	font-size: 16px;
}
.markdown-body h2 {
	text-align: center;
	transition: all 0.5s;
}

.left-content {
	flex: 0.5;
	padding: 0 30px 0 15px;
	width: 50%;
	height: 650px;
	box-sizing: border-box;
	overflow-y: auto;
}
.right-content {
	flex: 0.5;
	width: 50%;
	height: 650px;
	overflow-y: auto;
}

.doublePage {
	display: flex;
	width: 100%;
	justify-content: space-between;
}
.pre {
	white-space: pre-wrap;
}
.m-part {
	padding: 0 15px 20px;
	box-sizing: border-box;
}
.m-type11 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.topic {
		display: flex;
		color: #212529;
		font-size: 18px;
		.num {
			margin-right: 10px;
		}
	}
}

.markdown-body {
	font-weight: bold;
}
.m-options {
	min-width: 100px;
	.dragable span {
		padding: 0 10px;
		margin-bottom: 10px;
		height: 30px;
		border: 1px solid #333;
		text-align: center;
		line-height: 30px;
	}
}
.single-page-s-s {
	margin-bottom: 10px;
}
</style>
