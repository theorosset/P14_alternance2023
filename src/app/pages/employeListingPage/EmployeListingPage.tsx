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
  FilterFn,
  getFilteredRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import RowTable from "../../components/table/rowTable/RowTable";
import "./EmployeListingPage.scss"
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import SearchTable from "../../components/table/searchTable/SearchTable";
import { Link } from "react-router-dom";

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
  const [data] = useState(user);
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
      "FirstName",
      "LastName",
      "Start Date",
      "Department Work",
      "Birthday",
      "City",
      "Street",
      "State",
      "Zipcode",
    ];
    for(let i = 0; i < keysForColumns.length; i++ ) {
      const columnName = keysForColumns[i]
      // Delete space of keys and replace first letter uppercase to lowerCase
      const columnRef = columnName.replace(' ', '').replace(/^.{1}/g, columnName[0].toLowerCase())

      columns.push(
        columnHelper.accessor(columnRef as keyof employeModel, {
        id: columnName,
        header: columnName,
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
    getSortedRowModel: getSortedRowModel(),
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
          <Thead table={table}/>
          <RowTable rows={table.getRowModel().rows}/>
        </table>
        <Pagination table={table} />
      </div>
      <Link to={"/"}> Home </Link>
    </div>
  );
};

export default EmployeListingPage;