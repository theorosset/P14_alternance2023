import { FC, useState } from "react"
import { stateData, departmentData } from "../../models/dropDownDataModels"
import { useDispatch } from "react-redux"
import { setDepartmentEmploye, setStateEmploye } from "../../store/actions/user.action"
import "./DropDown.scss"


interface Props {
    options: stateData[] | departmentData[]
    dropDownName: string
}

const DropDown: FC<Props> = ({ options, dropDownName } ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownValue, setDropDownValue] = useState('')
    const dispatch = useDispatch()

    function handlerIsOpen() {
        return setIsOpen(!isOpen)
    }

    const handlerSelectDropDown = async (event: React.MouseEvent<HTMLLIElement>) => {
        const name = event.currentTarget.textContent;
        if (dropDownName === "department" && name) {
            await dispatch(setDepartmentEmploye(name) as any);
            setDropDownValue(name)
            setIsOpen(false)
        }
        if (dropDownName === "state" && name) {
            await dispatch(setStateEmploye(name) as any);
            setDropDownValue(name)
            setIsOpen(false)
        }
    };

    return (
        <div className="dropDown__container">
            <div className={`dropDown__container__input ${isOpen ? 'borderBottomNone' : ''}`} onClick={handlerIsOpen}>
                <div className="dropDown__container__input--value">
                <p>{dropdownValue}</p>
                <i className="fas fa-chevron-up"></i>
                </div>
            </div>
            <div className={`dropDown__container__options ${isOpen ? '' : 'displayNone'}`}>
                <ul className="dropDown__container__options--list">
                    { options.map(({id, name}) => <li onClick={handlerSelectDropDown} key={ id }>{ name }</li>) }
                </ul>
            </div>
        </div>
    )
}


export default DropDown