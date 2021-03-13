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
						v-if="
							item.type === 34 &&
								item.mode != 343 &&
								item.mode !== 342 &&
								item.mode !== 345
						"
					>
						<div
							class="single-page-s-s"
							v-for="(selectItem, selectIndex) in topic.groups[index].questions"
							:key="selectItem.id"
						>
							<div class="topic">
								<div class="num">{{ getIndex(selectItem.id) }}</div>
								<div class="topic-txt">
									{{ selectItem.content.replace('[d[=NO=]]', '') }}
								</div>
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
					<!-- 阅读选单项 type 34 mode == 345-->
					<div class="type34" v-if="item.type === 34 && item.mode == 345">
						<div v-html="getCurrentHtml(item)"></div>
						<div>
							<div v-for="item1 in item.options" :key="item1.option">
								<p class="options">
									<span style="font-weight:bold;margin-right:10px;">
										{{ item1.option }}.
									</span>
									<span>{{ item1.text }}</span>
								</p>
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
					<!-- 表格填写 -->
					<div v-if="item.type === 32 && item.mode === 322">
						<div
							class="markdown-body table"
							v-html="getCurrentHtml(item)"
						></div>
					</div>
					<!-- 阅读填空type 32 mode == 323-->
					<div
						class="type34"
						v-if="
							(item.type === 32 && item.mode == 323) ||
								(item.type === 32 && item.mode == 321)
						"
					>
						<span class="markdown-body" v-html="getCurrentHtml(item)"></span>
					</div>
					<!-- 阅读填空单选 type 32 mode == 324-->
					<div class="type34" v-if="item.type === 32 && item.mode == 324">
						<!-- <div v-for="item1 in item.questions" :key="item1.id"> -->
						<div v-html="getHtml(item.content, true)"></div>
						<div>
							<div v-for="item1 in item.questions" :key="item1.option">
								<div v-html="dispose(item1)"></div>
							</div>
						</div>
						<!-- </div> -->
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
import { answerTopic } from '@/server/api'
const eleMap = []

const dragStart = (e) => {}

const dragEnd = (e) => {}

function dragOver(e) {
	e.preventDefault()
}

function dragEnter(e) {
	e.preventDefault()
}

function dragLeave(e) {}

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
			idObj: {},
			fillIdList: []
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
			let exampleRule = /\[u\[(.*)\]\]/
			if (!!txt.match(exampleRule)) {
				txt = txt.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				txt = txt.replace(']]', '</span>')
			}
			// 针对拖拽单独处理
			if (isMain) {
				// 将 [d[=NO=]]转换为方框 保存可以drag的标签id
				this.topic.groups.forEach((item, index) => {
					item.questions.forEach((item1) => {
						if (~txt.indexOf('[i[=NO=]]') || ~txt.indexOf('[ii[=NO=]')) {
							let rule = /\[i*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
							if (txt.match(rule) == null) return txt
							let flag = txt.match(rule)[0]
							if (~flag.indexOf('[ii[=NO=]')) {
								let text = flag.replace('[ii[=NO=]', '').replace('[=NO=]]', '')
								txt = txt.replace(
									flag,
									`<input type="text" class="ipt-listen" id="${
										item1.id
									}"  name="${item1.id}" placeholder="${this.getIndex(
										item1.id
									)}" /> ${text} <input type="text" class="ipt-listen" id="${
										item1.id
									}"  name="${item1.id}" placeholder="${this.getIndex(
										item1.id
									)}" />`
								)
								if (!~this.fillIdList.indexOf(item1.id)) {
									this.fillIdList.push(item1.id)
								}
							} else {
								txt = txt.replace(
									'[i[=NO=]]',
									`<input type="text" class="ipt-listen" id="${
										item1.id
									}"  name="${item1.id}" placeholder="${this.getIndex(
										item1.id
									)}" />`
								)

								if (!~this.fillIdList.indexOf(item1.id)) {
									this.fillIdList.push(item1.id)
								}
							}
						}
						if (~txt.indexOf('[d[=NO=]]')) {
							let rule = /\[d.*\]/
							if (txt.match(rule) == null) return txt
							let flag = txt.match(rule)[0]
							txt = txt.replace(
								flag,
								`<div class="ondrag" name="${
									item1.id
								}" style="margin:0 6px 15px;display:block;width: 300px;text-align:center;"  draggable="false" id="${
									item1.id
								}" >${this.getIndex(item1.id)}</div>`
							)

							if (!~this.fillIdList.indexOf(item1.id)) {
								this.fillIdList.push(item1.id)
							}
							if (!~this.idDragList.indexOf(item1.id)) {
								this.idDragList.push(item1.id)
							}
						}
					})
				})
			}
			txt = txt.replaceAll('*', '')
			return txt
		},
		getCurrentHtml(item) {
			let txt = marked(item.content)
			let exampleRule = /\[u\[(.*)\]\]/
			if (!!txt.match(exampleRule)) {
				txt = txt.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				txt = txt.replace(']]', '</span>')
			}
			item.questions.forEach((item1) => {
				if (~txt.indexOf('[i[=NO=]]') || ~txt.indexOf('[ii[=NO=]')) {
					let rule = /\[i*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
					if (txt.match(rule) == null) return txt
					let flag = txt.match(rule)[0]
					if (~flag.indexOf('[ii[=NO=]')) {
						let text = flag.replace('[ii[=NO=]', '').replace('[=NO=]]', '')
						txt = txt.replace(
							flag,
							`<input type="text" style="width:80px;" class="ipt-listen" id="${
								item1.id
							}"  name="${item1.id}" placeholder="${this.getIndex(
								item1.id
							)}" /> ${text} <input style="width:80px;" type="text" class="ipt-listen" id="${
								item1.id
							}"  name="${item1.id}" placeholder="${this.getIndex(
								item1.id
							)}" />`
						)
						if (!~this.fillIdList.indexOf(item1.id)) {
							this.fillIdList.push(item1.id)
						}
					} else {
						txt = txt.replace(
							'[i[=NO=]]',
							`<input type="text" style="width:100px;" class="ipt-listen" id="${
								item1.id
							}"  name="${item1.id}" placeholder="${this.getIndex(
								item1.id
							)}" />`
						)

						if (!~this.fillIdList.indexOf(item1.id)) {
							this.fillIdList.push(item1.id)
						}
					}
				}

				if (~txt.indexOf('[d[=NO=]]')) {
					let rule = /\[d.*\]/
					if (txt.match(rule) == null) return txt
					let flag = txt.match(rule)[0]
					txt = txt.replace(
						'[d[=NO=]]',
						`<input type="text" style="width:100px;" class="ipt-listen" id="${
							item1.id
						}"  name="${item1.id}" placeholder="${this.getIndex(item1.id)}" />`
					)

					if (!~this.fillIdList.indexOf(item1.id)) {
						this.fillIdList.push(item1.id)
					}
				}
			})
			txt = txt.replaceAll('*', '')
			return txt
		},
		// 获取当前题号
		getIndex(id) {
			return this.pagegation.indexOf(id) + 1
		},
		// 拼接对象
		mergeData(obj) {
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
				e.target.innerHTML = `<span draggable="false"  name="${e.target.id}" style="display:block">${txt}</span>`
				_this.$set(
					_this.idObj,
					eleMap[this.currentIndex].getAttribute('name'),
					id
				)
			}
		},
		answerTopic(obj) {
			answerTopic(obj).then((res) => {})
		},
		dragStart(index) {
			this.currentIndex = index
		},
		checkBox(e) {},
		dispose(item) {
			let txt = marked(item.content)
			let exampleRule = /\[u\[(.*)\]\]/
			if (!!txt.match(exampleRule)) {
				txt = txt.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				txt = txt.replace(']]', '</span>')
			}
			txt = txt.replace(
				'[i[=NO=]]',
				`<div style="display:inline-flex;align-items:center;"><h5 style="margin:0 6px ;">${this.pagegation.indexOf(
					item.id
				) + 1}.</h5 ><input class="ondrag" style="margin:0 6px;" id="${
					item.id
				}" name="${item.id}"></input></div>`
			)
			if (!~this.fillIdList.indexOf(item.id)) this.fillIdList.push(item.id)
			txt = txt.replaceAll('*', '')
			return txt
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
		// 原生js操作
		this.$nextTick(() => {
			this.fillIdList.forEach((item, index) => {
				if (document.getElementsByName(item)) {
					let eleList = document.getElementsByName(item)
					eleList.forEach((item1) => {
						item1.addEventListener('change', (e) => {
							this.mergeData({ [item]: e.target.value })
						})
					})
				}
			})
		})
	}
}
</script>

<style lang="less" scoped>
.ondrag {
	display: block;
	min-width: 80px;
	min-height: 20px;
	border: 1px solid #ccc;
}
.double-page::-webkit-scrollbar {
	display: none;
}
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

.markdown-body td {
	border: 1px solid #212529;
}

.table {
	padding: 0 15px;
	box-sizing: border-box;
	font-size: 14px;
}
.table td {
	border: 1px solid #212529;
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
.options {
	margin: 10px;
	font-size: 14px;
}
</style>
