// components/StudentTableAll.tsx
/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerStyle = css`
  width: 100%;
  height: 80vh; /* 화면 높이를 차지하도록 설정 */
  overflow: auto;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 12px;
`;

const thStyle = css`
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 3;
  font-size: 10px;
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
  font-size: 11px;
  min-width: 50px;
  max-width: 200px; /* 최대 너비를 200px로 설정 */
  cursor: pointer;
`;

const stickyColStyle = css`
  position: sticky;
  left: 0;
  background-color: #f2f2f2;
  z-index: 2;
`;

const stickySecondColStyle = css`
  position: sticky;
  left: 50px;
  background-color: #f2f2f2;
  z-index: 2;
`;

const toastContainerStyle = css`
  .Toastify__toast-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: 100%;
    max-width: 500px;
    @media (max-width: 768px) {
      max-width: 90%;
      bottom: 20px;
    }
  }
`;

type Props = {
  students: any[];
};

export const StudentTableAll: React.FC<Props> = ({ students }) => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (students.length > 0) {
      setHeaders(students[0]);
      setRows(students.slice(1));
    }
  }, [students]);

  const handleDoubleClick = (data: string) => {
    toast(data, { autoClose: 3000, position: "bottom-center" });
  };

  return (
    <div css={containerStyle} ref={containerRef}>
      <ToastContainer css={toastContainerStyle} />
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
                  onDoubleClick={() => handleDoubleClick(data)}
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
