<template>
	<div class="p_center">
		<com-header></com-header>
		<div class="info">
			<div class="overview">
				<div class="left"><div class="paper-title">Test 1</div></div>
				<div class="right">
					<div class="score">
						<div class="score-listen score-item">
							<div class="item-name">听力</div>
							<div class="accuracy">
								<span class="value">0%</span>
								<br />
								<span class="key">正确率</span>
							</div>
							<div>
								<span class="value">0/40</span>
								<br />
								<span class="key">正确数量</span>
							</div>
							<div class="score-num">
								<span class="value">0</span>
								<br />
								<span class="key">分数</span>
							</div>
						</div>
						<div class="divided"></div>
						<div class="score-reading score-item">
							<div class="item-name">阅读</div>
							<div class="accuracy">
								<span class="value">0%</span>
								<br />
								<span class="key">正确率</span>
							</div>
							<div>
								<span class="value">0/40</span>
								<br />
								<span class="key">正确数量</span>
							</div>
							<div class="score-num">
								<span class="value">0</span>
								<br />
								<span class="key">分数</span>
							</div>
						</div>
						<div class="divided"></div>
						<div class="score-writing score-item">
							<div class="item-name">写作</div>
							<div class="writin-btn">去评分</div>
							<div class="writin-btn" @click="showQRCode()">反馈</div>
						</div>
					</div>
					<div class="average-score">
						本站学员平均分： 听力6.5（27/40） 阅读7.0（30/40） 你打败了
						<span style="color: rgb(255, 225, 58); font-size: 18px;">0%</span>
						的学员
					</div>
				</div>
			</div>
			<div class="tabTitleBox">
				<div
					class="tab-title testRecord-title "
					:class="{ 'tab-title-active': currentIndex === 0 }"
					@click="tabSwitch(0)"
				>
					听力
				</div>
				<div
					class="tab-title correctionRecord-title "
					:class="{ 'tab-title-active': currentIndex === 1 }"
					@click="tabSwitch(1)"
				>
					阅读
				</div>
				<div
					class="tab-title correctionRecord-title"
					:class="{ 'tab-title-active': currentIndex === 2 }"
					@click="tabSwitch(2)"
				>
					写作
				</div>
				<!---->
			</div>
			<div class="m-part">
				<listen v-if="currentIndex === 0"></listen>
				<reading v-if="currentIndex === 1"></reading>
				<writing v-if="currentIndex === 2"></writing>
			</div>
		</div>
		<el-dialog :visible.sync="wxCodeShow" width="30%">
			<div class="wxQrCode">
				<img src="../../assets/wx.jpg" alt="" />
			</div>
			<h3 slot="title">
				请微信扫描二维码联系老师
			</h3>
			<!-- <span slot="footer" class="dialog-footer">
				<el-button @click="wxCodeShow = false">取 消</el-button>
				<el-button type="primary" @click="wxCodeShow = false">
					确 定
				</el-button>
			</span> -->
		</el-dialog>
	</div>
</template>
<script>
import header from '@/components/Header'
import listen from './listen'
import reading from './reading'
import writing from './writing'
export default {
	components: {
		'com-header': header,
		listen,
		reading,
		writing
	},
	data() {
		return {
			currentIndex: 0,
			wxCodeShow: false
		}
	},
	methods: {
		tabSwitch(index) {
			this.currentIndex = index
		},
		showQRCode() {
			this.wxCodeShow = true
		}
	}
}
</script>

<style lang="less" scoped>
.wxQrCode img {
	max-width: 300px;
	max-height: 300px;
}
.p_center {
	padding: 0 0 160px;
	width: 100%;
	min-height: 100vh;
	background: #f6f6f6;
	overflow: hidden;
}
.info {
	padding: 20px;
	width: 1140px;
	margin: 120px auto 0;
	background: #fff;
	box-sizing: border-box;
	border-radius: 4px;
}
.overview {
	margin: 0 auto 0;
	width: 100%;
	background: url(../../assets/bg.png) no-repeat;
	background-size: 100% 100%;
	color: #fff;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 32px 0;
	.left {
		width: 156px;
		text-align: center;
		height: 110px;
		line-height: 110px;
		border-right: 1px solid hsla(0, 0%, 100%, 0.4);
	}
	.right {
		width: 942px;
		.score {
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			padding: 0 52px;
			width: 100%;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			.score-item {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				-ms-flex-pack: distribute;
				justify-content: space-around;
				.item-name {
					font-size: 16px;
					font-weight: 700;
				}
				.value {
					font-size: 18px;
				}
				.key {
					font-size: 12px;
				}
			}
			.divided {
				width: 1px;
				height: 40px;
				background: hsla(0, 0%, 100%, 0.4);
				margin: 15px;
			}
			.writin-btn {
				width: 64px;
				height: 28px;
				border: 1px solid #fff;
				border-radius: 14px;
				font-size: 12px;
				text-align: center;
				line-height: 28px;
				cursor: pointer;
			}
		}
		.average-score {
			margin: 20px auto 0;
			width: 830px;
			height: 42px;
			line-height: 42px;
			border-radius: 42px;
			background: rgba(27, 179, 109, 0.6);
			font-size: 14px;
			text-align: center;
		}
	}
}

.tabTitleBox {
	margin-top: 32px;
	width: 100%;
	height: 60px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	border-bottom: 1px solid #e6e6e6;
	.tab-title {
		font-size: 16px;
		color: #939393;
		cursor: pointer;
		position: relative;
		height: 40px;
		line-height: 40px;
	}
	.tab-title + .tab-title {
		margin-left: 50px;
	}
	.tab-title-active:after {
		content: '';
		position: absolute;
		bottom: -15px;
		left: 50%;
		margin-left: -13px;
		width: 26px;
		height: 8px;
		border-radius: 4px;
		background: #29d087;
	}
	.tab-title-active {
		color: #333;
		font-weight: 600;
		font-size: 20px;
	}
}
</style>
