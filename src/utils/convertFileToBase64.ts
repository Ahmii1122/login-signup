export const convertFileToBase64 = (file: File) => {
  const base64 = URL.createObjectURL(file);
  return base64;
};
