export const normalizeMessage = (html: string) => {
  const container = document.createElement("div");
  container.innerHTML = html;

  container.querySelectorAll("span").forEach((span) => {
    const text = span.textContent
      .replace(/\u00A0/g, " ") // nbsp → space
      .trim()
      .replace(/\s+/g, "-"); // spaces → dash

    span.replaceWith(text);
  });

  return container.innerHTML.replace(/&nbsp;/g, " ");
};
