import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export const generatePDF = ({
  transactions,
  income,
  expense,
  balance,
}) => {

  const doc = new jsPDF();

  // TITLE
  doc.setFontSize(22);

  doc.text(
    "Expense Tracker Report",
    20,
    20
  );

  // SUMMARY
  doc.setFontSize(14);

  doc.text(
    `Total Income: ₹${income}`,
    20,
    40
  );

  doc.text(
    `Total Expense: ₹${expense}`,
    20,
    50
  );

  doc.text(
    `Balance: ₹${balance}`,
    20,
    60
  );

  // TABLE
  autoTable(doc, {

    startY: 80,

    head: [[
      "Category",
      "Type",
      "Amount",
    ]],

    body: transactions.map((t) => [
      t.category,
      t.type,
      `₹${t.amount}`,
    ]),
  });

  // SAVE
  doc.save("expense-report.pdf");
};