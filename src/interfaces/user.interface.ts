export interface IUser {
    _id: string,
    email: string,
    status: string,
    gender?: string,
    password: string,
    first_name: string,
    last_name?: string,
    photo?: string,
    createAt: Date,
}
