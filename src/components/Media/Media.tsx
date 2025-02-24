import { AttachmentTypeEnum } from "../../ts/enum";
import FilePreview from "./File/File";
import VoicePlayer from "./Voice/Voice";

interface MediaProps {
  attachment: string;
  attachmentType?: AttachmentTypeEnum;
}
const Media = ({ attachment, attachmentType }: MediaProps) => {
  if (!attachment) return null;
  return attachmentType === AttachmentTypeEnum.Voice ? (
    <div className="w-full">
      <VoicePlayer src={attachment} />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Image ? (
    <div className="w-full">
      <img src={attachment} />
    </div>
  ) : attachmentType === AttachmentTypeEnum.File ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format="rar"
        src={attachment}
      />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Video ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format="rar"
        src={attachment}
      />
    </div>
  ) : null;
};

export default Media;
