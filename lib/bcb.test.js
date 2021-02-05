import { extractCotacao, getCotacaoAPI } from "./bcb.js";
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
