// src/utils/inputHelpers.ts
export const handleDecimalInput = (
  text: string,
  setter: (val: string) => void
) => {
  let cleaned = text.replace(',', '.'); // đổi dấu phẩy sang dấu chấm
  cleaned = cleaned.replace(/[^0-9.]/g, ''); // chỉ giữ số và dấu chấm

  const parts = cleaned.split('.');
  if (parts.length > 2) return; // chỉ cho 1 dấu chấm
  if (parts[1]?.length > 2) return; // tối đa 2 số sau dấu chấm

  setter(cleaned);
};
