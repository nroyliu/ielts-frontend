<template>
	<div class="wrapper">
		<top></top>
		<router-view></router-view>
		<div class="warn-window" v-show="isShow">
			<div class="close">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJsSURBVHjalFO7a5NRFP/d75mkjwQbogatLgoOQdGlIA5uNt3cO4e20BcdnF3aqaVQcOkfUChKIdhOhcSgHUoo0cHFpZ0yNGkS8vge+fJ5zs1TnBo43zn33pzf+Z3fuVek0+kPABbIpnG73y+yT5oQYjMcicJqWtBNAwHThMk+wL4bszcMHbquQ9M1qIqCer2eyGazC5qqqrBaNsqbHwG/A4UOBUGzV4QAFZAJo3uaYeDt5y/MIqHwl6sI+FA8D+h0IKiioNi0LIRaLaiuC4XZkL9TqwF01ul4so8uANHlSiA2j2Zn8f74GA+TSXSIskfV4nNzeHd0hBh5d2xMMmm32xJA4w/3zdQQCuHV2po8eLm+jkKPcmJlRe49W1rC97MzKI4zAJAMAkFTompE93xri6SgNmj9fHVVJnPMe793djBOLTCobbtDgKAZkD1rl5e42t9HjhJ9WnPiIHl7G04mg2i9Los5tj1sgTW4vrhA7OYGXjAIuO5/Q2flPaqsc1Vm4NhDBgZNQfF9tAIBxOfn8WZvD4IEZRZ9Jk+of31mBtfVKmqFAmzLGZkCqc2zbk1M4PXu7iD5fHEReUqUILT3dGMDRRqtTwJa9ggD3egCRJtN/Eil0G40ZLJzeIg2WWF5GR6d/SRB75ZKPRGdoQaqqkiAB5RYpnl/PT1FjOLHlYr8Q/HgAJmTE8RoAtMEUIxE/hVRCAXj8Tj+EM3+dS1NTqIcDsu4f6U5kU3cuw/H7V0kj/qrkTDJfB5e24NL/bk0BYcuC9MceKpoO7x24ZJNTUXQaFSymu/7qW+5HD/nF7d5y42rapaf818BBgB9BBQb6mEZsQAAAABJRU5ErkJggg=="
					alt
				/>
			</div>
			<div
				class="content"
			>Please click the “{{txt}}” button to start the familiarisation test, in your real IELTS test there will be an invigilator in the room to advise when to do this.</div>
		</div>
	</div>
</template>


<script>
import top from './top'
export default {
	components: {
		top,
	},
	watch: {
		'$route.path': {
			handler(val) {
				switch (val) {
					case '/main':
						this.isShow = true
						this.txt = 'My details are correct'
						break
					case '/main/confirm':
						console.log(123)
						this.isShow = true
						this.txt = 'Start test'
						break
					default:
						this.isShow = false
				}
			},
		},
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	data() {
		return {
			dialogVisible: true,
			txt: 'My details are correct',
			isShow: true,
		}
	},
}
</script>

<style lang="less" scoped>
.wrapper {
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: #dce5f6;
	font-weight: 400;
	font-size: 14px;
	line-height: 1.5;
	text-align: left;
	color: #212529;
	.warn-window {
		position: fixed;
		bottom: 32px;
		right: 32px;
		width: 200px;
		min-height: 275px;
		background: #fff046;
		border-radius: 8px;
		overflow: hidden;
		.close {
			position: relative;
			width: 100%;
			height: 24px;
			background: #db0;
			img {
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translateY(-50%);
			}
		}
		.content {
			padding: 0 20px;
			box-sizing: border-box;
		}
	}
}
</style>