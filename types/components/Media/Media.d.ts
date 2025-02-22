import { AttachmentTypeEnum } from "../../ts/enum";
interface MediaProps {
    attachment: string;
    attachmentType?: AttachmentTypeEnum;
}
declare const Media: ({ attachment, attachmentType }: MediaProps) => import("react/jsx-runtime").JSX.Element | null | undefined;
export default Media;
