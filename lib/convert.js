export const conversao = (cotacao, qtd) => {
  return cotacao * qtd;
};

export const toMoney = (valor) => parseFloat(valor).toFixed(2);
