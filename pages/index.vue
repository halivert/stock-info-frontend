<script lang="ts" setup>
import categories from "@/data/categories"
const token = useToken()
const request = useRequest()
const offset = ref(0)

const user = ref({})
const errors = ref({})
const stocks = reactive({
	prev: null,
	next: null,
	stocks: [],
})

const headers = computed(() => ({
	Authorization: `Bearer ${token.value}`,
}))

const fetchUser = () => {
	if (!token.value) return new Promise((r) => r({ data: {}, error: true }))
	return request("/me", { server: false, headers: headers.value })
}

const fetchData = () => {
	return request(`/stocks?limit=2&offset=${offset.value}`, {
		server: false,
		headers: headers.value,
	})
}

const assignData = ({ stocks, errors }, { data, error }) => {
	stocks.next = data.value.next
	stocks.prev = data.value.prev
	stocks.stocks = data.value.stocks
	errors.value = error.value
}

const init = () => {
	fetchData().then((response) => assignData({ stocks, errors }, response))

	fetchUser().then(({ data, error }) => {
		user.value = data.value
	})
}

if (token.value) init()
watch(token, async (token) => init())

const nextPage = () => {
	if (!stocks.next) return

	offset.value += 2
	fetchData().then((response) => assignData({ stocks, errors }, response))
}

const prevPage = () => {
	if (!stocks.prev) return

	if (offset.value - 2 >= 0) {
		offset.value -= 2
		fetchData().then((response) => assignData({ stocks, errors }, response))
	}
}
</script>

<template>
	<div class="section is-flex-grow-1 is-flex is-flex-direction-column">
		<div class="columns is-flex-grow-1">
			<div
				class="column is-one-third is-flex is-justify-content-space-between is-flex-direction-column"
			>
				<div class="tile is-ancestor is-flex-grow-0">
					<div class="tile is-vertical is-parent">
						<article
							:class="[
								'tile is-child notification',
								categories[stock.category],
							]"
							v-for="stock in stocks?.stocks"
							:key="stock.id"
						>
							<h1 class="title">{{ stock.name }}</h1>
							<h2 class="subtitle">({{ stock.ticker }})</h2>

							<p><strong>Price:</strong> {{ stock.price }} USD</p>
						</article>
					</div>
				</div>

				<Paginator
					:next-url="stocks?.next"
					:prev-url="stocks?.prev"
					@next="nextPage"
					@prev="prevPage"
				/>
			</div>
			<div class="column">
				<Card v-if="user?.id">
					<h2 class="title is-4">{{ user.name }}</h2>
					<h3 class="subtitle is-5">{{ user.username }}</h3>
				</Card>
			</div>
		</div>
	</div>
</template>
