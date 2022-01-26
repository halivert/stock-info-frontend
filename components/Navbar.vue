<script setup>
const active = ref(false)
const request = useRequest()
const token = useToken()

const close = (evt) => {
	active.value = false
}

const logout = () => {
	request(`/logout`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token.value}`,
		},
	}).finally(() => {
		token.value = null
		close()
	})
}
</script>

<template>
	<nav
		class="navbar is-primary"
		role="navigation"
		aria-label="main navigation"
		@click="close"
	>
		<div class="navbar-brand">
			<NuxtLink class="navbar-item" to="/">Stock info</NuxtLink>

			<a
				id="navbar-burger"
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				@click.stop="active = !active"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div :class="['navbar-menu', { 'is-active': active }]">
			<div class="navbar-start"></div>

			<div class="navbar-end">
				<template v-if="token?.length > 0">
					<div class="navbar-item buttons">
						<button class="button is-danger" @click="logout">Logout</button>
					</div>
				</template>
				<template v-else>
					<div class="navbar-item buttons">
						<NuxtLink to="/register" class="button is-info">Register</NuxtLink>
						<NuxtLink to="/login" class="button is-primary">Log in</NuxtLink>
					</div>
				</template>
			</div>
		</div>
	</nav>
</template>
