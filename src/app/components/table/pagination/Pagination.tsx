import { Table } from "@tanstack/react-table";
import { FC } from "react";
import { employeModel } from "../../../models/employeModels";
import './Pagintation.scss'

interface Props {
   table: Table<employeModel>
}
 
const Pagination: FC<Props> = ({ table }) => {
    return (
        <div className="container__pagination">
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
            className="container__pagination--leftBtn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
        </div>
    );
}
 
export default Pagination;