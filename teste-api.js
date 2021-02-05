import axios from "axios";

const url = `https://gouolinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/aplicacao#!/recursos/CotacaoDolarDia#eyJmb3JtdWxhcmlvIjp7IiRmb3JtYXQiOiJqc29uIiwiJHRvcCI6MTAwLCJkYXRhQ290YWNhbyI6IjA0LTIxLTIwMjAifSwicHJvcHJpZWRhZGVzIjpbMCwxLDJdfQ==`;

axios
  .get(url)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
