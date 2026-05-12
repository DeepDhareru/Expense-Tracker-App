import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

export const exportToExcel = (
  transactions
) => {

  // FORMAT DATA
  const formattedData =
    transactions.map((t) => ({

      Category: t.category,

      Type: t.type,

      Amount: t.amount,

      Recurring:
        t.isRecurring
          ? t.recurringType
          : "No",

    }));

  // CREATE WORKSHEET
  const worksheet =
    XLSX.utils.json_to_sheet(
      formattedData
    );

  // CREATE WORKBOOK
  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Transactions"

  );

  // BUFFER
  const excelBuffer =
    XLSX.write(workbook, {

      bookType: "xlsx",

      type: "array",

    });

  // FILE
  const fileData =
    new Blob([excelBuffer], {

      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

    });

  saveAs(
    fileData,
    "transactions-report.xlsx"
  );
};