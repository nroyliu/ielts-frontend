<template>
	<div class="sound">
		<!-- 单篇界面 -->
		<div class="m-part" v-for="(item, index) in groups.groups" :key="index">
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
					<div v-for="(item1, index1) in item.questions" :key="index1">
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
			<!-- 听力表格填写 -->
			<div class="type34" v-if="item.type === 34 && item.mode !== 341">
				<listenImageTable
					:item="groups.groups[index]"
					@changeData="mergeData"
				></listenImageTable>
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
export default {
	components: {
		singleOption,
		listenImageTable,
		dragComponent
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
			fillIdList: [] //保存 填空 id 列表
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
			this.fillIdList.forEach((item, index) => {
				if (document.getElementsByName(item)) {
					let eleList = document.getElementsByName(item)
					eleList.forEach((item1) => {
						item1.addEventListener('keyup', (e) => {
							this.mergeData({ [item]: e.target.value })
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
			let txt = marked(markdown)
			if (item) {
				item.questions.forEach((item1, index) => {
					if (~txt.indexOf('[ii[=NO=] and [=NO=]]')) {
						txt = txt.replace(
							'[ii[=NO=] and [=NO=]]',
							`<input type="text" class="ipt-listen" id="${item1.id}"  name="${
								item1.id
							}" placeholder="${this.getIndex(
								item1.id
							)}" /> and <input type="text" class="ipt-listen" id="${
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
		getHtmlItem(markdown, id) {
			let txt = marked(markdown)
			txt = txt.replace(
				'[i[=NO=]]',
				`<input type="text" class="ipt-listen" id="${id}"  name="${id}" placeholder="${this.getIndex(
					id
				)}" />`
			)
			return txt
		}
	}
}
</script>

<style lang="less" scoped>
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
