<template>
	<div class="warapper">
		<div class="c_partBar col mb-2 title">
			<h3>Part {{currentPart}}</h3>
		</div>
		<sound v-show="currentPart === 1"></sound>
		<foot @partChaneg="currentPart = + $event"></foot>
	</div>
</template>

<script>
import sound from './sound'
import foot from './options'
export default {
	components: {
		sound,
		foot,
	},
	data() {
		return {
			topic: [],
			currentPart: 1,
		}
	},
	mounted() {
		this.topic = JSON.parse(sessionStorage.topic)
	},
	methods: {},
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
}
</style>