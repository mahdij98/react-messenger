import React from "react";
interface FilePreviewProps {
    format?: string;
    fileName: string;
    fileSize: number;
    src: string;
}
declare const FilePreview: React.FC<FilePreviewProps>;
export default FilePreview;
