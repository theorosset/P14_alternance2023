import { FC, useEffect, useState } from "react";
import EmployeStep from "../../components/form/createEmploye/employeStep/EmployeStep";
import AdressStep from "../../components/form/createEmploye/adressStep/AdressStep";
import "./CreateEmployePage.scss"
import { Link } from "react-router-dom";

const CreateEmployePage: FC = () => {
    const [isEmployeSubmit, setIsEmployeSubmit] = useState(false)
    const [isAdressSubmit, setIsAdressSubmit] = useState(false)
    const [employeStepAreValid, setEmployeStepAreValid] = useState(false)


    useEffect(() => {
        if(isEmployeSubmit) {
            setIsAdressSubmit(true)
        }
    }, [isEmployeSubmit])
    
    const verificationValidationForm = (formValidation: {step: string, isValid: boolean }) => {
        if(formValidation.step === 'employe' && formValidation.isValid === true) {
            setEmployeStepAreValid(true)
        } else if (formValidation.step === 'employe' && formValidation.isValid === false) {
            setEmployeStepAreValid(false)
        }
        setIsEmployeSubmit(false)
        setIsAdressSubmit(false)
    }

    const externalSubmit = () => {
        setIsEmployeSubmit(true)
    }

    return (
        <div className="container__home">
            <div className="container__step">
                <EmployeStep  isSubmit={isEmployeSubmit} isValidate={(formValidation) => verificationValidationForm(formValidation)}/>
                <AdressStep   isSubmit={isAdressSubmit} preventFormValidation={employeStepAreValid} 
                              isValidate={(formValidation) => verificationValidationForm(formValidation)}
                              />
                <button className="container__home--button" type="submit" onClick={externalSubmit}>send</button>
                <Link to={"/employe-listing"}>View current employe</Link>
            </div>
       </div>
    )
}

export default CreateEmployePage