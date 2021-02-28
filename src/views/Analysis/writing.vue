<template>
	<div>
		<div class="m-pagegation">
			<div class="pagegation" v-for="(item, index) in topic" :key="index">
				<div class="part">Part {{ index + 1 }}</div>
				<div class="pagegation-section">
					<div v-for="(item1, index1) in item.groups" :key="index1">
						<div
							class="item"
							:class="{ 'active-item': checkObj[item1.id] }"
							@click="checkGroup(item1.id, index, item1)"
						>
							Task{{ index1 + 1 }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-for="(item2, index2) in topic" :key="index2">
			<div class="write" v-if="index2 === currentPart">
				<div class="left-content">
					<div v-for="(item, index) in item2.groups" :key="index">
						<div
							v-for="(item1, index1) in item2.groups[index].questions"
							:key="index1"
						>
							<div class="markdown-body" v-html="getHtml(item1.content)"></div>
						</div>
					</div>
				</div>
				<div class="right-content">
					<div
						class="textarea-box"
						v-for="(item, index) in item2.groups"
						:key="index"
					>
						<h3>Task{{ currentPart + 1 }}范文</h3>
						<div
							v-for="(item1, index1) in item2.groups[index].questions"
							:key="index1"
						>
							<div class="markdown-body" v-html="getHtml(item1.analysis)"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
import { writeAnswer, getWrite } from '@/server/api'
export default {
	data() {
		return {
			topic: '',
			userAnswer: '',
			id: '',
			checkObj: {},
			currentItem: '',
			pagegationId: [],
			currentPart: 0
		}
	},
	methods: {
		writeAnswer() {
			writeAnswer({
				id: this.$utils.getSession('curInfo').id
			}).then((res) => {
				this.userAnswer = this.userAnswer
				console.log(res)
			})
		},
		getListenAnalize() {
			if (this.$route.query.id) {
				this.id = this.$route.query.id
			} else {
				this.id = this.$utils.getSession('currentId')
			}
			getWrite({
				id: this.id
			}).then((res) => {
				this.topic = res
				this.topic.forEach((item, index) => {
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
		getHtml(item1) {
			let txt = marked(item1)
			return txt
		},
		checkGroup(id, index, item1) {
			for (let key in this.checkObj) {
				this.$set(this.checkObj, key, false)
			}
			this.$set(this.checkObj, id, true)
			this.currentPart = index
			this.currentItem = item1
			this.$forceUpdate()
		}
	},
	mounted() {
		this.getListenAnalize()
		this.writeAnswer()
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
	margin-top: 32px;
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
</style>
