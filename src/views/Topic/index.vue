<template>
	<div class="warapper">
		<div class="c_partBar col mb-2 title">
			<h3>Part {{ currentPart }}</h3>
		</div>
		<div class="single-page">
			<div
				v-show="currentSection === 'sound'"
				v-for="(item, index) in topic"
				:key="index"
			>
				<sound
					ref="sound"
					:groups="topic[index]"
					v-show="currentPart === index + 1"
				></sound>
			</div>
		</div>
		<div class="double-page"></div>
		<foot @partChange="partChange"></foot>
	</div>
</template>

<script>
import sound from './sound'
import foot from './options'
export default {
	components: {
		sound,
		foot
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
				this.$refs.sound.currentPart = this.currentPart
			}
		}
	},
	mounted() {
		this.$utils.setSession('currentSection', 'sound')
		this.topic = this.$utils.getSession('topic')
		this.currentSection = this.$utils.getSession('currentSection')
		// this.$refs.sound.groups = this.topic[this.currentPart - 1]
	},
	methods: {
		partChange(e) {
			this.currentPart = +e
			this.$refs.sound.groups = this.topic[this.currentPart - 1]
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
}
</style>
