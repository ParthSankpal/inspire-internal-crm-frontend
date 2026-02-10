export const getNestedError = (errors: any, name: string) => {
  return name.split(".").reduce((acc, key) => acc?.[key], errors)?.message;
};
