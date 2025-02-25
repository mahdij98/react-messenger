import { AttachmentTypeEnum } from "../ts/enum";
import { UserInterface } from "../ts/interfaces";

export class MessageEntity {
  id: string = "0";
  text = "";
  createdDate: string = "";
  attachment: undefined | string = "";
  attachmentType: AttachmentTypeEnum | undefined = undefined;
  user: UserInterface = { id: "" };
  isRightSided: boolean | undefined = false;
  symbols:
    | {
        symbol: string;
        value: {
          name: string;
          id: string;
        };
      }
    | undefined;
  isSending?: boolean;
  constructor({
    id,
    text,
    createdDate,
    attachment,
    attachmentType,
    user,
    isRightSided,
    symbols,
    isSending,
  }: {
    id: string;
    text: string;
    createdDate: string;
    attachment?: string;
    attachmentType?: AttachmentTypeEnum;
    user: UserInterface;
    isRightSided?: boolean;
    symbols?:
      | {
          symbol: string;
          value: {
            name: string;
            id: string;
          };
        }
      | undefined;
    isSending?: boolean;
  }) {
    this.id = id;
    this.text = text;
    this.createdDate = createdDate;
    this.attachment = attachment;
    this.attachmentType = attachmentType;
    this.user = user;
    this.isRightSided = isRightSided;
    this.symbols = symbols;
    this.isSending = isSending;
  }
}
