import { HeaderGroup, flexRender } from "@tanstack/react-table";
import { employeModel } from "../../../models/employeModels";
import { FC } from "react";
import "./Thead.scss"

interface Props {
    headerGroups: HeaderGroup<employeModel>[]
}
 
const Thead: FC<Props> = ({headerGroups}) => {
    return ( 
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.isPlaceholder 
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
     );
}
 
export default Thead;