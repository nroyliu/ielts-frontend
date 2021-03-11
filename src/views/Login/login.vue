<template>
	<div class="warapper">
		<div class="imgBox"></div>
		<el-form class="loginBox">
			<div class="title">{{ theme | themeName }}</div>
			<ipt
				:value="userData.name"
				style="margin-bottom:20px"
				placeholder="用户名/手机号"
				@updateTxt="
					userData.name = $event
					check(0)
				"
				:showWarn="iptRule.name"
			></ipt>
			<!--<div class="m-verticalfy" v-show="theme === 1 || theme === 2 || theme === 3">
				<ipt
					:value="userData.psw"
					placeholder="验证码"
					@updateTxt="
						userData.vertical = $event
						check(1)
					"
					style="width:60%"
					:maxlength="6"
					:showWarn="iptRule.vertical"
				></ipt>
				<div class="verification-btn">获取验证码</div>
			</div>-->

			<ipt
				:value="userData.psw"
				placeholder="密码"
				@updateTxt="
					userData.psw = $event
					check(2)
				"
				:showWarn="iptRule.psw"
				type="password"
				v-show="theme !== 3"
			></ipt>
			<div style="margin-top:10px">
				<ipt
					:value="userData.repsw"
					placeholder="密码"
					@updateTxt="
						userData.repsw = $event
						check(2)
					"
					:showWarn="iptRule.psw"
					type="password"
					v-show="theme == 2"
				></ipt>
			</div>

			<div class="login-btn" @click="login" v-show="theme === 0 || theme === 3">
				登录
			</div>
			<div class="login-btn" v-show="theme === 1">修改</div>
			<div class="login-btn" v-show="theme === 2" @click="register()">注册</div>
			<div class="change-type-box">
				<!---->
				<div class="change-type" v-show="theme === 0">
					<span class="type-btn" @click="changeTheme(1)">忘记密码</span>
					<span>|</span>
					<span class="type-btn" @click="changeTheme(2)">注册</span>
					<!--<span>|</span>
					<span class="type-btn" @click="changeTheme(3)">验证码快捷登录</span>-->
				</div>
				<!---->
				<!---->
				<div class="change-type" v-show="theme === 1 || theme === 3">
					<span class="type-btn" @click="changeTheme(2)">注册</span>
					<span>|</span>
					<span class="type-btn" @click="changeTheme(0)">密码登录</span>
				</div>
				<div class="change-type" v-show="theme === 2">
					<span class="type-txt">已经有帐号了？</span>
					<span class="type-btn" @click="changeTheme(0)">登录</span>
				</div>
			</div>
		</el-form>
		<div class="desc">
			<div class="left">
				<div class="title">学考大师， 超级社区</div>
				<div class="con">
					收录10000+道出国留学类考试真题、权威模拟题、独家试题
					<br />
					提供全方位在线练习方式，搭配独家解析，名师答疑互动，高效率加速你的备考
					<br />
					免费为学生提供交流学习的沟通平台，联系客服VX：dwwy688进群交流
				</div>
			</div>
			<div class="left" style="margin-right:0">
				<!-- <div class="title">学考大师， 超级社区</div> -->
				<div class="con">
					我们真诚的欢迎各类留学，移民和教育资源机构合作
					<br />
					为学生提供更完善，更具权威的学习平台
					<br />
					让我们共同为教育事业做出我们的贡献。
					<br />
					合作请加客服：dwwy688了解更多合作形式
				</div>
			</div>
			<!-- <div class="right">
				<img src="https://img.papaen.com/exam/login_pic.png" alt />
			</div> -->
		</div>
	</div>
</template>

<script>
import ipt from '@/components/ipt'
import { login, register } from '@/server/api'
export default {
	components: {
		ipt
	},
	computed: {},
	data: () => {
		return {
			theme: 0,
			userData: {
				name: '',
				psw: '',
				vertical: '',
				repsw: ''
			},
			iptRule: {
				name: false,
				psw: false,
				vertical: false,
				repsw: false
			}
		}
	},
	methods: {
		changeTheme(type) {
			this.theme = type
		},
		check(type) {
			// 0 检查手机号 1 验证码 2 密码
			switch (type) {
				case 0:
					if (!this.userData.name) {
						this.iptRule.name = true
					} else {
						this.iptRule.name = false
					}
					break
				case 2:
					if (!this.userData.psw) {
						this.iptRule.psw = true
					} else {
						this.iptRule.psw = false
					}
					break
				case 1:
					if (!this.userData.vertical) {
						this.iptRule.vertical = true
					} else {
						this.iptRule.vertical = false
					}
					break
				case 3:
					if (!this.userData.repsw) {
						this.iptRule.repsw = true
					} else {
						this.iptRule.repsw = false
					}
					break
			}
		},
		login() {
			login({
				phone_number: this.userData.name,
				password: this.userData.psw
			}).then((res) => {
				localStorage.token = res.token
				this.$router.replace('/')
			})
		},
		register() {
			if (!this.userData.name) {
				this.$message({
					type: 'warning',
					message: '请输入用户名'
				})
				return
			}
			if (!this.userData.psw) {
				this.$message({
					type: 'warning',
					message: '请输入密码'
				})
				return
			}
			if (this.userData.psw != this.userData.repsw) {
				this.$message({
					type: 'warning',
					message: '两次密码不一致'
				})
				return
			}
			register({
				phone_number: this.userData.name,
				password: this.userData.psw
			}).then((res) => {
				this.theme = 0
				console.log(res)
			})
		}
	},
	filters: {
		// 控制theme文字
		themeName(key) {
			switch (key) {
				case 0:
					return '账号密码登录'
				case 1:
					return '忘记密码'
				case 2:
					return '注册账号'
				case 3:
					return '验证码快捷登录'
			}
		}
	}
}
</script>

<style lang="less" scoped>
.warapper {
	position: relative;
	margin: 0 auto;
	width: 1150px;
	.imgBox {
		width: 100%;
		height: 340px;
		background: url('../../assets/bg_lg.jpg') no-repeat;
		background-size: cover;
	}
	.loginBox {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 40px 80px;
		width: 432px;
		min-height: 340px;
		border-radius: 5px;
		position: absolute;
		background: #fff;
		top: 158px;
		left: 50%;
		transform: translateX(-50%);
		-webkit-box-shadow: 8px 10px 9px -1px hsl(0deg 0% 80% / 13%);
		box-shadow: 8px 10px 9px -1px rgba(0, 0, 0, 0.1);
		.title {
			margin-bottom: 20px;
			font-size: 20px;
			text-align: center;
			font-weight: 700;
		}
	}
	.login-btn {
		margin-top: 20px;
		width: 272px;
		height: 35px;
		background: #75c7a3;
		text-align: center;
		line-height: 35px;
		color: #fff;
		border-radius: 3px;
		margin-bottom: 30px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
		transition: all 0.5s;
	}

	.login-btn:hover {
		background: #29d087;
	}

	.change-type {
		width: 100%;
		text-align: right;
		color: #cfd2d8;
		font-size: 12px;
	}

	.change-type > .type-btn {
		cursor: pointer;
		color: #999;
		transition: all 0.5s;
	}

	.change-type > .type-txt {
		color: #999;
	}

	.change-type span {
		margin: 0 3px;
	}

	.change-type > .type-btn:hover {
		color: #2c3e50;
	}

	.verification-btn {
		width: 40%;
		text-align: right;
		color: #29d087;
		cursor: pointer;
		line-height: 39px;
		font-size: 14px;
		border: none;
		border-bottom: 1px solid #e6e6e6;
		border-radius: 0;
	}

	.m-verticalfy {
		margin-bottom: 20px;
		display: flex;
	}
	.desc {
		width: 1040px;
		margin: 200px auto 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		.left {
			text-align: left;
			margin-right: 180px;
			.title {
				font-size: 20px;
				color: #4d4d4d;
				font-weight: 500;
				margin-bottom: 36px;
			}
			.con {
				line-height: 32px;
				font-size: 14px;
				color: grey;
			}
		}
		.right {
			width: 330px;
		}
	}
}
</style>
