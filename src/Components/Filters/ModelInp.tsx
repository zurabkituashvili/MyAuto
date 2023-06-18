import React, {
  ChangeEvent,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import CarTypeContext from "../CarTypes/CarTypeContext";
import "./ModelInp.css";

const ModelInp: React.FC = () => {
  const { modelArr, setModelArr } = useContext(CarTypeContext);
  const { currentMan, setCurrentMan } = useContext(CarTypeContext);
  const { chosenModel, setChosen } = useContext(CarTypeContext);
  const [droppedModel, setDroppedModel] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update checkbox states when chosenModel changes
    updateCheckboxStates();
  }, [chosenModel]);

  const handleChangeMod = (event: ChangeEvent<HTMLInputElement>): void => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setChosen([...chosenModel, checkboxValue]);
    } else {
      const updatedModChecks = chosenModel.filter(
        (val) => val !== checkboxValue
      );
      setChosen(updatedModChecks);
    }
  };

  const resetVal = (): void => {
    setChosen([]);
    setDroppedModel(false);
  };

  const showDropdownMod = (): void => {
    setDroppedModel(true);
  };

  const handleBlurMod = (): void => {
    setDroppedModel(false);
  };

  const handleCheckboxMouseDown = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
  };

  const updateCheckboxStates = (): void => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][name^="category_"]'
    );
    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement;
      inputCheckbox.checked = chosenModel.includes(inputCheckbox.value);
    });
  };

  const getPlaceholderText = (): string => {
    if (chosenModel.length === 0) {
      return "მოდელი";
    } else {
      return chosenModel.join(", ");
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDroppedModel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div tabIndex={0} onFocus={showDropdownMod} onBlur={handleBlurMod}>
        <div className="input-group">
          <input
            className="form-control border-1"
            type="text"
            placeholder={getPlaceholderText()}
          />
          {chosenModel.length > 0 ? (
            <button className="btn  input-group-append" onClick={resetVal}>
              X
            </button>
          ) : (
            <div className="input-group-append">
              <button className="input-group-text">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 11-3 3-3-3"
                    stroke="#6F7383"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className={
            droppedModel ? "checkbox-container2" : "checkbox-container2 d-none"
          }
          ref={dropdownRef}
        >
          <div className={"scrollable-checkbox2 border-0 "}>
            {modelArr.map((model) => {
              return (
                <div className="form-check" key={model.model_name}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={model.model_name}
                    onMouseDown={handleCheckboxMouseDown}
                    value={model.model_name}
                    onChange={handleChangeMod}
                    checked={chosenModel.includes(model.model_name)}
                  />
                  <label
                    className="form-check-label w-100"
                    htmlFor={model.model_name}
                  >
                    {model.model_name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInp;
