import { Table, flexRender } from "@tanstack/react-table";
import { FC } from "react";
import "./Thead.scss"

interface Props {
    table: Table<any>
}
const Thead: FC<Props> = ({table}) => {

    return ( 
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} colSpan={header.colSpan}> 
                  <div  className='cursor-pointer' onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              )
            })}
          </tr>
          ))}
        </thead>
     );
}
 
export default Thead;