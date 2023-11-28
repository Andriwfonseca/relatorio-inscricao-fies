const csvToJson = require('convert-csv-to-json');
const csvPath = 'src/data/relatorio_fies_22021-utf8.csv';
export const dataCsv = csvToJson.getJsonFromCsv(csvPath);