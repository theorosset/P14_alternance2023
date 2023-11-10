import { FC, useRef } from "react"
import Title from "../../titleForm/TitleForm"


interface Props {
    isValidate: Function
}

const StepOne: FC<Props> = ({isValidate}) => {
    const form = useRef<HTMLFormElement>(null)

    function handleSubmit(event: any): void {
        event.preventDefault()
        isValidate()
    }
    
    return (
        <div className="container__step">
            <Title text="Step 1/2" />
            <form ref={form} onSubmit={handleSubmit} className="container__step__form">
                <label htmlFor="firstName">First Name : </label>
                <input type="text" id="firstName" />

                <label htmlFor="lastName">Last Name : </label>
                <input type="text" id="lastName" />

                <label htmlFor="birthday">Date of Birth : </label>
                <input type="date"  id="birthday"/>

                <label htmlFor="startDate"> Start Date : </label>
                <input type="date" id="startDate" />

                <button className="container__step__form--button" type="submit"> send </button>
            </form>
       </div>
    )
}

export default StepOne