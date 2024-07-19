// components/StudentTable.tsx
/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  width: 100%;
  height: 80vh; /* 화면 높이를 차지하도록 설정 */
  overflow: auto; /* 스크롤을 가능하게 설정 */
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 12px; /* 전체 폰트 사이즈를 줄임 */
`;

const thStyle = css`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 3; /* Ensure the header is above other content */
  font-size: 10px; /* 헤더 폰트 사이즈를 줄임 */
  min-width: 50px;
  max-width: 200px; /* 최대 너비를 200px로 설정 */
`;

const tdStyle = css`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 11px; /* 셀 폰트 사이즈를 줄임 */
  min-width: 50px;
  max-width: 200px; /* 최대 너비를 200px로 설정 */
  cursor: pointer;
  position: relative;
`;

const stickyColStyle = css`
  position: sticky;
  left: 0;
  background-color: #f2f2f2;
  z-index: 2; /* Ensure the first column is above other content */
`;

const stickySecondColStyle = css`
  position: sticky;
  left: 50px; /* Adjust this value based on the width of the first sticky column */
  background-color: #f2f2f2;
  z-index: 2; /* Ensure the second column is above other content */
`;

type Props = {
  students: any[];
};

export const StudentTable: React.FC<Props> = ({ students }) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (students.length > 0) {
      setHeaders(students[0]);
      setRows(students.slice(1));
    }
  }, [students]);

  return (
    <div css={containerStyle} ref={containerRef}>
      <table css={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                css={[
                  thStyle,
                  index === 0
                    ? stickyColStyle
                    : index === 1
                      ? stickySecondColStyle
                      : null,
                ]}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((student, rowIndex) => (
            <tr key={rowIndex}>
              {student.map((data: string, colIndex) => (
                <td
                  key={colIndex}
                  css={[
                    tdStyle,
                    colIndex === 0
                      ? stickyColStyle
                      : colIndex === 1
                        ? stickySecondColStyle
                        : null,
                  ]}
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
