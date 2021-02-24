<template>
	<div class="listenImageTable">
		<div class="part markdown-body" v-html="topic"></div>
		<div class="part">
			<table
				style="border: 1px solid #ccc;"
				border="1"
				cellspacing="0"
				cellpadding="0"
			>
				<thead>
					<tr>
						<th></th>
						<th v-for="thItem in item.options" :key="thItem.text">
							<div>{{ `${thItem.text}` }}</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="trItem in item.questions" :key="trItem.id">
						<td>
							<span class="title">
								{{ `${pagegation.indexOf(trItem.id) + 1}.  ${trItem.content}` }}
							</span>
						</td>
						<td v-for="(item, index) in item.options" :key="index">
							<div class="icon" v-if="obj">
								<input
									type="radio"
									:name="trItem.id"
									:value="item.text"
									@change="getCurrent($event, trItem.id)"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import marked from 'marked'
export default {
	props: {
		item: Object
	},
	data() {
		return {
			topic: '',
			obj: {},
			pagegation: []
		}
	},
	mounted() {
		// markdown 转html
		this.topic = marked(this.item.content)
		this.item.questions.forEach((item) => {
			this.obj[item.id] = ''
		})
		this.pagegation = this.$utils.getSession('pagegation')
	},
	methods: {
		getCurrent(e, id) {
			this.obj[id] = e.target.defaultValue
			this.$emit('changeData', this.obj)
		}
	}
}
</script>

<style lang="less" scoped>
.listenImageTable {
	display: flex;
	justify-content: space-between;
	.part {
		width: 40%;
		.markdown-body img {
		}
	}
	div:nth-child(1) {
		// flex: 0.6;
	}

	.title {
		padding: 0 4px;
		display: block;
		font-size: 14px;
		font-weight: bold;
	}
	table {
		width: 100%;
	}
	td div,
	th div {
		min-height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	thead {
		background: #96c6f9;
	}
	th,
	.icon {
		padding: 4px;
	}
	.icon input {
		cursor: pointer;
	}
}
</style>
