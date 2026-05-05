export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(value: string) {
  return slugRegex.test(value);
}
