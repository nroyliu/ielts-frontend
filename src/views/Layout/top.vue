<template>
	<div>
		<audio src="../../assets/test.mp3" ref="audio"></audio>
		<div class="header">
			<div class="user">
				<img src="../../assets/icon-user.svg" alt />
				<span>XXXX XXXXX - 123456</span>
			</div>
			<div>
				<div
					class="time"
					v-if="currentSection === 'sound' && getPath === '/main/testSound'"
				>
					<img class="img-sound" src="../../assets/play.svg" alt="" />
					<div class="progress">
						<el-slider
							v-model="value3"
							@change="change"
							:show-tooltip="false"
						></el-slider>
					</div>
				</div>
			</div>
			<div class="action">
				<el-button @click="finnishCur">Finish section</el-button>
				<el-button @click="showQRCode">Help</el-button>
				<el-button>Hide</el-button>
			</div>
		</div>
		<el-dialog :modal="false" :visible.sync="wxCodeShow" width="30%">
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
import { mapState } from 'vuex'
export default {
	data() {
		return {
			wxCodeShow: false,
			value3: 80,
			currentSection: ''
		}
	},
	computed: {
		...mapState(['isPlay']),
		getPath() {
			let path = ''
			path = this.$route.path
			return path
		}
	},
	watch: {
		'$store.state.isPlay': {
			handler(val) {
				if (val) {
					this.$refs.audio.play()
				} else {
					this.$refs.audio.pause()
				}
			}
		}
	},
	methods: {
		finnishCur() {
			let currentSection = JSON.parse(sessionStorage.currentSection)
			if (currentSection === 'sound') {
				currentSection = 'read'
				sessionStorage.currentSection = JSON.stringify(currentSection)
				this.$emit('updatePart')
				this.$router.replace({ path: '/main', query: this.$route.query.id })
			} else if (currentSection === 'read') {
				currentSection = 'write'
				sessionStorage.currentSection = JSON.stringify(currentSection)
				this.$emit('updatePart')
				this.$router.replace({ path: '/main', query: this.$route.query.id })
			} else {
				this.$router.replace({ path: '/analysis', query: this.$route.query.id })
			}
		},
		showQRCode() {
			this.wxCodeShow = true
		},
		change(e) {
			this.$refs.audio.volume = e / 100
		}
	},
	mounted() {
		this.currentSection = sessionStorage.currentSection
			? JSON.parse(sessionStorage.currentSection)
			: ''
	}
}
</script>

<style lang="less" scoped>
audio {
	width: 300px;
	height: 30px;
}

.wxQrCode img {
	max-width: 300px;
	max-height: 300px;
}
.img-sound {
	width: 43px;
	height: 32px;
}
.header {
	position: relative;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding: 10px 22px;
	height: 70px;
	background-image: linear-gradient(0deg, #152531, #434c51, #152531);
	.user {
		display: flex;

		img {
			width: 32px;
			height: 32px;
		}
		span {
			margin-left: 10px;
			color: #d1f0ce;
			font-size: 20px;
		}
	}
}
.time {
	display: flex;
	align-items: center;
}
.progress {
	margin-left: 20px;
	width: 150px;
}
</style>
