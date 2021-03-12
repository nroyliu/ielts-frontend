<template>
	<div class="warapper">
		<div class="audio" v-if="currentSection === 'sound' && topic.length > 0">
			<audio
				ref="audio1"
				id="audio"
				:src="audioUrl"
				@timeupdate="audioPlay"
			></audio>

			<img
				ref="img"
				class="img-sound"
				@click="play()"
				src="../../assets/play.svg"
				alt=""
			/>
			<div class="progress">
				<el-slider
					v-model="value3"
					@change="change"
					:show-tooltip="false"
				></el-slider>
			</div>
		</div>
		<div class="c_partBar col mb-2 title">
			<h3>Part {{ currentPart }}</h3>
		</div>
		<!-- 听力 -->
		<div
			class="single-page"
			v-if="currentSection === 'sound'"
			:style="{ height: clientHeight + 'px' }"
		>
			<div v-for="(item, index) in topic" :key="index">
				<sound
					ref="sound"
					:groups="topic[index]"
					v-show="currentPart === index + 1"
				></sound>
			</div>
		</div>
		<!-- 阅读 -->
		<div
			class="double-page"
			v-if="currentSection === 'read'"
			:style="{ height: clientHeight + 'px' }"
		>
			<div v-for="(item1, index1) in topic" :key="index1">
				<read
					ref="read"
					:topic="topic[index1]"
					v-show="currentPart === index1 + 1"
				></read>
			</div>
		</div>
		<!-- 写作 -->
		<div
			class="double-page write"
			v-if="currentSection === 'write'"
			:style="{ height: clientHeight + 'px' }"
		>
			<div v-for="(itemwrite, indexwrite) in topic" :key="indexwrite">
				<write
					ref="write"
					:topic="topic[indexwrite]"
					v-show="currentPart === indexwrite + 1"
				></write>
			</div>
		</div>
		<foot @partChange="partChange"></foot>
	</div>
</template>

<script>
import sound from './sound'
import foot from './options'
import read from './read'
import write from './write'
export default {
	components: {
		sound,
		foot,
		read,
		write
	},
	data() {
		return {
			topic: [],
			currentPart: 1,
			currentSection: 'sound',
			audio: null,
			isPlay: false,
			audioUrl: '',
			percentage: 0,
			clientHeight: 0,
			value3: 80
		}
	},
	watch: {
		currentPart(val, old) {
			if (val !== old) {
				switch (this.currentSection) {
					case 'sound':
						this.$refs.sound.currentPart = this.currentPart
						break
					case 'read':
						this.$refs.read.currentPart = this.currentPart
						break
					case 'write':
						this.$refs.write.currentPart = this.currentPart
						break
				}
			}
		}
	},
	mounted() {
		this.topic = this.$utils.getSession('topic')
		this.currentSection = sessionStorage.currentSection
			? JSON.parse(sessionStorage.currentSection)
			: 'sound'
		if (this.currentSection == 'sound') {
			setTimeout(() => {
				this.audio = document.getElementById('audio')
				this.audioUrl = this.topic[this.currentPart - 1].audio_url
				this.$refs.img.click()
			})
		}

		this.clientHeight = this.getClientHeight() * 0.65
		// this.$refs.sound.groups = this.topic[this.currentPart - 1]
	},
	methods: {
		partChange(e) {
			this.currentPart = +e
			this.percentage = 0
			if (this.audio != null) {
				this.pause()
				this.audioUrl = this.topic[this.currentPart - 1].audio_url
				// this.isPlay = true
				setTimeout(() => {
					this.play()
				})
			}
			switch (this.currentSection) {
				case 'sound':
					this.$refs.sound.groups = this.topic[this.currentPart - 1]
					break
				case 'read':
					this.$refs.read.groups = this.topic[this.currentPart - 1]
					break
			}
		},
		audioPlay(e) {
			let duration = this.audio.duration
			let currentTime = this.audio.currentTime
			let rate = (currentTime / duration).toFixed(2)
			this.percentage = rate * 100
		},
		play() {
			// if (this.isPlay) return
			this.audio.play()
			this.isPlay = true
		},
		pause() {
			this.audio.pause()
			// this.isPlay = false
		},
		getClientHeight() {
			var clientHeight = 0
			if (document.body.clientHeight && document.documentElement.clientHeight) {
				var clientHeight =
					document.body.clientHeight < document.documentElement.clientHeight
						? document.body.clientHeight
						: document.documentElement.clientHeight
			} else {
				var clientHeight =
					document.body.clientHeight > document.documentElement.clientHeight
						? document.body.clientHeight
						: document.documentElement.clientHeight
			}
			return clientHeight
		},
		change(e) {
			this.$refs.audio1.volume = e / 100
		}
	}
}
</script>

<style lang="less" scoped>
.audio {
	position: fixed;
	top: 20px;
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transform: translateX(-50%);
	width: 300px;
	z-index: 1000;
	.btn {
		width: 34px;
		height: 34px;
		i {
			text-align: center;
			line-height: 34px;
			font-size: 30px;
			color: #fff;
			cursor: pointer;
		}
	}
	.progress {
		width: 250px;
	}
}

.img-sound {
	width: 43px;
	height: 32px;
}
.progress {
	margin-left: 20px;
	width: 150px;
}

.single-page::-webkit-scrollbar {
	display: none;
}

.double-page::-webkit-scrollbar {
	display: none;
}
.warapper {
	padding: 0 32px;
	margin-top: 10px;
	box-sizing: border-box;
	.c_partBar {
		padding: 4px 15px;
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 8px;
		-webkit-box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
		box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
		font-size: 24px;
		box-sizing: border-box;
		h3 {
			font-weight: normal;
		}
	}
	.single-page {
		margin-top: 10px;
		padding: 15px !important;
		width: 100%;
		height: 645px;
		background-image: linear-gradient(0deg, #fff, #dde3ee);
		overflow: auto;
		box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		box-sizing: border-box;
	}
	.double-page {
		margin-top: 10px;
		padding: 15px !important;
		width: 100%;
		background-image: linear-gradient(0deg, #fff, #dde3ee);
		overflow: auto;
		box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		box-sizing: border-box;
	}
	.write {
		// height: 645px;
	}
}
</style>
