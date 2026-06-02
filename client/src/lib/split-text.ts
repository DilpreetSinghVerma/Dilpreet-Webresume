/**
 * Lightweight text-splitting utility (free alternative to GSAP SplitText).
 *
 * Wraps each character or visual line of an element in mask + inner spans
 * so GSAP can animate them individually.
 */

export interface SplitResult {
  /** The individual animated span elements */
  elements: HTMLSpanElement[];
  /** Restore the original innerHTML */
  revert: () => void;
}

/**
 * Split an element's text content into individually-wrapped characters.
 *
 * DOM structure per character:
 *   <span class="char-mask" style="overflow:hidden; display:inline-block">
 *     <span class="char" style="display:inline-block; will-change:transform">
 *       A
 *     </span>
 *   </span>
 */
export function splitIntoChars(el: HTMLElement): SplitResult {
  const originalHTML = el.innerHTML;
  const text = el.textContent || "";
  el.innerHTML = "";

  const chars: HTMLSpanElement[] = [];

  for (const ch of text) {
    const mask = document.createElement("span");
    mask.className = "char-mask";
    mask.style.overflow = "hidden";
    mask.style.display = "inline-block";

    const inner = document.createElement("span");
    inner.className = "char";
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = ch === " " ? "\u00A0" : ch;

    mask.appendChild(inner);
    el.appendChild(mask);
    chars.push(inner);
  }

  return {
    elements: chars,
    revert: () => {
      el.innerHTML = originalHTML;
    },
  };
}

/**
 * Split an element's text content into line-level spans.
 *
 * Uses a temporary inline layout measurement to detect where lines wrap,
 * then wraps each line in:
 *   <span class="line-mask" style="overflow:hidden; display:block">
 *     <span class="line" style="display:block; will-change:transform">
 *       ...line text...
 *     </span>
 *   </span>
 */
export function splitIntoLines(el: HTMLElement): SplitResult {
  const originalHTML = el.innerHTML;
  const text = el.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);

  // Temporarily place words as individual spans to measure line breaks
  el.innerHTML = "";
  const wordSpans: HTMLSpanElement[] = [];
  words.forEach((word, i) => {
    const sp = document.createElement("span");
    sp.style.whiteSpace = "nowrap";
    sp.textContent = word;
    el.appendChild(sp);
    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
    wordSpans.push(sp);
  });

  // Group by offsetTop
  const lines: string[][] = [];
  let currentTop = -1;
  wordSpans.forEach((sp, i) => {
    const top = sp.offsetTop;
    if (top !== currentTop) {
      lines.push([]);
      currentTop = top;
    }
    lines[lines.length - 1].push(words[i]);
  });

  // Rebuild with line masks
  el.innerHTML = "";
  const lineEls: HTMLSpanElement[] = [];

  lines.forEach((lineWords) => {
    const mask = document.createElement("span");
    mask.className = "line-mask";
    mask.style.overflow = "hidden";
    mask.style.display = "block";

    const inner = document.createElement("span");
    inner.className = "line";
    inner.style.display = "block";
    inner.style.willChange = "transform";
    inner.textContent = lineWords.join(" ");

    mask.appendChild(inner);
    el.appendChild(mask);
    lineEls.push(inner);
  });

  return {
    elements: lineEls,
    revert: () => {
      el.innerHTML = originalHTML;
    },
  };
}
