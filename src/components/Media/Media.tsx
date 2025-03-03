import { AttachmentTypeEnum, ChatThemEntity } from "../../ts/enum";
import { ChatUploadProgresInterface } from "../../ts/interfaces";
import CircleProgress from "../CircleProgress/CircleProgress";
import FilePreview from "./File/File";
import VoicePlayer from "./Voice/Voice";

interface MediaProps {
  attachmentUrl: string;
  attachmentType?: AttachmentTypeEnum;
  attachmentFormat?: string;
  them?: ChatThemEntity;
  uploadProgres?: ChatUploadProgresInterface;
  cancellationToken?: () => void;
}
const Media = ({
  attachmentUrl,
  attachmentType,
  attachmentFormat,
  them,
  uploadProgres,
  cancellationToken,
}: MediaProps) => {
  if (!attachmentUrl) return null;
  return attachmentType === AttachmentTypeEnum.Voice ? (
    <div className="w-full">
      <VoicePlayer
        onCancelClick={cancellationToken}
        uploadProgres={uploadProgres}
        src={attachmentUrl}
      />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Image ? (
    <div className="relative w-full">
      {uploadProgres ? (
        <CircleProgress
          progress={uploadProgres?.progres ?? 0}
          size={50}
          strokeWidth={4}
          showCancel
          onCancelClick={cancellationToken}
          circleColor="#ddd"
          progressColor="#286b2a"
          className="!absolute z-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      ) : null}
      <img
        className={`transition-all ${
          uploadProgres ? "filter blur-lg" : " blur-none"
        }`}
        src={attachmentUrl}
      />
    </div>
  ) : attachmentType === AttachmentTypeEnum.File ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format={attachmentFormat ?? "UN"}
        src={attachmentUrl}
        uploadProgres={uploadProgres}
        onCancelClick={cancellationToken}
      />
    </div>
  ) : attachmentType === AttachmentTypeEnum.Video ? (
    <div className="w-full mt-1">
      <FilePreview
        fileName="productivity"
        fileSize={23000}
        format={attachmentFormat ?? "UN"}
        src={attachmentUrl}
        uploadProgres={uploadProgres}
        onCancelClick={cancellationToken}
      />
    </div>
  ) : null;
};

export default Media;
