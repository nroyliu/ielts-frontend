<template>
	<div class="warapper">dasda</div>
</template>

<script>
export default {
	data() {
		return {
			topic: [],
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
	padding: 15px !important;
	width: 100%;
	height: 645px;
	background-image: linear-gradient(0deg, #fff, #dde3ee);
	overflow: auto;
	box-shadow: 0 0.0714em 0.214em rgba(0, 0, 0, 0.25);
	border-radius: 8px;
}
</style>