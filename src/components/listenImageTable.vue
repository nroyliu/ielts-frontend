<template>
	<div class="listenImageTable">
		<div class="part" v-if="!isRead">
			<div class="markdown-body" v-html="topic"></div>
		</div>
		<div class="part" :class="{ isRead: isRead }">
			<table
				style="border: 1px solid #ccc;"
				border="1"
				cellspacing="0"
				cellpadding="0"
			>
				<thead>
					<tr>
						<th></th>
						<th v-for="thItem in item.options" :key="thItem.option">
							<div>{{ `${thItem.option}` }}</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="trItem in item.questions" :key="trItem.id">
						<td>
							<!-- <div> -->
							<span class="title">
								{{
									`${pagegation.indexOf(trItem.id) +
										1}. ${trItem.content.replace('[d[=NO=]]', '')}`
								}}
							</span>
							<!-- </div> -->
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
		item: Object,
		isRead: {
			type: Boolean,
			default() {
				return false
			}
		}
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
			console.log(this.obj)
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
	.isRead {
		width: 100%;
	}
	div:nth-child(1) {
	}

	.title {
		padding: 0 4px;
		display: block;
		font-size: 14px;
		font-weight: bold;
		width: 80%;
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
