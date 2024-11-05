export const htmlBooleanAttribute = (value: string | undefined): boolean => {
  return value !== undefined && value !== "false"
}
