const calculateTextareaLineCount = (text: string, textareaRef: any) => {
  if (!textareaRef.current) return 0;

  const style = window.getComputedStyle(textareaRef.current);
  const lineHeight = parseInt(style.lineHeight, 10) || 20;
  const totalLines = Math.ceil(textareaRef.current.scrollHeight / lineHeight);

  return totalLines - 1;
};

export default calculateTextareaLineCount;
