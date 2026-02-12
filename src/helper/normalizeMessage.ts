export const normalizeMessage = (html: string): string => {
  const container: HTMLDivElement = document.createElement("div");
  container.innerHTML = html;

  const spans: NodeListOf<HTMLSpanElement> = container.querySelectorAll("span");

  spans.forEach((span: HTMLSpanElement) => {
    const text: string =
      span.textContent
        ?.replace(/\u00A0/g, " ") // nbsp → space
        .trim()
        .replace(/\s+/g, "-") ?? "";

    span.replaceWith(text);
  });

  return container.innerHTML.replace(/&nbsp;/g, " ");
};
