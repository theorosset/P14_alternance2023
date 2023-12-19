import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { employeModel } from "../../../models/employeModels";


interface Props {
   table: Table<employeModel>
}
 
const Pagination: FC<Props> = ({ table }) => {
    return (
        <div>
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
            </select>
            <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
          
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </div>
    );
}
 
export default Pagination;