import { FC, useState } from "react";
import EmployeStep from "../../components/form/createEmploye/employeStep/EmployeStep";
import AdressStep from "../../components/form/createEmploye/adressStep/AdressStep";
import "./CreateEmployePage.scss"
import { Link } from "react-router-dom";

const CreateEmployePage: FC = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [employeStepAreValid, setEmployeStepAreValid] = useState(false)

   const verificationValidationForm = (formValidation: {step: string, isValid: boolean }) => {
        if(formValidation.step === 'employe') {
            setEmployeStepAreValid(true)
        }
            setIsSubmit(false)
    }

    const externalSubmit = () => {
        setIsSubmit(true)
    }

    return (
        <div className="container__home">
            <div className="container__step">
                <EmployeStep  isSubmit={isSubmit} isValidate={(formValidation) => verificationValidationForm(formValidation)}/>
                <AdressStep   isSubmit={isSubmit} preventFormValidation={employeStepAreValid} 
                              isValidate={(formValidation) => verificationValidationForm(formValidation)}
                              />
                <button className="container__home--button" type="submit" onClick={externalSubmit}>send</button>
                <Link to={"/employe-listing"}>View current employe</Link>
            </div>
       </div>
    )
}

export default CreateEmployePage