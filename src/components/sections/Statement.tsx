import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { statement } from "@/content/statement";

type Part = { text: string; italic: boolean };

/**
 * Splits the sentence into words for the word-by-word reveal. A word is a list of parts
 * so punctuation touching the italic phrase stays attached to it ("interfaces.").
 */
function toWords({ text, emphasis }: typeof statement) {
  const start = text.indexOf(emphasis);
  const segments: Part[] =
    start === -1
      ? [{ text, italic: false }]
      : [
          { text: text.slice(0, start), italic: false },
          { text: emphasis, italic: true },
          { text: text.slice(start + emphasis.length), italic: false },
        ];

  const words: Part[][] = [[]];
  for (const segment of segments) {
    for (const token of segment.text.split(/(\s+)/)) {
      const current = words[words.length - 1];
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        if (current.length > 0) words.push([]);
      } else {
        current.push({ text: token, italic: segment.italic });
      }
    }
  }
  return words.filter((word) => word.length > 0);
}

export function Statement() {
  const words = toWords(statement);

  return (
    <section aria-label="Introduction" data-defer-font className="py-28 md:py-40">
      <Container>
        <p
          data-reveal-words
          className="font-serif text-[clamp(2.125rem,1rem+3.5vw,4.125rem)] leading-[1.045] tracking-[-0.012em] text-statement lg:w-[70%]"
        >
          {words.map((parts, index) => (
            <Fragment key={index}>
              <span className="reveal-word inline-block" style={{ "--i": index }}>
                {parts.map((part, partIndex) =>
                  part.italic ? <em key={partIndex}>{part.text}</em> : <Fragment key={partIndex}>{part.text}</Fragment>,
                )}
              </span>
              {index < words.length - 1 && " "}
            </Fragment>
          ))}
        </p>
      </Container>
    </section>
  );
}
