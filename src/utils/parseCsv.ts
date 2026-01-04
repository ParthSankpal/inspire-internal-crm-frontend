import Papa from "papaparse";

export function parseCsvInput(input: File | string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(input, {
      header: true,
      skipEmptyLines: true,
      delimiter: "", // auto-detect CSV / TSV
      complete: (result) => resolve(result.data as any[]),
      error: (err) => reject(err),
    });
  });
}
