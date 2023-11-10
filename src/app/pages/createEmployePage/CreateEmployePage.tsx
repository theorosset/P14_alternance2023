import { FC, useState } from "react";
import StepOne from "../../components/form/createEmploye/stepOne/StepOne";
import StepTwo from "../../components/form/createEmploye/stepTwo/StepTwo";
import "./CreateEmployePage.scss"

const CreateEmployePage: FC = () => {
    const [isStepOne, setIsStepOne] = useState(true)

    function test() {
        setIsStepOne(false)
    }
    console.log(isStepOne)
    return (
        <div className="container__home">
            {isStepOne &&
            <StepOne isValidate={test} />
            }
            {isStepOne === false &&
                <StepTwo />
            }
       </div>
    )
}

export default CreateEmployePage