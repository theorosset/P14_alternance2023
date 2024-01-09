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
  getFilteredRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import RowTable from "../../components/table/rowTable/RowTable";
import "./EmployeListingPage.scss"
import SearchTable from "../../components/table/searchTable/SearchTable";
import { Link } from "react-router-dom";


const EmployeListingPage: FC = () => {
  const user = useSelector((state: RootState) => state.employeReducer.allEmploye);
  const [data, setData] = useState(user);
  const [onSearchData] = useState(user);
  const columnHelper = createColumnHelper<employeModel>();

  const searchFilter = (searchValue: string) => {
    const searchLower = searchValue.toLowerCase();
    const rows = onSearchData 
  
    const filteredEmployees = rows.filter((employee: employeModel) => {
     
      for (const key in employee) {
        if (employee.hasOwnProperty(key)) { 
          const value = employee[key as keyof employeModel];
          if (typeof value === 'string' && value.toLowerCase().includes(searchLower)) {
            return true;
          }
        }
      }
      return false;
    });
  
    return setData(filteredEmployees);
  };
  

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
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  
  return (
    <div className="container__listing">
        <h1>Current Employees</h1>
      <div className="container__listing__table">
        <div className="container__listing__table--search">
          <SearchTable inputEvent={(value) => searchFilter(value)} />
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