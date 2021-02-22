<template>
	<div class="wrapper">
		<div class="col">
			<h5>IELTS Academic Reading</h5>
			<p>Time: 1 hour</p>
			<h5>INSTRUCTIONS TO CANDIDATES</h5>
			<ul>
				<li>
					Answer
					<strong>all</strong> the questions.
				</li>
				<li>You can change your answers at any time during the test.</li>
			</ul>
			<h5>INFORMATION FOR CANDIDATES</h5>
			<ul>
				<li>There are 40 questions in this test.</li>
				<li>Each question carries one mark.</li>
				<li>The test clock will show you when there are 10 minutes and 5 minutes remaining.</li>
			</ul>
		</div>
		<div style="width: 100%; text-align: center;">
			<span
				style="padding: 20px 0; display:block"
			>Do not click 'Start test' until you are told to do so.</span>
			<div>
				<el-button type="info" @click="goConfirm()">Start test</el-button>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.wrapper {
	margin-top: 80px;
	padding: 40px 40px;
	box-sizing: border-box;
	.col {
		h5 {
			font-weight: 700;
			font-size: 24px;
		}
		ul {
			padding: 0 40px;
		}
	}
}
</style>