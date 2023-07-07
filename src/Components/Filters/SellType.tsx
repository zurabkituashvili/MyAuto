import { useContext, useState, useEffect, useRef } from "react";
import React, { ChangeEvent } from "react";
import { CategoryInterface } from "../Interfaces/CategoryInterface";
import CarTypeContext from "../CarTypes/CarTypeContext";

const SellType: React.FC = () => {
  const [droppedSellType, setDroppedSellType] = useState<boolean>(false);
  const {sellType, setSellType} = useContext(CarTypeContext);
  const [chosenSellSubTypes, setChosenSellSubTypes] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChangeSellType = (event: ChangeEvent<HTMLInputElement>): void => {
    const sellTypeValue = event.target.value;
    if (event.target.checked) {
      setSellType(sellTypeValue);
      setChosenSellSubTypes([]);
    } else {
      setSellType("");
      setChosenSellSubTypes([]);
    }
  };



  const showDropdownSellType = (): void => {
    setDroppedSellType((prevState) => !prevState);
  };

  const handleBlurSellType = (): void => {
    setDroppedSellType(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDroppedSellType(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCheckboxMouseDown = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
  };

  const resetVal = (): void => {
    setSellType("");
    setChosenSellSubTypes([]);
    setDroppedSellType(false);
  };

  const renderInputValue = (): string => {
    let value = sellType;
    if (chosenSellSubTypes.length > 0) {
      value += " (" + chosenSellSubTypes.join(", ") + ")";
    }
    return value;
  };

  console.log("SELLTyPE",sellType);
  

  return (
    <div>
      <div
        tabIndex={0}
        onFocus={showDropdownSellType}
        onBlur={handleBlurSellType}
      >
        <div className="input-group">
          <input
            className="form-control border-1"
            type="text"
            placeholder="გარიგების ტიპი"
            readOnly
            value={renderInputValue()}
          />
          {sellType.length > 0 ? (
            <button className="btn input-group-append" onClick={resetVal}>
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
        {droppedSellType && (
          <div className="checkbox-container3" ref={dropdownRef}>
            <div className="scrollable-checkbox2 border-0 sell-type-dropdown">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="იყიდება"
                  onMouseDown={handleCheckboxMouseDown}
                  value="იყიდება"
                  onChange={handleChangeSellType}
                  checked={sellType === "იყიდება"}
                />
                <label className="form-check-label w-100" htmlFor="იყიდება">
                  იყიდება
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="ქირავდება"
                  onMouseDown={handleCheckboxMouseDown}
                  value="ქირავდება"
                  onChange={handleChangeSellType}
                  checked={sellType === "ქირავდება"}
                />
                <label className="form-check-label w-100" htmlFor="ქირავდება">
                  ქირავდება
                </label>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellType;
