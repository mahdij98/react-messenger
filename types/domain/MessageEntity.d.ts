import { AttachmentTypeEnum } from "../ts/enum";
import { UserInterface } from "../ts/interfaces";
export declare class MessageEntity {
    id: string;
    text: string;
    createdDate: string;
    attachment: undefined | string;
    attachmentType: AttachmentTypeEnum | undefined;
    user: UserInterface;
    isRightSided: boolean | undefined;
    symbols: {
        symbol: string;
        value: {
            name: string;
            id: string;
        };
    } | undefined;
    constructor({ id, text, createdDate, attachment, attachmentType, user, isRightSided, symbols, }: {
        id: string;
        text: string;
        createdDate: string;
        attachment?: string;
        attachmentType?: AttachmentTypeEnum;
        user: UserInterface;
        isRightSided?: boolean;
        symbols?: {
            symbol: string;
            value: {
                name: string;
                id: string;
            };
        } | undefined;
    });
}
