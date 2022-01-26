export const useToken = () => {
	const token = useState<string>("token")

	onMounted(() => {
		token.value = localStorage.getItem("token") || ""

		watch(token, (newValue) => {
			if (newValue) return localStorage.setItem("token", newValue)
			return localStorage.removeItem("token")
		})
	})

	return token
}
