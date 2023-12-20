import { FC, useEffect, useState } from "react";
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
  FilterFn,
  getFilteredRowModel
} from "@tanstack/react-table";
import RowTable from "../../components/table/rowTable/RowTable";
import "./EmployeListingPage.scss"
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import SearchTable from "../../components/table/searchTable/SearchTable";


declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const EmployeListingPage: FC = () => {
  const user = useSelector((state: RootState) => state.employeReducer.allEmploye);
  const [data, setData] = useState(user);
  const [globalFilter, setGlobalFilter] = useState('')
  const columnHelper = createColumnHelper<employeModel>();

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)
    
    // Store the itemRank info
    addMeta({
      itemRank,
    })
  
    // Return if the item should be filtered in/out
    return itemRank.passed
  }

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
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="container__listing">
        <h1>Current Employees</h1>
      <div className="container__listing__table">
        <div className="container__listing__table--search">
          <SearchTable 
            value={globalFilter ?? ''} 
            inputEvent={(value) => setGlobalFilter(value)}
          />
        </div>
        <table>
          <Thead headerGroups={table.getHeaderGroups()}/>
          <RowTable rows={table.getRowModel().rows}/>
        </table>
        <Pagination table={table} />
      </div>
    </div>
  );
};

export default EmployeListingPage;
