const csvToJson = require('convert-csv-to-json');
const csvPath = 'src/data/relatorio_inscricao_dados_abertos_fies_22021.csv';
export const dataCsv = csvToJson.getJsonFromCsv(csvPath);