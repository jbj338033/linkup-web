export interface GeneralChatMessage {
    id: string;
    content: string;
    sender: {
        nickname: string;
        profileImage: string;
        linkupId: string;
    },
    createdAt: string;
    updatedAt: string;
}
