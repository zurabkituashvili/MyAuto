import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { useContext } from "react";
import CarTypeContext from "../CarTypes/CarTypeContext";
import "./Category.css";

const Category: React.FC = () => {
  const { categories, setCategories } = useContext(CarTypeContext);
  const { chosenCategories, setChosenCategories } = useContext(CarTypeContext);
  const [droppedCat, setDroppedCat] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update checkbox states when chosenCategories changes
    updateCheckboxStates();
  }, [chosenCategories]);

  const handleChangeCat = (event: ChangeEvent<HTMLInputElement>): void => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setChosenCategories([...chosenCategories, checkboxValue]);
    } else {
      const updatedCategor = chosenCategories.filter(
        (val) => val !== checkboxValue
      );
      setChosenCategories(updatedCategor);
    }
  };

  const showDropdownCat = (): void => {
    setDroppedCat(true);
  };

  const handleBlurCat = (): void => {
    setDroppedCat(false);
  };

  const handleCheckboxMouseDown = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
  };

  const resetVal = (): void => {
    setChosenCategories([]);
    updateCheckboxStates();
    setDroppedCat(false);
  };

  const updateCheckboxStates = (): void => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][name^="category_"]'
    );
    checkboxes.forEach((checkbox) => {
      const inputCheckbox = checkbox as HTMLInputElement;
      inputCheckbox.checked = chosenCategories.includes(inputCheckbox.value);
    });
  };

  const getPlaceholderText = (): string => {
    if (chosenCategories.length === 0) {
      return "კატეგორია";
    } else {
      return chosenCategories.join(", ");
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDroppedCat(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative" ref={dropdownRef}>
      <div tabIndex={0} onFocus={showDropdownCat} onBlur={handleBlurCat}>
        <div className="input-group">
          <input
            className="form-control border-1"
            type="text"
            placeholder={getPlaceholderText()}
          />
          {chosenCategories.length > 0 ? (
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
            droppedCat ? "checkbox-container3" : "checkbox-container3 d-none"
          }
        >
          <div className="scrollable-checkbox2">
            {categories.map((cat) => {
              return (
                <div className="form-check" key={cat.title}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={`category_${cat.title}`}
                    onMouseDown={handleCheckboxMouseDown}
                    value={cat.title}
                    onChange={handleChangeCat}
                  />
                  <label
                    className="form-check-label w-100"
                    htmlFor={`category_${cat.title}`}
                  >
                    {cat.title}
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

export default Category;
