export type LoginRequest = {
    username: string,
    password: string
}

export type GenericResponse<T> = {
    success: boolean,
    data?: T,
    message?: string
}