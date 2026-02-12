import { AttachmentTypeEnum } from "../ts/enum";
import { UserInterface } from "../ts/interfaces";

export class MessageEntity {
  id: string = "0";
  text = "";
  createdDate: string = "";
  attachmentUrl: undefined | string = "";
  attachmentBlob: Blob | undefined;
  attachmentType: AttachmentTypeEnum | undefined = undefined;
  attachmentFormat: string | undefined = "";
  attachmentName?: string | undefined = "";
  attachmentSize?: number | undefined = 0;
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
  isEdited?: boolean;
  constructor({
    id,
    text,
    createdDate,
    attachmentUrl,
    attachmentType,
    attachmentFormat,
    attachmentBlob,
    attachmentName,
    attachmentSize,
    user,
    isRightSided,
    symbols,
    isSending,
    isEdited,
  }: {
    id: string;
    text: string;
    createdDate: string;
    attachmentUrl?: string;
    attachmentType?: AttachmentTypeEnum;
    attachmentFormat?: string;
    attachmentName?: string;
    attachmentSize?: number;
    attachmentBlob?: Blob;
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
    isEdited?: boolean;
  }) {
    this.id = id;
    this.text = text;
    this.createdDate = createdDate;
    this.attachmentUrl = attachmentUrl;
    this.attachmentType = attachmentType;
    this.attachmentFormat = attachmentFormat;
    this.attachmentBlob = attachmentBlob;
    this.attachmentName = attachmentName;
    this.attachmentSize = attachmentSize;
    this.user = user;
    this.isRightSided = isRightSided;
    this.symbols = symbols;
    this.isSending = isSending;
    this.isEdited = isEdited;
  }

  updateId = (id: string) => {
    this.id = id;
  };
  updateIsSending = (isSending: boolean) => {
    this.isSending = isSending;
  };
}
