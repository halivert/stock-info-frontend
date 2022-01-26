<script>
import { defineComponent } from "vue"
export default defineComponent({ name: "Input" })
</script>

<script setup>
const props = defineProps({
	label: String,
	modelValue: String,
	errors: {
		type: Array,
		default: () => [],
	},
})

defineEmits(["update:modelValue"])
</script>

<template>
	<div class="field">
		<label v-if="label?.length > 0" class="label">{{ label }}</label>
		<div class="control">
			<input
				:class="['input', { 'is-danger': errors.length > 0 }]"
				v-bind="$attrs"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
		</div>
		<p class="help is-danger" v-if="errors.length > 0">
			<span class="is-block" v-for="error in errors" :key="error">
				{{ error }}
			</span>
		</p>
	</div>
</template>
