import axios from "axios";
import "regenerator-runtime/runtime.js";

export const getToday = () => {
  const today = new Date();
  return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
};

export const getUrl = (data) =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

export const getCotacaoAPI = (url) => axios.get(url);
export const extractCotacao = (res) => res.data.value[0].cotacaoVenda;

export const getCotacao = async () => {
  try {
    const today = getToday();
    const url = getUrl(today);
    const res = await getCotacaoAPI(url);
    const cotacao = extractCotacao(res);
    return cotacao;
  } catch (err) {
    return "";
  }
};

// injeção de dependência
export const getCotacaoTest = ({getToday, getUrl, getCotacaoAPI, extractCotacao}) => async () => {
  try {
    const today = getToday();
    const url = getUrl(today);
    const res = await getCotacaoAPI(url);
    const cotacao = extractCotacao(res);
    return cotacao;
  } catch (err) {
    return "";
  }
}
