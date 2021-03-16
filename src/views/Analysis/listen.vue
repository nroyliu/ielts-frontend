<template>
	<div>
		<div class="m-pagegation">
			<div class="pagegation" v-for="(item, index) in data" :key="index">
				<div class="part">Part {{ index + 1 }}</div>
				<div class="pagegation-section">
					<div v-for="(item1, index1) in data[index].groups" :key="index1">
						<div
							class="item"
							:class="{ 'active-item': checkObj[item1.id] }"
							@click="checkGroup(item1.id, index, item1)"
						>
							Q{{ getSection(item1.questions) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-for="(item, index) in data" :key="index">
			<div class="main" v-if="currentPart === index">
				<div class="m-left">
					<div class="audio-box">
						<div></div>
						<div class="propgress" style="width:300px">
							<audio :src="item.audio_url" :id="item.id" controls></audio>
						</div>
						<div class="timeBox"></div>
					</div>
					<div data-v-76ecd7b3 class="audioTitle">
						<div data-v-76ecd7b3 class="title">听力原文</div>
						<div data-v-76ecd7b3 class="handle">
							<el-switch
								v-model="showOriginal"
								active-color="#29d087"
							></el-switch>
						</div>
					</div>
					<div v-for="(item1, index1) in item.audio_lrc" :key="index1">
						<div class="txt">
							<span>{{ item1.dialog }}</span>
						</div>
						<div class="txt" v-show="showOriginal">
							<span>{{ item1.paraphrase }}</span>
						</div>
					</div>
				</div>
				<div class="m-right">
					<h5>Question{{ getSection(currentItem.questions) }}</h5>
					<div v-if="currentItem.content">
						<div
							class="markdown-body table"
							v-html="disposeMarkdown(getHtml(currentItem.content))"
						></div>
					</div>
					<div v-if="currentItem.questions[0].content">
						<div
							style="white-space:pre-wrap"
							class="markdown-body"
							v-for="item1 in currentItem.questions"
							:key="item1.id"
							v-html="dispose2(getHtml(item1.content), item1)"
						></div>
						<div>
							<div v-for="(item, index) in currentItem.options" :key="index">
								<span class="txt">{{ item.option }}</span>
								<span class="txt">{{ item.text }}</span>
							</div>
						</div>
					</div>
					<div
						style="margin-top:10px"
						v-if="!~currentItem.questions[0].content.indexOf(']]')"
					>
						<div
							style="font-size: 14px;color:#333;margin-bottom:10px"
							v-for="(item, index) in currentItem.questions"
							:key="index"
						>
							<div>
								<span style="margin-right:10px" v-if="item.content">
									{{ getIndex(item.id) }}
								</span>
								<span>{{ item.content }}</span>
							</div>
							<div v-if="item.content">
								<div
									style="margin-left:15px"
									v-for="item1 in item.options"
									:key="item1.option"
								>
									<span>{{ item1.option }}</span>
									<span style="margin-left:15px">{{ item1.text }}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="answers">
						<div class="myAnswer">
							<div>我的答案：</div>
							<div style="display:flex;flex-wrap: wrap;margin-top: 10px;">
								<span
									style="margin-right: 10px"
									class="wrong"
									v-for="(item, index) in currentItem.questions"
									:class="{ success: getAnswer(item).bool }"
									:key="index"
								>
									<b>{{ getIndex(item.id) }}.</b>
									{{ getAnswer(item).txt }}
								</span>
							</div>
						</div>
						<div class="Answer">
							<div>正确答案：</div>
							<div style="display:flex;flex-wrap: wrap;margin-top: 10px;">
								<span
									style="margin-right: 10px"
									class=""
									v-for="(item, index) in currentItem.questions"
									:key="index"
								>
									<b>{{ getIndex(item.id) }}.</b>
									{{ item.answer }}
								</span>
							</div>
						</div>
					</div>
					<div class="analysis" v-if="currentItem.questions[0].analysis">
						<div class="analysis-title">解析</div>
						<div class="analysis-con">
							<div v-for="(item, index) in currentItem.questions" :key="index">
								<pre
									style="margin-right: 10px; white-space: pre-line"
									class
								><b>{{ getIndex(item.id) }}. </b>{{item.analysis}} </pre>
								<br />
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
import { getListen, listenAnswer } from '@/server/api'
const ele = null
export default {
	data() {
		return {
			data: {},
			pagegationId: [],
			checkObj: {},
			currentPart: 0,
			progressValue: 0,
			isPlay: false,
			audioInfo: {
				duration: 0,
				current: 0
			},
			ele: '',
			showOriginal: false,
			currentItem: {},
			userAnswer: ''
		}
	},
	methods: {
		getListenAnalize() {
			let id = this.$utils.getSession('currentId')
			getListen({
				id
			}).then((res) => {
				this.data = res
				this.data.forEach((item, index) => {
					item.groups.forEach((item1, index1) => {
						item1.isCheck = false
						if (index === 0 && index1 === 0) {
							this.checkObj[item1.id] = true
							this.currentItem = item1
						} else {
							this.checkObj[item1.id] = false
						}
						item1.questions.forEach((item2) => {
							this.pagegationId.push(item2.id)
						})
					})
				})
			})
		},
		// 获取区间 Questions 1-10
		getSection(arr) {
			let begin = this.pagegationId.indexOf(arr[0].id)
			let end = this.pagegationId.indexOf(arr[arr.length - 1].id)
			if (begin == end) {
				return begin + 1
			}
			return `${begin + 1} - ${end + 1}`
		},
		checkGroup(id, index, item1) {
			for (let key in this.checkObj) {
				this.$set(this.checkObj, key, false)
			}
			this.$set(this.checkObj, id, true)
			this.currentPart = index
			this.currentItem = item1
			this.$forceUpdate()
		},
		// 获取html格式
		getHtml(markdown) {
			let txt = marked(markdown)
			return txt
		},
		disposeMarkdown(html) {
			let exampleRule = /\[u\[(.*)\]\]/
			if (!!html.match(exampleRule)) {
				html = html.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				html = html.replace(']]', '</span>')
			}

			// 两个ii
			this.currentItem.questions.forEach((item) => {
				if (~html.indexOf('[i[=NO=]]') || ~html.indexOf('[ii[=NO=]')) {
					let rule = /\[i*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
					if (html.match(rule) == null) return html
					let flag = html.match(rule)[0]
					if (~flag.indexOf('[ii[=NO=]')) {
						let bool = false
						let text = flag.replace('[ii[=NO=]', '').replace('[=NO=]]', '')
						this.userAnswer.answer.forEach((item1) => {
							// 答了题
							if (item.id === item1.question_id && item1.is_correct) {
								html = html.replace(
									flag,
									`<span>${this.pagegationId.indexOf(item.id) +
										1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-circle-check"></i></span>${text}<span>${this.pagegationId.indexOf(
										item.id
									) +
										1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-circle-check"></i></span>`
								)
								bool = true
							}
							if (item.id === item1.question_id && !item1.is_correct) {
								html = html.replace(
									flag,
									`<span>${this.pagegationId.indexOf(item.id) +
										1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-el-icon-circle-close"></i></span>${text}<span>${this.pagegationId.indexOf(
										item.id
									) +
										1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-el-icon-circle-close"></i></span>`
								)
								bool = true
							}
						})
						if (bool) return
						// 为空
						html = html.replace(
							flag,
							`<span>${this.pagegationId.indexOf(item.id) +
								1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>${text}<span>${this.pagegationId.indexOf(
								item.id
							) +
								1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
						)
						return
					}

					if (~flag.indexOf('[i[=NO=]')) {
						let bool = false
						//一个i
						this.userAnswer.answer.forEach((item1) => {
							// 答题了
							if (item.id === item1.question_id && item1.is_correct) {
								html = html.replace(
									'[i[=NO=]]',
									`<span>${this.pagegationId.indexOf(item.id) +
										1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-circle-check"></i></span>`
								)
								bool = true
							}
							if (item.id === item1.question_id && !item1.is_correct) {
								html = html.replace(
									'[i[=NO=]]',
									`<span>${this.pagegationId.indexOf(item.id) +
										1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
										item1.answer
									}  <i class="el-icon-el-icon-circle-close"></i></span>`
								)
								bool = true
							}
						})
						if (bool) return

						html = html
							.replace(
								'[i[=NO=]]',
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
							)
							// .replace(']', '')
						return html
					}
				}
				if (~html.indexOf('[d[=NO=]')) {
					let bool = false
					let rule = /\[d*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
					if (html.match(rule) == null) return html
					let flag = html.match(rule)[0]
					//一个i
					this.userAnswer.answer.forEach((item1) => {
						// 答题了
						if (item.id === item1.question_id && item1.is_correct) {
							html = html.replace(
								'[d[=NO=]]',
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-circle-check"></i></span>`
							)
							bool = true
						}
						if (item.id === item1.question_id && !item1.is_correct) {
							html = html.replace(
								'[d[=NO=]]',
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-el-icon-circle-close"></i></span>`
							)
							bool = true
						}
					})
					if (bool) return
					html = html.replace(
						flag + ']',
						`<span>${this.pagegationId.indexOf(item.id) +
							1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
					)
					return
				}
			})
			return html
		},
		// 获取当前题号
		getIndex(id) {
			return this.pagegationId.indexOf(id) + 1
		},
		listenAnswer() {
			listenAnswer({
				id: this.$utils.getSession('curInfo').id
			}).then((res) => {
				this.userAnswer = res
			})
		},
		getAnswer(item) {
			let txt = ''
			let bool = ''
			this.userAnswer.answer.forEach((item1) => {
				if (item1.question_id == item.id) {
					txt = item1.answer
					bool = item1.is_correct
				}
			})
			return { txt, bool }
		},
		dispose2(html, item) {
			let exampleRule = /\[u\[(.*)\]\]/
			if (!!html.match(exampleRule)) {
				html = html.replace(
					'[u[',
					'<span style="border:1px solid #ccc;height:30px; line-height:30px; text-align:center;diplay:block">'
				)
				html = html.replace(']]', '</span>')
			}
			if (~html.indexOf('[i[=NO=]]') || ~html.indexOf('[ii[=NO=]')) {
				let rule = /\[i*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
				if (html.match(rule) == null) return html
				let flag = html.match(rule)[0]
				if (~flag.indexOf('[ii[=NO=]')) {
					let bool = false
					let text = flag.replace('[ii[=NO=]', '').replace('[=NO=]]', '')
					this.userAnswer.answer.forEach((item1) => {
						// 答了题
						if (item.id === item1.question_id && item1.is_correct) {
							html = html.replace(
								flag,
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-circle-check"></i></span>${text}<span>${this.pagegationId.indexOf(
									item.id
								) +
									1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-circle-check"></i></span>`
							)
							bool = true
						}
						if (item.id === item1.question_id && !item1.is_correct) {
							html = html.replace(
								flag,
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-el-icon-circle-close"></i></span>${text}<span>${this.pagegationId.indexOf(
									item.id
								) +
									1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-el-icon-circle-close"></i></span>`
							)
							bool = true
						}
					})
					if (bool) return html
					// 为空
					html = html.replace(
						flag,
						`<span>${this.pagegationId.indexOf(item.id) +
							1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>${text}<span>${this.pagegationId.indexOf(
							item.id
						) +
							1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
					)
					return html
				}

				if (~flag.indexOf('[i[=NO=]')) {
					let bool = false
					//一个i
					this.userAnswer.answer.forEach((item1) => {
						// 答题了
						if (item.id === item1.question_id && item1.is_correct) {
							html = html.replace(
								'[i[=NO=]]',
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-circle-check"></i></span>`
							)
							bool = true
						}
						if (item.id === item1.question_id && !item1.is_correct) {
							html = html.replace(
								'[i[=NO=]]',
								`<span>${this.pagegationId.indexOf(item.id) +
									1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
									item1.answer
								}  <i class="el-icon-el-icon-circle-close"></i></span>`
							)
							bool = true
						}
					})
					if (bool) return html
					html = html.replace(
						flag + ']',
						`<span>${this.pagegationId.indexOf(item.id) +
							1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
					)
				}
			}

			if (~html.indexOf('[d[=NO=]')) {
				let bool = false
				let rule = /\[d*\[\=NO\=\]((.*)\[\=NO\=\]\])?/
				if (html.match(rule) == null) return html
				let flag = html.match(rule)[0]
				//一个i
				this.userAnswer.answer.forEach((item1) => {
					// 答题了
					if (item.id === item1.question_id && item1.is_correct) {
						html = html.replace(
							'[d[=NO=]]',
							`<span>${this.pagegationId.indexOf(item.id) +
								1}.  </span><span style="color:#29d087;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
								item1.answer
							}  <i class="el-icon-circle-check"></i></span>`
						)
						bool = true
					}
					if (item.id === item1.question_id && !item1.is_correct) {
						html = html.replace(
							'[d[=NO=]]',
							`<span>${this.pagegationId.indexOf(item.id) +
								1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;">  ${
								item1.answer
							}  <i class="el-icon-el-icon-circle-close"></i></span>`
						)
						bool = true
					}
				})
				if (bool) return html
				html = html.replace(
					flag + ']',
					`<span>${this.pagegationId.indexOf(item.id) +
						1}.  </span><span style="color:#ff4c4c;min-width:60px;border-bottom:1px dashed #999;text-align:right;"> <i class="el-icon-circle-close"></i></span>`
				)
			}
			return html
		}
	},
	filters: {
		realFormatSecond(second) {
			var secondType = typeof second
			if (secondType === 'number' || secondType === 'string') {
				second = parseInt(second)
				var mimute = Math.floor(second / 60)
				second = second - mimute * 60
				return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
			} else {
				return '00:00'
			}
		}
	},
	created() {
		this.getListenAnalize()
		this.listenAnswer()
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
	}
}
</script>

<style lang="less" scoped>
.table {
	width: 480px;
	white-space: nowrap;
}
.m-pagegation {
	margin-top: 32px;
	display: flex;
	align-items: center;
	.pagegation {
		margin-right: 18px;
		display: flex;
		align-items: center;
		.part {
			font-size: 14px;
			color: #666;
			font-weight: 700;
			margin-right: 18px;
		}
		.pagegation-section {
			display: flex;
			align-items: center;
			.item {
				margin-right: 10px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 62px;
				height: 24px;
				border: 1px solid #ccc;
				text-align: center;
				line-height: 24px;
				border-radius: 2px;
				font-size: 12px;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;
				cursor: pointer;
				border-radius: 2px;
				text-align: center;
			}
			.active-item {
				background: #29d087;
				color: #fff;
				border: none;
			}
		}
	}
}

.main {
	display: flex;
	padding: 20px 0;
	width: 100%;
	height: 800px;
	box-sizing: border-box;
	.txt {
		padding: 20px;
		font-size: 14px;
		color: #333;
	}
	.m-left {
		padding-right: 20px;
		width: 50%;
		border-right: 1px solid #ececec;
		// white-space: nowrap;
		height: 750px;
		overflow-y: auto;
		box-sizing: border-box;
		.audio-box {
			padding: 0 20px;
			display: flex;
			align-items: center;
			height: 78px;
			background: #f2f2f2;
			box-sizing: border-box;
			i {
				width: 34px;
				height: 34px;
				font-size: 30px;
				cursor: pointer;
			}
			.propgress {
				margin-left: 20px;
				position: relative;
				.el-slider__bar {
					background: #29d087;
				}
			}
			.timeBox {
				margin-left: 30px;
				font-size: 12px;
				color: #999;
			}
		}
	}
	.m-right {
		padding: 0 20px;
		width: 50%;
		// white-space: nowrap;
		height: 750px;
		overflow-y: auto;
		box-sizing: border-box;
	}
	.audioTitle {
		font-size: 14px;
		color: #333;
		font-weight: 700;
		text-align: left;
		margin: 30px 0 18px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 0 20px;
	}
	pre {
		font-size: 16px;
	}
	.answers {
		width: 100%;
		background: #f5f5f5;
		padding: 20px;
		border-radius: 5px;
		font-size: 12px;
		box-sizing: border-box;
		span {
			margin-right: 10px;
			display: block;
			font-size: 14px;
		}
		.myAnswer {
			margin-bottom: 20px;
		}
		.wrong {
			color: #ff4c4c;
		}
		.success {
			color: #29d087;
		}
	}
	.analysis {
		margin-top: 28px;
		.analysis-title {
			font-size: 14px;
			color: #333;
			font-weight: 700;
			margin-bottom: 14px;
		}
	}
}
</style>
<style>
ul {
	white-space: pre-wrap;
}
td,
tr,
thead,
tbody {
	width: 100%;
}
</style>
