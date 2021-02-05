import axios from "axios";

const getToday = () => {
  const today = new Date();
  return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
};

const getUrl = (data) =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

export const getCotacaoAPI = (data) => axios.get(getUrl(data));
export const extractCotacao = (res) => res.data.value[0];

export const getCotacao = async () => {
  try {
    const today = getToday();
    const res = await getCotacaoAPI(today);
    const cotacao = extractCotacao(res);
    return cotacao.cotacaoCompra;
  } catch (err) {
    return "";
  }
};
