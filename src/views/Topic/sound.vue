<template>
	<div class="sound">
		<!-- 单篇界面 -->
		<div class="m-part" v-for="(item, index) in groups.groups" :key="item.id">
			<div class="section">
				Questions {{ getSection(groups.groups[index].questions) }}
			</div>
			<pre class="description" v-html="getHtml(item.description)"></pre>
			<!-- type == 32 听力填空 -->
			<div
				class="box type32"
				v-if="item.type === 32 && !~item.content.indexOf('table')"
				style="display: flex"
			>
				<pre><div class="content markdown-body" v-html="getHtml(item.content,item)"></div></pre>
				<div v-if="item.type === 32 && item.mode === 324">
					<div v-for="item1 in item.questions" :key="item1.id">
						<div v-html="getHtmlItem(item1.content, item1.id)"></div>
					</div>
				</div>
			</div>
			<!-- type == 32 并且 富文本有表单 -->
			<div
				class="box type32"
				v-if="item.type === 32 && ~item.content.indexOf('table')"
			>
				<pre class="table">
					<div class="markdown-body" v-html="getHtml(item.content,item)"></div>
				</pre>
			</div>
			<!-- 听力单选 type 11 -->
			<div class="m-type11" v-if="item.type === 11">
				<div
					class="single-page-s-s"
					v-for="(selectItem, selectIndex) in groups.groups[index].questions"
					:key="selectItem.id"
				>
					<div class="topic">
						<div class="num">{{ getIndex(selectItem.id) }}</div>
						<div class="topic-txt">{{ selectItem.content }}</div>
					</div>

					<div
						class="option"
						:id="groups.groups[index].questions[selectIndex].id"
					>
						<singleOption
							:item="groups.groups[index].questions[selectIndex]"
							@changeData="mergeData"
						></singleOption>
					</div>
				</div>
			</div>
			<!-- 多选 -->
			<div class="multipleChoice" v-if="item.type === 12 && item.mode === 0">
				<div v-for="(item1, index1) in item.questions" :key="index1">
					<div style="display: flex;align-items:center;">
						<h3 style="margin-right: 10px">{{ getIndex(item1.id) }}</h3>
						<div v-html="getHtml(item1.content)"></div>
					</div>
					<div style="padding-left:32px">
						<mutipleChoice
							:selection="1"
							:item1="item1"
							@changeData="mergeData"
						></mutipleChoice>
					</div>
				</div>
			</div>
			<!-- 听力表格填写 -->
			<div
				class="type34"
				v-if="item.type === 34 && item.mode !== 341 && item.mode !== 345"
			>
				<listenImageTable
					:item="groups.groups[index]"
					@changeData="mergeData"
				></listenImageTable>
			</div>
			<!-- 听力多项单选 -->
			<div class="type34" v-if="item.type === 34 && item.mode == 345">
				<div style="display:flex;">
					<div class="part" v-if="!isRead">
						<div
							class="markdown-body"
							v-html="getHtml(groups.groups[index].content, item)"
						></div>
					</div>
					<div style="margin-left:100px">
						<div v-for="item1 in item.options" :key="item1.text">
							<span>{{ item1.option }}.</span>
							<span>{{ item1.text }}</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 拖拽 -->
			<div class="type34" v-if="item.type === 34 && item.mode == 341">
				<dragComponent
					:dragData="groups.groups[index]"
					@changeData="mergeData"
				></dragComponent>
			</div>
		</div>
	</div>
</template>
<script>
import marked from 'marked'
import singleOption from '../../components/singleOption'
import listenImageTable from '../../components/listenImageTable'
import dragComponent from '../../components/dragComponent'
import { answerTopic } from '@/server/api'
import mutipleChoice from '../../components/mutipleChoice'
export default {
	components: {
		singleOption,
		listenImageTable,
		dragComponent,
		mutipleChoice
	},
	props: {
		groups: Object //保存part数据
	},
	data() {
		return {
			// groups: [],
			currentPart: 1, //当前 part
			pagegation: [], // 题目id 列表
			part: {}, //{part1:...part2:...}
			answer: {},
			fillIdList: [], //保存 填空 id 列表
			doubleFillList: [] //双空
		}
	},
	watch: {
		currentPart(val) {
			this.pagegation = this.$utils.getSession('pagegation')
			this.part = this.$utils.getSession('part')
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
		// 原生js操作
		this.$nextTick(() => {
			this.doubleFillList.forEach((item, index) => {
				if (document.getElementsByName(item)) {
					let eleList = document.getElementsByName(item)
					eleList.forEach((item1) => {
						item1.addEventListener('change', (e) => {
							let id = item.replace('A', '')
							this.mergeData({
								[id]: `${document.getElementsByName(id)[0].value}|${
									e.target.value
								}`
							})
						})
					})
				}
			})
			this.fillIdList.forEach((item, index) => {
				if (document.getElementsByName(item)) {
					let eleList = document.getElementsByName(item)
					eleList.forEach((item1) => {
						item1.addEventListener('change', (e) => {
							if (~this.doubleFillList.indexOf(`${item}A`)) {
								this.mergeData({
									[item]: `${e.target.value}|${
										document.getElementsByName(`${item}A`)[0].value
									}`
								})
							} else {
								this.mergeData({ [item]: e.target.value })
							}
						})
					})
				}
			})
		})
	},
	filters: {},
	methods: {
		// 获取区间 Questions 1-10
		getSection(arr) {
			let begin = this.pagegation.indexOf(arr[0].id)
			let end = this.pagegation.indexOf(arr[arr.length - 1].id)
			return `${begin + 1} - ${end + 1}`
		},
		// 获取html格式
		getHtml(markdown, item = '') {
			let txt = marked(markdown, { sanitize: false })

			let exampleRule = /\[u\[(.*)\]\]/
			if (!!txt.match(exampleRule)) {
				txt = txt.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				txt = txt.replace(']]', '</span>')
			}

			if (item) {
				item.questions.forEach((item1, index) => {
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
								)}" /> ${text} <input type="text" class="ipt-listen" id="${item1.id +
									'A'}"  name="${item1.id + 'A'}" placeholder="${this.getIndex(
									item1.id
								)}" />`
							)
							if (!~this.fillIdList.indexOf(item1.id)) {
								this.fillIdList.push(item1.id)
							}
							if (!~this.doubleFillList.indexOf(item1.id + 'A')) {
								this.doubleFillList.push(item1.id + 'A')
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
							'[d[=NO=]]',
							`<input type="text" class="ipt-listen" id="${item1.id}"  name="${
								item1.id
							}" placeholder="${this.getIndex(item1.id)}" />`
						)

						if (!~this.fillIdList.indexOf(item1.id)) {
							this.fillIdList.push(item1.id)
						}
					}
				})
			}
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
		answerTopic(obj) {
			answerTopic(obj).then((res) => {})
		},
		getHtmlItem(markdown, id) {
			let txt = marked(markdown)
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
				`<input type="text" class="ipt-listen" id="${id}"  name="${id}" placeholder="${this.getIndex(
					id
				)}" />`
			)
			txt = txt.replaceAll('*', '')
			return txt
		}
	}
}
</script>

<style lang="less" scoped>
.sound::-webkit-scrollbar {
	display: none;
}
.ipt-listen {
	min-width: 100px;
	height: 30px;
	line-height: 30px;
	border: 1px solid #333;
	color: #333;
	text-align: center;
}
.ipt-listen::placeholder,
.ipt-listen::-ms-input-placeholder,
.ipt-listen::-moz-input-placeholder,
.ipt-listen::-webkit-input-placeholder,
.ipt-listen::-o-input-placeholder {
	text-align: center;
}
.sound {
	padding: 0 17px;
	font-size: 20px;
	box-sizing: border-box;
	.m-part {
		margin-bottom: 20px;
	}
	.page {
		width: 30%;
	}
	.section {
		margin: 10px 0;
		font-weight: 700;
		font-family: Helvetica Neue Bold, Helvetica Neue, Helvetica, Roboto, Arial,
			sans-serif;
		font-size: 16px;
	}
	pre {
		display: table;
		white-space: normal;
	}
	p {
		white-space: pre-wrap;
	}
	.content {
		white-space: pre-wrap;
	}
	.table {
		width: 685px;
		display: table;
		white-space: normal;
	}
	.description {
		margin-bottom: 10px;
	}
	.box {
		padding: 0 32px;
	}
	h4 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-weight: 500;
		line-height: 1.2;
	}
}
table {
	border-collapse: collapse;
}
td {
	white-space: normal;
	padding: 5px;
	vertical-align: top;
	border: 1px solid #000;
}

.single-page-s-s {
	width: 50%;
	margin-bottom: 10px;
}

.m-type11 {
	display: flex;
	grid-template-columns: repeat(2);
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
</style>
