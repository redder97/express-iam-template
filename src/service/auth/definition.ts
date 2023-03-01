export type AuthenticationResponse<T> = {
    data: T
}

export class UserView {
    name: string | null;
    email: string;
    username: string

    constructor (t: {name: string | null, email: string, username: string}) {
        this.name = t.name;
        this.username = t.username;
        this.email = t.email;
    }

}

export type AuthResponse = {
    token: string
}

export type JWTpayload = {
    id: number,
    email: string,
    username: string
    roles?: string[]
}