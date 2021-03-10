<template>
	<div class="wrappers">
		<div class="img-box">
			<img src="../../assets/test-sound.png" alt />
			<div style="color: #212529; font-size: 14px;line-height:14px;">
				Test sound
			</div>
		</div>
		<div class="bc-box">
			<div class="txt">
				Put on your headphones and click the Play sound button to play a sample
				sound.
			</div>
			<div style="width: 100%; text-align: center;">
				<el-button type="info">Play sound</el-button>
			</div>

			<div class="txt">
				<img
					style="margin-right:10px"
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKISURBVHjahFNLSxthFD2ZZx4mMdEQY7HiY1UFC4riPyi00IXZ6La4sNKlbtptN7otLSjqH9BFoYVCdyKCXURdKIiP1mLB1ueoSTQZZ3ruMA0pFTpw+C5zv3O++517v4Druqj+5ufnU1xGiEdEr//7C/GJeJfNZo+q9weqBUgec0qliYulJeTX1qDf3kLlfzUcRqynB2p3N1xNG6fI5D8CJL8tbG+PHM/OoiaZRCKTgaGqXq7sOMgfHcG9uEBqeBjFTOYNRV5UBEieKGxtjZ1MT6O+owMuiXFdx9OFBU/g/cAACuUytEAAN3t7SI+Owqqvf02RVwrJ95zr67HjuTmkOjs9spwb4OZKmYyDXDUeVtPWhvOZGWiO85LcpCKGWYuLiNbVIaAoMPjDlHsrSkVA4jBXgcnr6NEoQqs5ST2TXY8LuRwi6TQ0nxwidP/+8OMo1xoiQsQocJNblVRWOA+Uy0vvfgZLNH0RRdMqAgZjIYvdpXweJxsbKCWSkmqRXUVd1w1dNrJtZZpkHxygFItVBK7W15E6O4PNg1xCKsyzUyIoAl/1ROJhoFiEtbKCEFsl5YYNAx+amz2B5NUVIqenHqEsprJDGj1j/F08+BjngPxcXoZGcsS/q11biyf7+x4uGUs9f1AOsYauLm98ROCd1t8PhYoulYO+20pVGyWO+AYWg0H8amyE3dcnqSmFw/DDVtXJ++PjsOJxFEzTM7GO1Xxub/fQyFhOOuRIr7Fb7tAQ3FBIBun0r1GOWdaINTWF5OYmGmwbaZk+5iz6cU58a22FMziI25YWeVTP73xMquNMROi6vbODm91d9s6FRjPdpiaUevk4TfPux1Ql0vCf53xYvf+3AAMATOYCa5wvlR0AAAAASUVORK5CYII="
					alt
				/>
				if you can not hear the sound clearly, please tell the invigilator
			</div>
			<div style="width: 100%; text-align: center;">
				<el-button type="info" @click="routerTo()">Continue</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		routerTo() {
			this.$router.replace({
				path: '/main/confirm',
				query: { id: this.$route.query.id }
			})
		}
	}
}
</script>

<style lang="less" scoped>
.wrappers {
	margin: 122px auto 0;
	max-width: 1120px;
	.img-box {
		display: flex;
		align-items: center;
		img {
			margin-right: 10px;
			width: 48px;
			height: 48px;
		}
	}
	.bc-box {
		display: block;
		width: 100%;
		max-width: 1120px;
		border: 1px solid #fff;
		border-radius: 10px;
		padding: 15px;
		margin: 0 auto;
		.title {
			width: 100%;
			text-align: center;
			color: red;
			font-size: 26px;
		}
	}
	.list {
		margin-bottom: 28px;
		padding: 0 40px;
	}
	.txt {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
}
</style>
