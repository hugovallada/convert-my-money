import { extractCotacao, getCotacaoAPI, getToday, getUrl, getCotacaoTest} from "./bcb.js";
import axios from "axios";
import "regenerator-runtime/runtime";

jest.mock("axios");

test("getCotacaoApi", () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 3.9 }],
    },
  };

  axios.get.mockResolvedValue(res);
  getCotacaoAPI("url").then((response) => {
    expect(response).toEqual(res);
    expect(axios.get.mock.calls[0][0]).toBe("url");
  });
});

test("extractCotacao", () => {
  const cotacao = extractCotacao({
    data: {
      value: [{ cotacaoVenda: 3.9 }],
    },
  });
  expect(cotacao).toBe(3.9);
});

describe('getToday', () => {
  const RealDate = Date

  const mockDate = (date) => {
    global.Date = class extends RealDate {
      constructor(){
        return new RealDate(date)
      }
    }
  }

  afterEach(() => {
    global.Date = RealDate
  })

  test('getToday', () => {
    mockDate('2019-01-01T12:00:00z')
    const today = getToday()
    expect(today).toBe('1-1-2019')
  })
})

test('getUrl', () => {
  const url = getUrl('MINHA-DATA')
  expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MINHA-DATA'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
})

test('getCotacao', () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 3.9 }],
    },
  };

  const getToday = jest.fn()
  getToday.mockReturnValue('01-01-2019')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockReturnValue(Promise.reject('err'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.9)

  getCotacaoTest({getToday, getUrl, getCotacaoAPI, extractCotacao})()
    .then(res => {
      expect(res).toBe("")
    })

})



