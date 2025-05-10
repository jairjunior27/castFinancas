export function formatarMoeda(valor: string): string {
  const numero = valor.replace(/\D/g, ""); // remove tudo que não for número
  const valorNumerico = (parseInt(numero, 10) / 100).toFixed(2);
  return Number(valorNumerico).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function limparMoeda(valor: string): number {
  const limpo = valor.replace(/\D/g, "");
  return parseFloat((parseInt(limpo, 10) / 100).toFixed(2));
}
