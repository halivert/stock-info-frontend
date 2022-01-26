export default function useRequest() {
	const config = useRuntimeConfig()

	return (endpoint, opts = {}) => {
		return useFetch(config.API_URL + endpoint, opts)
	}
}
