import { FC, useCallback, useEffect, useRef, useState } from "react";
import { formValidator } from "../../../../utils/formValidator";
import { formData } from "../../../../models/formDataModels";
import dropDownData from "../../../../data/dropDownData.json";
import {
  setDepartmentEmploye,
  setStateEmploye,
} from "../../../../store/actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setProfileEmploye,
  setNewEmploye,
} from "../../../../store/actions/user.action";
import { DropDown } from "p14-dropdown-lib-alternance";
import Modal from "../../../modal/modal";

interface Props {
  isSubmit: boolean;
  preventFormValidation: boolean;
  isValidate: (formValidation: {step: string, isValid: boolean}) => void
}

const AdressStep: FC<Props> = ({ isSubmit, preventFormValidation, isValidate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const [invalidInput, setInvalidInput] = useState<string[]>([]);
  const [openedDropDown, setOpenedDropDown] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const FieldsCityStreet = ["street", "city"];

  const handlerSelectDropDown = async (dropdownValue: any) => {
    const { id, value } = dropdownValue;

    if (id === 1 && value) {
      await dispatch(setStateEmploye(value) as any);
    }
    if (id === 2 && value) {
      await dispatch(setDepartmentEmploye(value) as any);
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

  const handleSubmit = useCallback((event: any) => {
      event.preventDefault();

      const { current } = form;
      const validation = { step: 'adress', isValid: false }
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
          validation.isValid = false
          isValidate(validation)
          if (checkDropDownValue.length) {
            checkInputValidation.push(...checkDropDownValue);
          }

          return setInvalidInput(checkInputValidation);
        }
        if (preventFormValidation) {
          validation.isValid = true
          setInvalidInput([])
          dispatch(setProfileEmploye(employeData) as any);
          dispatch(setNewEmploye() as any);
          isValidate(validation)
          setOpenModal(true);
        }
      }
    },
    [dispatch, preventFormValidation, isValidate]
  );

  useEffect(() => {
    if (isSubmit) {
      handleSubmit(new Event("submit"));
    }
  }, [isSubmit, handleSubmit]);

  const handleClosedModal = () => {
    if (preventFormValidation) {
      navigate("/employe-listing");
    }
  };
  return (
    <div className="container">
      <form ref={form} className="container__step__form">
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
            Please enter a valid{" "}
            {invalidInput.includes("street") ? "street" : ""}
            {FieldsCityStreet.every((field) => invalidInput.includes(field))
              ? " and "
              : ""}
            {invalidInput.includes("city") ? "city" : ""}
          </p>
        )}

        <label htmlFor="state">State : </label>
        <DropDown
          id={1}
          options={dropDownData.state}
          onSelectedValue={(value: { id: number; value: string }) =>
            handlerSelectDropDown(value)
          }
          idOfDropdownOpened={openedDropDown}
          onOpened={(id) => setTimeout(() => setOpenedDropDown(id), 0)}
        />
        {invalidInput.includes("1") && <p>Please select one in list.</p>}

        <label htmlFor="zipcode">Zipcode : </label>
        <input type="number" id="zipcode" />
        {invalidInput.includes("zipcode") && (
          <p>Please enter a valid zipcode.</p>
        )}

        <label htmlFor="zipcode">Department : </label>

        <DropDown
          id={2}
          options={dropDownData.department}
          onSelectedValue={(value: { id: number; value: string }) =>
            handlerSelectDropDown(value)
          }
          idOfDropdownOpened={openedDropDown}
          onOpened={(id) => setTimeout(() => setOpenedDropDown(id), 0)}
        />

        {invalidInput.includes("2") && <p>Please select one in list.</p>}
      </form>
      <Modal
        content="Employe created !"
        isOpen={openModal}
        onClosed={handleClosedModal}
      />
    </div>
  );
};

export default AdressStep;
