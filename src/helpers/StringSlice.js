export default function StringSlice(text, end) {
  return text.length > end ? text.slice(0, end) + "..." : text;
}
