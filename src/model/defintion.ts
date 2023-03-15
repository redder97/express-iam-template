export type RegistrationRequest = {
    name: string,
    username: string,
    password: string,
    email: string,
    provider: string
}

export type GenericResponse<T> = {
    success: boolean,
    data?: T,
    message?: string
}