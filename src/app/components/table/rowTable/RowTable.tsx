import { Row, flexRender } from "@tanstack/react-table";
import { employeModel } from "../../../models/employeModels";

interface Props {
    rows: Row<employeModel>[]
}
 
const RowTable = ({rows}: Props) => {

    return ( 
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
                ))}
            </tr>
          ))}
        </tbody>
     );
}
 
export default RowTable;