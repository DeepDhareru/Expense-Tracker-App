import { FileDown } from "lucide-react";

import Button from "../ui/Button";

import { generatePDF } from "../../utils/generatePDF";

export default function PDFExportButton({

  transactions,
  income,
  expense,
  balance,

}) {

  return (

    <Button
      onClick={() =>
        generatePDF({
          transactions,
          income,
          expense,
          balance,
        })
      }
      className="flex items-center gap-2"
    >

      <FileDown size={18} />

      Download Report

    </Button>
  );
}