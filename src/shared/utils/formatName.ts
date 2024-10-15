export const formatName = (name: string | undefined): string => {
  if (typeof name !== "string") {
    return "";
  }
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
