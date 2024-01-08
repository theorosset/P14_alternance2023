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
                {[10, 25, 50, 100].map(pageSize => (
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
                {' < Previous'}
            </button>
            <p>{table.getState().pagination.pageIndex + 1}</p>
            <button
             className="container__pagination--rightBtn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
                {'Next >'}
            </button>
        </div>
    );
}
 
export default Pagination;