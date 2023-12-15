import { FC, useState } from "react";
import "./EmployeListingPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { employeModel } from "../../models/employeModels";
import Thead from "../../components/table/headerTable/Thead";
import Pagination from "../../components/table/pagination/Pagination";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RowTable from "../../components/table/rowTable/RowTable";

const EmployeListingPage: FC = () => {
  const user = useSelector(
    (state: RootState) => state.employeReducer.allEmploye
  );
  const [data, setData] = useState(user);
  const columnHelper = createColumnHelper<employeModel>();

  const columns = (): ColumnDef<employeModel,string>[] => {
    const columns: ColumnDef<employeModel,string>[] = [] 
    const keysForColumns = [
      "firstName",
      "lastName",
      "birthday",
      "city",
      "street",
      "departmentWork",
      "state",
      "zipcode",
    ];
    for(let i = 0; i < keysForColumns.length; i++ ) {
      const columnName = keysForColumns[i]
  
      columns.push(
        columnHelper.accessor(columnName as keyof employeModel, {
        id: columnName,
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      })
      )
    }
    return columns
  };


  const table = useReactTable({
    data,
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="container__home">
      <table>
        <Thead headerGroups={table.getHeaderGroups()}/>
        <RowTable rows={table.getRowModel().rows}/>
        <Pagination table={table} />
      </table>
    </div>
  );
};

export default EmployeListingPage;
