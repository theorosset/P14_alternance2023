import { FC, useCallback, useEffect, useRef, useState } from "react"
import { formValidator } from "../../../../utils/formValidator"
import { formData } from "../../../../models/formDataModels"
import Title from "../../titleForm/TitleForm"
import { useDispatch } from "react-redux"
import { setProfileEmploye } from "../../../../store/actions/user.action"

interface Props {
    isSubmit: boolean;
    isValidate: (formValidation: {step: string, isValid: boolean}) => void
};

const EmployeStep: FC<Props> = ({isSubmit, isValidate}) => {
    const dispatch = useDispatch()
    const form = useRef<HTMLFormElement>(null)
    const [invalidInput, setInvalidInput] = useState<string[]>([])
    
    const handleSubmit = useCallback((event: any) => {
        event.preventDefault()
        const { current } = form
        const validation = { step: 'employe', isValid: false }
        if(current) {
            const formValue = current as unknown as HTMLInputElement[]
            
            const employeData: formData = {
                firstName: formValue[0].value ?? '',
                lastName: formValue[1].value ?? '',
                birthday: formValue[2].value ?? '', 
                startDate: formValue[3].value ?? ''
            }

            const checkInputValidation = formValidator(employeData)

            if(checkInputValidation.length) {
                validation.isValid = false 
                isValidate(validation)
                return setInvalidInput(checkInputValidation)
             }
             validation.isValid = true 
             setInvalidInput([])
             dispatch(setProfileEmploye(employeData) as any)
             isValidate(validation)
        }
    }, [dispatch, isValidate])

    useEffect(() => {
        if (isSubmit) {
            handleSubmit(new Event('submit'));
        }
    }, [isSubmit, handleSubmit]);

    
    return (
        <div className="container">
            <Title text="Create employe" />
            <form  id="1" ref={form} className="container__step__form">
                <label htmlFor="firstName">First Name : </label>
                <input type="text" id="firstName" />
                {  invalidInput.includes('firstName') &&
                     <p>Please enter a valid first name.</p>
                }

                <label htmlFor="lastName">Last Name : </label>
                <input type="text" id="lastName" />
                {  invalidInput.includes('lastName') &&
                     <p>Please enter a valid last name.</p>
                }

                <label htmlFor="birthday">Date of Birth : </label>
                <input type="date"  id="birthday"/>
                {  invalidInput.includes('birthday') &&
                    <p>Please enter a valid date of birth.</p>
                }

                <label htmlFor="startDate"> Start Date : </label>
                <input type="date" id="startDate" />
                {  invalidInput.includes('startDate') &&
                    <p>Please enter a valid start date.</p>
                }
            </form>
       </div>
    )
}

export default EmployeStep