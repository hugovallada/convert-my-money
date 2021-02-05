import axios from "axios";

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-03-2021'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

export const getCotacaoAPI = (data) => axios.get(url);
export const extractCotacao = (res) => res.data.value[0];

export const getCotacao = async () => {
  const res = await getCotacaoAPI("");
  const cotacao = extractCotacao(res);
  return cotacao.cotacaoCompra;
};
