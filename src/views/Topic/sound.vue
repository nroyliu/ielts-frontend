<template>
	<div class="sound">
		<!-- 单篇界面 -->
		<div class="m-part" v-for="(item, index) in groups.groups" :key="index">
			<div class="section">
				Questions {{ getSection(groups.groups[index].questions) }}
			</div>
			<pre class="description" v-html="getHtml(item.description)"></pre>
			<div
				class="box type32"
				v-if="item.type === 32 && !~item.content.indexOf('table')"
			>
				<pre><div class="content markdown-body"  v-html="getHtml(item.content)"></div></pre>
			</div>
			<div
				class="box type32"
				v-if="item.type === 32 && ~item.content.indexOf('table')"
			>
				<pre class="table">
					<div class="markdown-body" v-html="getHtml(item.content)">

					</div>
				</pre>
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
export default {
	data() {
		return {
			groups: [], //保存part数据
			currentPart: 1, //当前 part
			pagegation: [], // 题目id 列表
			part: {} //{part1:...part2:...}
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
	},
	filters: {},
	methods: {
		// 获取区间 Questions 1-10
		getSection(arr) {
			let begin = this.pagegation.indexOf(arr[0].id)
			let end = this.pagegation.indexOf(arr[arr.length - 1].id)
			console.log(arr[0].id, arr[arr.length - 1].id)
			return `${begin + 1} - ${end + 1}`
		},
		// 获取html格式
		getHtml(markdown) {
			console.log(markdown)
			return marked(markdown)
		}
	}
}
</script>

<style lang="less" scoped>
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
</style>
