<template>
	<div class="wrapper">
		<com-header></com-header>
		<div class="content">
			<div class="left">
				<el-card class="box-card">
					<div class="c_mock">
						<div class="mock_title">
							<span>模拟机考</span>
							<el-tooltip class="item" effect="dark" placement="bottom-end">
								<template #content>
									<div class="warnning">
										模拟机考使用须知
										<br />
										<br />
										模拟机考为【限时全真模拟考试】，在测试前，请注意以下事项
										<br />
										<br />
										1
										考试计时：一旦开始考试后，就会开始计时，中途不能暂停。听力部分计时为音频时间+2min检查时间（约在25
										- 35分钟）；阅读部分计时
										<br />
										60min；写作部分计时60min。如果中途退出（关闭窗口或网络断开等），之前填写的答案将会自动保存。在机考网页“个人中心
										- 模考记录中”，
										<br />
										可以找到作答到一半的题目记录，并可以继续考试。继续考试的倒计时会承接上次退出时的剩余时间。
										<br />
										<br />
										2
										答卷提交：每科目倒计时结束后会自动提交并进入下一科目；或点击右上角Finish
										Section可提前提交当前科目的答卷，提交后将不可返回修改此科目答案，自动进入下一科目的作答。
										<br />
										<br />
										3
										成绩报告：当一套题目完整提交后（听力、阅读、写作三部分都完成并提交），将会自动跳转成绩报告，可以看到自己的听力、阅读分数和错题详情。如果未100%提交答卷，不会生成成绩报告。
										<br />
										<br />
										4 答题前准备：
										<br />
										1）在进入模考前，请确认自己的网络连接正常，耳机或电脑声音播放正常，不要将电脑或耳机处于静音状态。
										<br />
										2）关闭自行安装的智能输入法，将输入法调节到原始的英文输入状态，确认无词汇联想等功能，否则将影响你的真实成绩。
										<br />
										3）如果安装了一些翻译插件，如有道翻译等，具有网页及文字自动翻译功能，请提前将插件关闭或退出，避免影响正常做题。
										<br />
										<br />
										<br />
										祝宝宝取得好成绩！
										<br />
									</div>
								</template>
								<span class="el-dropdown-link">
									<i class="el-tooltip iconfont el-icon-question" tabindex="0">
										模考须知
									</i>
								</span>
							</el-tooltip>
						</div>
						<div class="mock_filter">
							<div class="filter_item">
								<div class="item_title">考试类型</div>
								<div
									class="item_filter"
									:class="{ 'item_filter-active': !currentType }"
									@click="checkType('')"
								>
									全部
								</div>
								<div
									class="item_filter"
									v-for="(item, index) in subType"
									:key="index"
									@click="checkType(item.id)"
									:class="{ 'item_filter-active': currentType === item.id }"
								>
									{{ item.name }}
								</div>
							</div>
							<div class="filter_item non-border">
								<div class="item_title">题目来源</div>
								<div
									class="item_filter"
									:class="{ 'item_filter-active': !currentOri }"
									@click="checkOrigin('')"
								>
									全部
									<!---->
								</div>
								<div
									class="item_filter"
									v-for="(item, index) in originOption"
									:key="index"
									@click="checkOrigin(item.id)"
									:class="{ 'item_filter-active': currentOri === item.id }"
								>
									{{ item.name }}
									<div
										class="freeTag"
										v-if="item.is_need_unlock"
										style="right: -4em;"
									>
										<div class="triangle"></div>
										{{ item.tag }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-for="(item, index) in paper" :key="index">
						<div class="most-test" v-if="item.length > 0">
							<div class="model_title">
								<div>{{ item[0].originName }}</div>
							</div>
							<el-collapse>
								<el-collapse-item
									:disabled="!!~shouldPay.indexOf(paper[index][0].material_id)"
									v-for="(item1, index1) in item"
									:key="index1"
								>
									<template #title>
										<div
											style="padding-left: 10px;color:#303133;font-size:13px"
										>
											{{ `· ${item1.name}` }}
										</div>
									</template>
									<div
										class="item-paper"
										v-for="(item2, index2) in item1.papers"
										:key="index2"
									>
										<div class="paper-name">{{ item2.name }}</div>
										<div class="practice_time">
											练习人次 {{ item2.exercise_count }}
										</div>
										<!---->
										<div class="practice_progress">
											<span v-if="item2.record != null">
												已完成 {{ item2.record | disposeData }}
											</span>
											<span v-else>已完成 0%</span>
										</div>
										<div class="practice_button" @click="beginExam(item2.id)">
											开始考试
										</div>
									</div>
								</el-collapse-item>
							</el-collapse>
							<div
								class="pop"
								v-if="~shouldPay.indexOf(paper[index][0].material_id)"
							></div>
							<div
								class="unlockButton"
								v-if="~shouldPay.indexOf(paper[index][0].material_id)"
								@click="showPop()"
							>
								付费购买解锁
							</div>
						</div>
					</div>

					<!-- 禁用 -->
					<!-- <div class="most-test">
						<div class="model_title">
							<div>高频真题体验卷（6套）</div>
						</div>
						<el-collapse>
							<el-collapse-item disabled>
								<template #title>
									<div style="padding-left: 10px;color:#303133;font-size:13px">
										{{ `· 高频真题体验卷` }}
									</div>
								</template>
							</el-collapse-item>
						</el-collapse>
						<div class="unlockButton">付费购买解锁</div>
					</div> -->
				</el-card>
			</div>
			<right></right>
		</div>

		<el-dialog :visible.sync="showIptPop" :modal="false" width="50%">
			<h3 slot="title">
				请输入激活码
			</h3>
			<div class="activationCodeBox">
				<div class="inputBox">
					<input
						type="text"
						v-model="activationCode"
						placeholder="请输入激活码"
					/>
					<button @click="activeTopic()" class="submitButton">
						提交
					</button>
				</div>
			</div>
			<div class="introduce">
				<div class="title">激活码获取方式</div>
				<!---->
				<div class="mode" style="margin-top: 40px;">
					<!---->
					<!-- <div
						
						class="modeCon"
						style="justify-content: space-between;"
					>
						<div >趴趴天猫旗舰店优惠购买</div>
						<div  class="buyButton">点此购买</div>
					</div> -->
					<div class="wxQrCode">
						<img src="../../assets/wx.jpg" alt="" />
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import header from '@/components/Header'
import right from './right'
import {
	getSub,
	getOriginalOptions,
	getPaper,
	startExam,
	activeTopic
} from '@/server/api'
export default {
	components: {
		'com-header': header,
		right
	},
	data() {
		return {
			subType: '',
			originOption: '',
			currentType: '',
			currentOri: '',
			paper: [],
			shouldPay: [],
			showIptPop: false,
			activationCode: ''
		}
	},
	methods: {
		beginExam(id) {
			this.startExam(id)
		},
		startExam(id) {
			startExam({
				paper_id: id
			}).then((res) => {
				// this.$router.push({
				// 	path: '/main',
				// 	query: {
				// 		id: id
				// 	}
				// })
				window.open(`http://${location.host}/main`)
				sessionStorage.currentSection = JSON.stringify('sound')
				this.$utils.setSession('currentId', id)
				this.$utils.setSession('curInfo', res)
			})
		},
		getSub() {
			getSub().then((res) => {
				this.subType = res
				this.getOriginalOptions()
			})
		},
		getOriginalOptions() {
			getOriginalOptions().then((res) => {
				this.originOption = res
				let arr = res.filter((item) => item.is_need_unlock === 1)
				this.shouldPay = []
				arr.forEach((item) => {
					this.shouldPay.push(item.id)
				})
				this.getPaper()

				console.log(this.shouldPay)
			})
		},
		getPaper() {
			this.paper = []
			getPaper({
				subject_id: this.currentType,
				material_id: this.currentOri
			}).then((res) => {
				this.originOption.forEach((item) => {
					let arr = []
					let obj = {}
					res.forEach((item1) => {
						if (item.id === item1.material_id) {
							obj = {
								originName: item.name,
								...item1
							}
							arr.push(obj)
						}
					})
					this.paper.push(arr)
				})
			})
		},
		checkOrigin(id) {
			this.currentOri = id
			this.getPaper()
		},
		checkType(id) {
			this.currentType = id
			this.getPaper()
		},
		showPop() {
			this.showIptPop = true
		},
		activeTopic() {
			activeTopic({
				card: this.activationCode
			}).then((res) => {
				console.log(res)
				this.$message({
					type: 'success',
					message: res.message
				})
				this.getOriginalOptions()
				this.showIptPop = false
			})
		}
	},
	filters: {
		disposeData(data) {
			let value = ''
			if (data.is_finished) {
				return '100%'
			}
			data.details.forEach((item, index) => {
				if (item.is_finished) {
					value = `${(index + 1) * 33}%`
				}
			})
			return value ? value : '0%'
		}
	},
	mounted() {
		this.getSub()
	}
}
</script>

<style lang="less" scoped>
.wrapper {
	width: 100%;
	min-height: 100vh;
	background: #f6f6f6;
	overflow: auto;

	.content {
		width: 1140px;
		margin: 110px auto 184px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
		.left {
			width: 854px;
			min-height: 100%;
			.c_mock {
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				width: 100%;
				// padding: 20px 30px 40px;
				background: #fff;
				color: #ccc;
				font-size: 13px;
				.mock_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 20px;
					color: #333;
					font-weight: 600;
					text-align: left;
				}
				.mock_filter {
					width: 100%;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					margin-top: 20px;
					padding: 0 20px;
					border: 1px solid #e6e6e6;
					border-left: none;
					border-right: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					font-size: 12px;
					color: #2c3e50;
					.filter_item {
						width: 100%;
						height: 44px;
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						border-bottom: 1px dashed #e6e6e6;
						&.non-border {
							border-bottom: none;
						}
						.item_title {
							margin-right: 36px;
							float: left;
							-ms-flex-negative: 0;
							flex-shrink: 0;
						}
						.item_filter {
							cursor: pointer;
							padding: 0 0.5em;
							margin-right: 4em;
							-ms-flex-negative: 0;
							flex-shrink: 0;
							position: relative;
							.freeTag {
								background: #ff3e3e;
								color: #fff;
								font-size: 12px;
								padding: 0 6px;
								height: 16px;
								border-radius: 100px;
								position: absolute;
								top: -48%;
								right: -4em;
								-webkit-transform: scale(0.8);
								transform: scale(0.8);
							}
							.freeTag :after {
								content: '';
								position: absolute;
								top: 90%;
								left: -9px;
								width: 21px;
								height: 7px;
								border-width: 0;
								border-style: solid;
								border-color: transparent;
								border-right-width: 6px;
								border-right-color: currentColor;
								border-radius: 0 0 34px 0;
								color: #ff3e3e;
							}
						}
						.item_filter-active {
							background: #29d087;
							color: #fff;
							border-radius: 12px;
						}
					}
				}
			}
			.isdark {
				background: #303133;
				color: #fff;
			}
			.iconfont {
				color: #ccc;
				cursor: pointer;
				font-size: 13px;
			}
			.iconfont:hover {
				color: #29d087;
				cursor: pointer;
			}
			.model_title {
				width: 100%;
				font-size: 14px;
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				text-align: left;
				background: #ecf9f3;
				height: 34px;
				line-height: 34px;
				padding-left: 10px;
				-webkit-box-pack: justify;
				-ms-flex-pack: justify;
				justify-content: space-between;
			}
			.most-test {
				position: relative;
				.pop {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.5);
				}
				.item-paper {
					display: flex;
					height: 75px;
					border-bottom: 1px solid #e6e6e6;
					-webkit-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					-ms-flex-pack: distribute;
					justify-content: space-around;
					color: #333;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					.paper-name,
					.practice_progress,
					.practice_time {
						-webkit-box-flex: 1;
						-ms-flex: 1;
						flex: 1;
						text-align: center;
					}
					.practice_button {
						width: 80px;
						height: 36px;
						border: 1px solid #29d087;
						color: #29d087;
						text-align: center;
						line-height: 36px;
						font-size: 12px;
						border-radius: 4px;
						cursor: pointer;
					}
				}
				.unlockButton {
					width: 120px;
					height: 42px;
					background: #ff5e5e;
					border-radius: 4px;
					color: #fff;
					line-height: 42px;
					text-align: center;
					position: absolute;
					top: 20%;
					margin-left: -60px;
					left: 50%;
					cursor: pointer;
					z-index: 1;
				}
			}
		}
	}
}
.warnning {
	max-width: 800px;
	font-size: 12px;
}

.activationCodeBox {
	width: 100%;
	.title {
		font-size: 18px;
		color: #333;
		font-weight: 700;
		text-align: left;
		margin-bottom: 20px;
	}
	.inputBox {
		width: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		input {
			width: 476px;
			height: 40px;
			border: 1px solid #e6e6e6;
			outline: none;
			font-size: 12px;
			padding-left: 5px;
		}
		.submitButton {
			border: none;
			outline: none;
			cursor: pointer;
			width: 104px;
			height: 40px;
			background: #29d087;
			color: #fff;
			line-height: 40px;
			text-align: center;
			border-radius: 2px;
			margin-left: -3px;
		}
	}
}
.introduce {
	margin-top: 40px;
	.title {
		width: 100%;
		text-align: left;
		font-size: 18px;
		color: #333;
		font-weight: 700;
		margin-bottom: 18px;
	}
	.modeCon {
		font-size: 16px;
		color: #666;
		margin-top: 18px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		.buyButton {
			width: 72px;
			height: 30px;
			border: 1px solid #29d087;
			color: #29d087;
			text-align: center;
			line-height: 30px;
			font-size: 12px;
			cursor: pointer;
			border-radius: 2px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
	}
}
</style>
