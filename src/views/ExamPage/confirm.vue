<template>
	<div class="wrapper">
		<div class="col" v-show="currentSection == 'read'">
			<h5>IELTS Academic Reading</h5>
			<p>Time: 1 hour</p>
			<h5>INSTRUCTIONS TO CANDIDATES</h5>
			<ul>
				<li>
					Answer
					<strong>all</strong>
					the questions.
				</li>
				<li>You can change your answers at any time during the test.</li>
			</ul>
			<h5>INFORMATION FOR CANDIDATES</h5>
			<ul>
				<li>There are 40 questions in this test.</li>
				<li>Each question carries one mark.</li>
				<li>
					The test clock will show you when there are 10 minutes and 5 minutes
					remaining.
				</li>
			</ul>
		</div>
		<div class="col" v-show="currentSection == 'sound'">
			<h5>IELTS Listening</h5>
			<p>Time: Approximately 30 minutes</p>
			<h5>INSTRUCTIONS TO CANDIDATES</h5>
			<ul>
				<li>
					Answer
					<strong>all</strong>
					the questions.
				</li>
				<li>You can change your answers at any time during the test.</li>
			</ul>
			<h5>INFORMATION FOR CANDIDATES</h5>
			<ul>
				<li>There are 40 questions in this test.</li>
				<li>Each question carries one mark.</li>
				<li>There are four parts to the test</li>
				<li>You will hear each part once.</li>
				<li>
					For each part of the test there will be time for you to look through
					the questions and time for you to check your answers.
				</li>
			</ul>
		</div>
		<div class="col" v-show="currentSection == 'write'">
			<h5>IELTS Academic Writing</h5>
			<p>Time: 1 hour</p>
			<h5>INSTRUCTIONS TO CANDIDATES</h5>
			<ul>
				<li>
					Answer
					<strong>both</strong>
					parts.
				</li>
				<li>You can change your answers at any time during the test.</li>
			</ul>
			<h5>INFORMATION FOR CANDIDATES</h5>
			<ul>
				<li>There are two parts in this test.</li>
				<li>
					Part 2 contributes twice as much as Part 1 to the writing score.
				</li>
				<li>
					The test clock will show you when there are 10 minutes and 5 minutes
					remaining.
				</li>
			</ul>
		</div>
		<div style="width: 100%; text-align: center;">
			<span style="padding: 20px 0; display:block">
				Do not click 'Start test' until you are told to do so.
			</span>
			<div>
				<el-button type="info" @click="goConfirm()">Start test</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentSection: 'sound'
		}
	},
	methods: {
		goConfirm() {
			this.$router.replace({
				path: '/main/topic',
				query: { id: this.$route.query.id }
			})
		}
	},
	mounted() {
		this.currentSection = sessionStorage.currentSection
			? JSON.parse(sessionStorage.currentSection)
			: 'sound'
	}
}
</script>

<style lang="less" scoped>
.wrapper {
	margin-top: 80px;
	padding: 40px 40px;
	box-sizing: border-box;
	.col {
		h5 {
			margin: 10px 0;
			font-weight: 700;
			font-size: 24px;
		}
		ul {
			margin: 10px 0;
			padding: 0 40px;
			white-space: normal;
			li {
				margin: 10px;
			}
		}
	}
}
</style>
