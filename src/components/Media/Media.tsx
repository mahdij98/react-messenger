import { AttachmentTypeEnum } from "../../ts/enum";
import FilePreview from "./File/File";
import VoicePlayer from "./Voice/Voice";

interface MediaProps {
  attachmentUrl: string;
  attachmentType?: AttachmentTypeEnum;
  attachmentFormat?: string;
}
const Media = ({
  attachmentUrl,
  attachmentType,
  attachmentFormat,
}: MediaProps) => {
  if (!attachmentUrl) return null;
  return attachmentType === AttachmentTypeEnum.Voice ? (
    <div className="w-full">
      <VoicePlayer src={attachmentUrl} />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Image ? (
    <div className="w-full">
      <img src={attachmentUrl} />
    </div>
  ) : attachmentType === AttachmentTypeEnum.File ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format={attachmentFormat ?? "UN"}
        src={attachmentUrl}
      />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Video ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format={attachmentFormat ?? "UN"}
        src={attachmentUrl}
      />
    </div>
  ) : null;
};

export default Media;
