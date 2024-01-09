import { FC } from "react";
import './SearchTable.scss'

interface Props {
    inputEvent: (value: string) => void
}

const SearchTable: FC<Props> = ({inputEvent}) => {
    return ( 
        <input
        onInput={(event) => inputEvent((event.target as HTMLInputElement).value)}
        className="search--input"
        placeholder="Search all columns..."
      />
     );
}
 
export default SearchTable;