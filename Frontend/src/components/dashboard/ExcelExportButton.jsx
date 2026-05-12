import {

  FileSpreadsheet,

} from "lucide-react";

import Button from "../ui/Button";

import {

  exportToExcel,

} from "../../utils/exportExcel";

export default function ExcelExportButton({

  transactions,

}) {

  return (

    <Button
      onClick={() =>
        exportToExcel(
          transactions
        )
      }
      className="flex items-center gap-2"
    >

      <FileSpreadsheet size={18} />

      Export Excel

    </Button>
  );
}