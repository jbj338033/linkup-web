import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginRequest, LoginResponse } from "../../types/auth/login"
import { BaseResponse } from "../../types/base"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // 이메일 정규식
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/ // 8자 이상, 영문, 숫자 조합

const useLogin = () => {
    const [body, setBody] = useState<LoginRequest>({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        setError(null);

        if (!EMAIL_REGEX.test(body.email)) {
            setError("INVALID_EMAIL")
            setLoading(false)
            return
        }

        if (!PASSWORD_REGEX.test(body.password)) {
            setError("INVALID_PASSWORD")
            setLoading(false)
            return
        }

        try {
            const { data: { data: { accessToken, refreshToken } } } = await axios.post<BaseResponse<LoginResponse>>(`${import.meta.env.VITE_API_URL}/auth/login`, body)

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            navigate("/")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.code)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setBody({
            ...body,
            [name]: value
        })
    }

    return {
        body,
        loading,
        error,

        login,
        handleInput
    }
}

export default useLogin