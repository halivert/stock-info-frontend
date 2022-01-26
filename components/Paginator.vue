<script setup>
const props = defineProps({
	nextUrl: String,
	prevUrl: String,
	pages: {
		type: Array,
		default: () => [],
	},
})

const { prevUrl, nextUrl, pages } = toRefs(props)

defineEmits(["next", "prev"])
</script>

<template>
	<nav class="pagination is-centered" role="navigation" aria-label="pagination">
		<a
			@click="$emit('prev')"
			class="pagination-previous"
			:disabled="prevUrl ? undefined : true"
			>Previous</a
		>
		<a
			@click="$emit('next')"
			class="pagination-next"
			:disabled="nextUrl ? undefined : true"
			>Next</a
		>
		<ul class="pagination-list" v-if="pages.length">
			<!-- <li><a class="pagination-link" aria-label="Goto page 1">1</a></li> -->
			<!-- <li><span class="pagination-ellipsis">&#38;hellip;</span></li> -->
			<!-- <li><a class="pagination-link" aria-label="Goto page 45">45</a></li> -->
			<!-- <li> -->
			<!-- 	<a -->
			<!-- 		class="pagination-link is-current" -->
			<!-- 		aria-label="Page 46" -->
			<!-- 		aria-current="page" -->
			<!-- 		>46</a -->
			<!-- 	> -->
			<!-- </li> -->
			<!-- <li><a class="pagination-link" aria-label="Goto page 47">47</a></li> -->
			<!-- <li><span class="pagination-ellipsis">&#38;hellip;</span></li> -->
			<!-- <li><a class="pagination-link" aria-label="Goto page 86">86</a></li> -->
		</ul>
	</nav>
</template>
