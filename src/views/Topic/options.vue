<template>
	<div class="foot">
		<div class="current-option-status">
			<div class="rect">
				<i class="el-icon-check"></i>
			</div>
			<div class="txt">Review</div>
		</div>
		<div class="m-option-list">
			<ul v-for="(item,index) in topic" :key="index">
				<li class="m-part">Part{{index+1}}:</li>
				<li class v-for="(item,index1) in topic[index].groups" :key="index1">
					<div
						class="program"
						:class="{'blue': currentPage === (pagegation.indexOf(topic[index].groups[index1].questions[index2].id)+1)}"
						style="display:inline-block"
						v-for="(item,index2) in topic[index].groups[index1].questions"
						:key="index2"
					>
						<!-- 123对应part-->
						<a
							:ref="`${topic[index].groups[index1].questions[index2].id}`"
							:href="`#${topic[index].groups[index1].questions[index2].id}`"
							@click="selectItem(pagegation.indexOf(topic[index].groups[index1].questions[index2].id))"
						>{{pagegation.indexOf(topic[index].groups[index1].questions[index2].id)+1}}</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="pagegation">
			<div @click="pre()" class="pre">
				<i class="el-icon-back"></i>
			</div>
			<div class="pre" @click="next()">
				<i class="el-icon-right"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	filter: {},
	data() {
		return {
			topic: [],
			pagegation: [],
			currentPage: 1,
			part: {},
		}
	},
	mounted() {
		this.topic = JSON.parse(sessionStorage.topic)
		this.topic.forEach((item, index) => {
			this.part[`${index + 1}`] = []
			this.topic[index].groups.forEach((item1, index1) => {
				this.topic[index].groups[index1].questions.forEach((item2, index2) => {
					this.pagegation.push(item2.id)
					this.part[`${index + 1}`].push(item2.id)
				})
			})
		})
	},
	methods: {
		// 选择
		selectItem(index) {
			this.currentPage = index + 1
			this.$emit('partChaneg', this.filterPart(this.pagegation[index]))
		},
		// 下一题
		pre() {
			if (this.currentPage == 1) return
			let key = this.pagegation[this.currentPage - 2]
			this.$refs[key][0].click()
			this.$emit('partChaneg', this.filterPart(key))
		},
		// 上一题
		next() {
			if (this.currentPage === this.pagegation.length) return
			let key = this.pagegation[this.currentPage]
			this.$refs[key][0].click()
			this.$emit('partChaneg', this.filterPart(key))
		},
		// 返回当前题目在那一部分
		filterPart(id) {
			for (let key in this.part) {
				if (~this.part[key].indexOf(id)) {
					return key
				}
			}
		},
	},
}
</script>

<style lang="less" scoped>
.foot {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
}
.current-option-status {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 75px;
	height: 75px;
	border: 1px solid #ccc;
	border-radius: 8px;
	.rect {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border: 1px solid #000;
		border-radius: 4px;
	}
	.txt {
		margin-top: 4px;
	}
}

.m-option-list {
	padding: 8px;
	box-sizing: border-box;
	width: 60%;
	height: 75px;
	border: 1px solid #ccc;
	border-radius: 8px;
	-webkit-box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
	box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
	background-image: linear-gradient(0deg, #fff, #dde3ee);
	overflow-x: auto;
	overflow-y: hidden;
	line-height: 54px;
	white-space: nowrap;
	ul {
		display: inline-block;
		li {
			display: inline-block;
			list-style: none;
			a {
				text-decoration: none;
				color: #fff;
			}
		}
	}
	.m-part {
		display: inline-block;
		background-color: transparent;
		color: rgba(0, 0, 0, 0.6);
		font-weight: 500;
		border: none;
		padding-right: 0;
		font-size: 20px;
	}
	.program {
		display: inline-block;
		margin: 0 4px;
		width: 32px;
		height: 32px;
		background: #565656;
		border-radius: 4px;
		color: #fff;
		font-size: 20px;
		text-align: center;
		line-height: 32px;
	}
	.blue {
		background: #b4dbf7;
	}
}

.pagegation {
	display: flex;
	.pre,
	.next {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 57px;
		width: 57px;
		background: #ededed;
		border-radius: 57px;
		font-size: 32px;
	}
}
</style>