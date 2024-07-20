// services/studentService.ts
import axios from "axios";

const SHEET_IDS: { [key: string]: string[] } = {
  All24: [
    process.env.SHEET_ID_J24,
    process.env.SHEET_ID_S24,
    process.env.SHEET_ID_F24,
  ],
  All23: [
    process.env.SHEET_ID_J23,
    process.env.SHEET_ID_S23,
    process.env.SHEET_ID_F23_1,
    process.env.SHEET_ID_F23_2,
  ],
  All22: [
    process.env.SHEET_ID_J22,
    process.env.SHEET_ID_S22,
    process.env.SHEET_ID_F22,
  ],
  All21: [process.env.SHEET_ID_J21, process.env.SHEET_ID_F21],
  All20: [process.env.SHEET_ID_J20],
  // 나머지 개별 시트 ID는 기존과 동일하게 설정
  J24: [process.env.SHEET_ID_J24],
  S24: [process.env.SHEET_ID_S24],
  F24: [process.env.SHEET_ID_F24],
  J23: [process.env.SHEET_ID_J23],
  S23: [process.env.SHEET_ID_S23],
  F23_1: [process.env.SHEET_ID_F23_1],
  F23_2: [process.env.SHEET_ID_F23_2],
  J22: [process.env.SHEET_ID_J22],
  S22: [process.env.SHEET_ID_S22],
  F22: [process.env.SHEET_ID_F22],
  J21: [process.env.SHEET_ID_J21],
  F21: [process.env.SHEET_ID_F21],
  J20: [process.env.SHEET_ID_J20],
};

const fetchSheetData = async (spreadsheetId: string) => {
  const response = await axios.get(
    `/api/students?spreadsheetId=${spreadsheetId}`,
  );
  return response.data;
};

export const fetchStudents = async (sheetKey: string): Promise<any[]> => {
  const spreadsheetIds = SHEET_IDS[sheetKey];
  if (!spreadsheetIds) {
    throw new Error(`No spreadsheet ID found for ${sheetKey}`);
  }

  const promises = spreadsheetIds.map((spreadsheetId) =>
    fetchSheetData(spreadsheetId),
  );
  const results = await Promise.all(promises);

  // 데이터 병합
  const mergedData = results.flat();
  return mergedData;
};
