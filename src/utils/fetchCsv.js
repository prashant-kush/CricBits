import Papa from "papaparse";

const fetchCsv = (location) => {
  return fetch(location).then((response) => {
    let reader = response.body.getReader();
    let decoder = new TextDecoder("utf-8");

    return reader.read().then((result) => decoder.decode(result.value));
  });
};

const getCsvData = async (location, cb) => {
  let csvData = await fetchCsv(location);
  Papa.parse(csvData, {
    header: true,
    complete: cb,
  });
};

export default getCsvData;
