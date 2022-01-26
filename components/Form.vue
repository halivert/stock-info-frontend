<script setup>
defineProps({
	isBox: {
		type: Boolean,
		default: true,
	},
	legend: String,
})
</script>

<template>
	<form>
		<fieldset>
			<legend class="title is-4">{{ legend }}</legend>

			<slot></slot>
		</fieldset>
	</form>
</template>
