// services/studentService.ts
import axios from "axios";

const SHEET_IDS: { [key: string]: string } = {
  J24: process.env.SHEET_ID_J24 as string,
  S24: process.env.SHEET_ID_S24 as string,
  F24: process.env.SHEET_ID_F24 as string,

  J23: process.env.SHEET_ID_J23 as string,
  S23: process.env.SHEET_ID_S23 as string,
  F23_1: process.env.SHEET_ID_F23_1 as string,
  F23_2: process.env.SHEET_ID_F23_2 as string,

  J22: process.env.SHEET_ID_J22 as string,
  S22: process.env.SHEET_ID_S22 as string,
  F22: process.env.SHEET_ID_F22 as string,

  J21: process.env.SHEET_ID_J21 as string,
  F21: process.env.SHEET_ID_F21 as string,

  J20: process.env.SHEET_ID_J20 as string,
};

export const fetchStudents = async (sheetKey: string): Promise<any[]> => {
  const spreadsheetId = SHEET_IDS[sheetKey];
  if (!spreadsheetId) {
    throw new Error(`No spreadsheet ID found for ${sheetKey}`);
  }
  const response = await axios.get(
    `/api/students?spreadsheetId=${spreadsheetId}`,
  );
  return response.data;
};