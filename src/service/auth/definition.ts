export type AuthenticationResponse<T> = {
    data: T
}

export class UserView {
    name: string | null;
    email: string;
    username: string | null

    constructor (t: {name: string | null, email: string, username: string | null}) {
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
    username: string | null
    roles?: string[]
}

export type GoogleProfile = {
    email: string,
    id: string,
    name: string,
    given_name: string,
    family_name: string,
    picture: string,
    locale: string,
}

export class GoogleRegistration  {
    email: string;
    providerId: string;
    provider = 'google';
    name: string


    constructor(profile: GoogleProfile) {
        this.email = profile.email;
        this.providerId = profile.id;
        this.name = profile.name;
    }

}