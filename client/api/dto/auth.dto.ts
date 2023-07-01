export interface LoginFormDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    password: string;
}

export type RegisterFormDTO = LoginFormDTO & {fullName:string};
export type RegisterResponseDTO = LoginResponseDTO;

