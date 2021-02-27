<template>
	<div class="warapper">
		<div class="c_partBar col mb-2 title">
			<h3>Part {{ currentPart }}</h3>
		</div>
		<!-- 听力 -->
		<div class="single-page" v-if="currentSection === 'sound'">
			<div v-for="(item, index) in topic" :key="index">
				<sound
					ref="sound"
					:groups="topic[index]"
					v-show="currentPart === index + 1"
				></sound>
			</div>
		</div>
		<!-- 阅读 -->
		<div class="double-page" v-if="currentSection === 'read'">
			<div v-for="(item1, index1) in topic" :key="index1">
				<read
					ref="read"
					:topic="topic[index1]"
					v-show="currentPart === index1 + 1"
				></read>
			</div>
		</div>
		<!-- 写作 -->
		<div class="double-page write" v-if="currentSection === 'write'">
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
			currentSection: 'sound'
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
		this.currentSection = this.$utils.getSession('currentSection')
		// this.$refs.sound.groups = this.topic[this.currentPart - 1]
	},
	methods: {
		partChange(e) {
			this.currentPart = +e
			switch (this.currentSection) {
				case 'sound':
					this.$refs.sound.groups = this.topic[this.currentPart - 1]
					break
				case 'read':
					this.$refs.read.groups = this.topic[this.currentPart - 1]
					break
			}
		}
	}
}
</script>

<style lang="less" scoped>
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
