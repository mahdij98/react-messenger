const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const renderTextWithHighlights = (
  text: string = "",
  symbols?: string[],
) => {
  if (!symbols || symbols.length === 0) return text;

  const escaped = symbols.map(escapeRegExp).join("|");
  const regex = new RegExp(`(${escaped})[\\w-]+`, "g");
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = regex.lastIndex;
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));
    nodes.push(
      <span key={start} className="text-blue-600 cursor-pointer">
        {text.slice(start, end)}
      </span>,
    );
    lastIndex = end;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
};
