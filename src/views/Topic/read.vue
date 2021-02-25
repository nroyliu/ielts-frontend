<template>
	<div>
		<div class="doublePage">
			<div class="left-content">
				<div>
					<div class="markdown-body" v-html="content"></div>
				</div>
			</div>
			<div class="right-content">
				<div class="m-part" v-for="(item, index) in topic.groups" :key="index">
					<div class="section">Questions {{ getSection(topic.groups[index].questions) }}</div>
					<div class="description" v-html="getHtml(item.description)"></div>
					<!-- 阅读单选 type 11 -->
					<div class="m-type11" v-if="item.type === 11">
						<div
							class="single-page-s-s"
							v-for="(selectItem, selectIndex) in topic.groups[index].questions"
							:key="selectItem.id"
						>
							<div class="topic">
								<div class="num">{{ getIndex(selectItem.id) }}</div>
								<div class="topic-txt">{{selectItem.content}}</div>
							</div>

							<div class="option" :id="topic.groups[index].questions[selectIndex].id">
								<singleOption :item="topic.groups[index].questions[selectIndex]" @changeData="mergeData"></singleOption>
							</div>
						</div>
					</div>
					<!-- 阅读单选 type 34 且不为表格-->
					<div class="m-type11" v-if="item.type === 34 && item.mode != 343 && item.mode !== 342">
						<div
							class="single-page-s-s"
							v-for="(selectItem, selectIndex) in topic.groups[index].questions"
							:key="selectItem.id"
						>
							<div class="topic">
								<div class="num">{{ getIndex(selectItem.id) }}</div>
								<div class="topic-txt">{{selectItem.content}}</div>
							</div>

							<div class="option" :id="topic.groups[index].questions[selectIndex].id">
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
						<listenImageTable :isRead="true" :item="topic.groups[index]" @changeData="mergeData"></listenImageTable>
					</div>
					<!-- 拖拽 -->
					<div class="type34" v-if="item.type === 34 && item.mode == 342">
						<dragComponent :dragData="topic.groups[index]" @changeData="mergeData"></dragComponent>
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
export default {
	components: { singleOption, listenImageTable, dragComponent },
	props: {
		topic: Object,
	},
	data() {
		return {
			content: '',
			currentPart: 1, //当前 part
			pagegation: [], // 题目id 列表
			part: {}, //{part1:...part2:...}
			answer: {},
		}
	},
	watch: {
		currentPart(val) {
			this.pagegation = this.$utils.getSession('pagegation')
			this.part = this.$utils.getSession('part')
		},
	},
	methods: {
		// 获取区间 Questions 1-10
		getSection(arr) {
			let begin = this.pagegation.indexOf(arr[0].id)
			let end = this.pagegation.indexOf(arr[arr.length - 1].id)
			return `${begin + 1} - ${end + 1}`
		},
		// 获取html格式
		getHtml(markdown) {
			return marked(markdown)
		},
		// 获取当前题号
		getIndex(id) {
			return this.pagegation.indexOf(id) + 1
		},
		// 拼接对象
		mergeData(obj) {
			Object.assign(this.answer, obj)
		},
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
		this.content = this.$markdown.toHTML(this.topic.content)
	},
}
</script>

<style lang="less" scoped>
.section {
	margin: 10px 0;
	font-weight: 700;
	font-family: Helvetica Neue Bold, Helvetica Neue, Helvetica, Roboto, Arial,
		sans-serif;
	font-size: 16px;
}
.markdown-body h2 {
	text-align: center;
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

.single-page-s-s {
	margin-bottom: 10px;
}
</style>