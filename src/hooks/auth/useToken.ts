const useToken = () => {
    const getAccessToken = () => {
        const accessToken = localStorage.getItem("accessToken")
        return accessToken
    }

    const getRefreshToken = () => {
        const refreshToken = localStorage.getItem("refreshToken")
        return refreshToken
    }

    const setAccessToken = (accessToken: string) => {
        localStorage.setItem("accessToken", accessToken)
    }

    const setRefreshToken = (refreshToken: string) => {
        localStorage.setItem("refreshToken", refreshToken)
    }

    const removeAccessToken = () => {
        localStorage.removeItem("accessToken")
    }

    const removeRefreshToken = () => {
        localStorage.removeItem("refreshToken")
    }

    return {
        getAccessToken,
        getRefreshToken,
        setAccessToken,
        setRefreshToken,
        removeAccessToken,
        removeRefreshToken
    }
}

export default useToken