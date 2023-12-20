import { FC } from "react";
import './SearchTable.scss'

interface Props {
    value: string
    inputEvent: (value: string) => void
}

const SearchTable: FC<Props> = ({value, inputEvent}) => {
    return ( 
        <input
        value={value ?? ''}
        onInput={(event) => inputEvent((event.target as HTMLInputElement).value)}
        className="search--input"
        placeholder="Search all columns..."
      />
     );
}
 
export default SearchTable;