import { FC } from "react";

interface Props {
    value: string
    inputEvent: (value: string) => void
}



const SearchTable: FC<Props> = ({value, inputEvent}) => {


    return ( 
        <input
        value={value ?? ''}
        onInput={(event) => inputEvent((event.target as HTMLInputElement).value)}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />
     );
}
 
export default SearchTable;