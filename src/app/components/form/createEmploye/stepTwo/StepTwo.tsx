import { FC, useRef, useState } from "react";
import Title from "../../titleForm/TitleForm";
import { formValidator } from "../../../../utils/formValidator";
import { formData } from "../../../../models/formDataModels";
import dropDownData from "../../../../data/dropDownData.json";
import {setDepartmentEmploye, setStateEmploye} from "../../../../store/actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfileEmploye, setNewEmploye } from "../../../../store/actions/user.action";
import { DropDown } from "p14-dropdown-lib-alternance";

const StepTwo: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const [invalidInput, setInvalidInput] = useState<string[]>([]);
  const [openedDropDown, setOpenedDropDown] = useState(0);
  const FieldsCityStreet = ["street", "city"];

  const handlerSelectDropDown = async (dropdownValue: any) => {
    const { id, value } = dropdownValue;

    if (id === "2" && value) {
      await dispatch(setDepartmentEmploye(value) as any);
    }
    if (id === "1" && value) {
      await dispatch(setStateEmploye(value) as any);
    }
  };

  //check value of dropDown
  function dropDownValidator() {
    const dropdownHaveError: string[] = [];
    const dropDowns = document.querySelectorAll(
      ".dropDown__container__input--value"
    );

    dropDowns.forEach((dropdown) => {
      const dropdownValue = dropdown.firstChild as HTMLElement;

      if (!dropdownValue.innerText) {
        dropdownHaveError.push(dropdown.id);
      }
    });
    return dropdownHaveError;
  }

  function handleSubmit(event: any): void {
    event.preventDefault();

    const { current } = form;

    if (current) {
      const formValue = current as unknown as HTMLInputElement[];
      
      const employeData: formData = {
        street: formValue[0].value ?? "",
        city: formValue[1].value ?? "",
        zipcode: formValue[2].value ?? "",
      };

      const checkInputValidation = formValidator(employeData);
      const checkDropDownValue = dropDownValidator();

      if (checkInputValidation.length || checkDropDownValue.length) {
        if (checkDropDownValue.length) {
          checkInputValidation.push(...checkDropDownValue);
        }
        return setInvalidInput(checkInputValidation);
      }
      
      dispatch(setProfileEmploye(employeData) as any);
      dispatch(setNewEmploye() as any);
      // navigate("/employe-listing");
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
        {FieldsCityStreet.some((field) => invalidInput.includes(field)) && (
          <p>
            Please enter a valid{ " " }
            { invalidInput.includes("street") ? "street" : "" }
            { FieldsCityStreet.every((field) => invalidInput.includes(field))
              ? " and "
              : "" }
            {invalidInput.includes("city") ? "city" : ""}
          </p>
        )}

        <label htmlFor="state">State : </label>
        <DropDown
          id={1}
          options={dropDownData.state}
          onSelectedValue={(value: any) => handlerSelectDropDown(value)}
          idOfDropdownOpened={openedDropDown}
          onOpened={(id) => setOpenedDropDown(id)}
        />
        {invalidInput.includes("1") && <p>Please select one in list.</p>}

        <label htmlFor="zipcode">Zipcode : </label>
        <input type="number" id="zipcode" />
        {invalidInput.includes("zipcode") && (<p>Please enter a valid zipcode.</p>)}

        <label htmlFor="zipcode">Department : </label>

        <DropDown
          id={2}
          options={dropDownData.department}
          onSelectedValue={(value: any) => handlerSelectDropDown(value)}
          idOfDropdownOpened={openedDropDown}
          onOpened={(id) => setOpenedDropDown(id)}
        />

        { invalidInput.includes("2") && <p>Please select one in list.</p> }

        <button className="container__step__form--button" type="submit">send</button>
      </form>
    </div>
  );
};

export default StepTwo;
