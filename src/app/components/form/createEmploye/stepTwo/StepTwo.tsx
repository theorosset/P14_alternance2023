import { FC, useRef, useState } from "react"
import Title from "../../titleForm/TitleForm"
import { formValidator } from "../../../../utils/formValidator"
import { formData } from "../../../../models/formDataModels"
import DropDown from "../../../dropdown/DropDown"
import dropDownData from "../../../../data/dropDownData.json"
import { useDispatch, useSelector } from "react-redux"
import { setProfileEmploye, setNewEmploye } from "../../../../store/actions/user.action"
import { RootState } from "../../../../store/reducers"


const StepTwo: FC = () => {
    const user = useSelector((state: RootState) => state.employeReducer);
    const dispatch = useDispatch()
    const form = useRef<HTMLFormElement>(null)
    const [invalidInput, setInvalidInput] = useState<string[]>([])
    const [openDropDown, setOpenDropDown] = useState('');
    const FieldsCityStreet = ['street', 'city'];

    const handleDropDownToggle = (dropDownName: string) => {
        setOpenDropDown(openDropDown === dropDownName ? '' : dropDownName);
      };
    //check value of dropDown
    function dropDownValidator() {
      const dropdownHaveError: string[] = []
      const dropDowns = document.querySelectorAll('.dropDown__container__input--value')

      dropDowns.forEach((dropdown) => {
        const dropdownValue = dropdown.firstChild as HTMLElement

        if(!dropdownValue.innerText) {
            dropdownHaveError.push(dropdown.id)
        }
      })
      return dropdownHaveError
    }
   
    function handleSubmit(event: any): void {
        event.preventDefault()

        const { current } = form

        if(current) {
            const formValue = current as unknown as HTMLInputElement[]
            
            const employeData: formData = {
                street: formValue[0].value ?? '',
                city: formValue[1].value ?? '',
                zipcode: formValue[2].value ?? '', 
            }

            const checkInputValidation = formValidator(employeData)
            const checkDropDownValue = dropDownValidator()
            if(checkInputValidation.length || checkDropDownValue.length) {
                if(checkDropDownValue.length) {
                    checkInputValidation.push(...checkDropDownValue)
                }
               return setInvalidInput(checkInputValidation)
            }
            dispatch(setProfileEmploye(employeData) as any)
            dispatch(setNewEmploye() as any)
        }
    }

    return (
        <div className="container__step">
            <Title text="Step 2/2" />
            <form ref={form} onSubmit={handleSubmit} className="container__step__form">

                <div className="container__step__form__cityStreet">
                    <div>
                        <label htmlFor="street">Street : </label>
                        <input type="text" id="street" />
                    </div>
                    <div>
                        <label htmlFor="city">City : </label>
                        <input type="text" id="city" />
                    </div>
                </div>
                    {  FieldsCityStreet.some(field => invalidInput.includes(field)) &&
                     
                     <p>
                        Please enter a valid { invalidInput.includes('street') ? 'street' : '' }
                        { FieldsCityStreet.every(field => invalidInput.includes(field)) ? ' and ' : ''}
                        { invalidInput.includes('city') ? 'city' : '' }
                     </p>
                    }

                <label htmlFor="state">State : </label>
                <DropDown
                  options={ dropDownData.state } 
                  dropDownName='state' 
                  isOpen={openDropDown === "state"} 
                  onToggle={() => handleDropDownToggle("state")}
                  id="1"
                />
                { invalidInput.includes('1') &&
                    <p>Please select one in list.</p>
                }

                <label htmlFor="zipcode">Zipcode : </label>
                <input type="number" id="zipcode" />
                {  invalidInput.includes('zipcode') &&
                    <p>Please enter a valid zipcode.</p>
                }

                <label htmlFor="zipcode">Department : </label>
                <DropDown 
                  options={ dropDownData.department }
                  dropDownName='department'  
                  isOpen={openDropDown === "department"} 
                  onToggle={() => handleDropDownToggle("department")}
                  id="2"
                /> 
                { invalidInput.includes('2') &&
                    <p>Please select one in list.</p>
                }

                <button className="container__step__form--button" type="submit"> send </button>
            </form>
       </div>
    )
}

export default StepTwo