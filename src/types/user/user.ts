export interface User {
    nickname: string,
    linkupId: string,
    linkupIdUpdatedAt: string,
    email: string,
    birthday: string,
    phoneNumber: string,
    statusMessage: string,
    profileImage: string,
    role: "USER" | "ADMIN",
    gender: "MALE" | "FEMALE" | "OTHER",
}