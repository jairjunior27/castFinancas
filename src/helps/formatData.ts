export const FormatData = (data: string) => {
  const [date, hora] = data.split("T");
  const [ano, mes, dia] = date.split("-");
  return `${dia}/${mes}/${ano}`;
};
