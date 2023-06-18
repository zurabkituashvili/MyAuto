import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { useContext } from "react";
import CarTypeContext from "../CarTypes/CarTypeContext";
import { ManufacturerInterface } from "../Interfaces/ManufacturerInterface";
import "bootstrap/dist/css/bootstrap.css";
import "./Manufacturer.css";

const Manufacturer: React.FC = () => {
  const { cartegory, setCartegory } = useContext(CarTypeContext);

  const { manArr, setManArr } = useContext(CarTypeContext);
  const { currentMan, setCurrentMan } = useContext(CarTypeContext);
  const { chosenCategories, setChosenCategories } = useContext(CarTypeContext);
  const [dropped, setDropped] = useState<boolean>(false);

  const { modelArr, setModelArr } = useContext(CarTypeContext);

  const [wholeManufacturers, setWholeManufacturers] = useState<
    ManufacturerInterface[]
  >([]);

  const [placeholder, setPlaceholder] = useState<string>("მწარმოებელი");

  function findId(name: string): string {
    let id = "error";
    manArr.forEach((e) => {
      if (name === e.man_name) {
        id = e.man_id;
      }
    });
    return id;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const checkboxValue = event.target.value;
    let url =
      "https://api2.myauto.ge/ka/getManModels?man_id=" + findId(checkboxValue);
    if (event.target.checked) {
      setCurrentMan([...currentMan, event.target.value]);
      fetchModels(url);
    } else {
      const updatedChecks = currentMan.filter(
        (value) => value !== checkboxValue
      );
      setCurrentMan(updatedChecks);
      const updateModels = modelArr.filter(
        (mod) => mod.man_id.toString() !== checkboxValue
      );
      setModelArr(updateModels);
    }
  };

  const fetchModels = async (url: string): Promise<void> => {
    console.log(url);
    try {
      const response: Response = await fetch(url);
      const data = await response.json();
      setModelArr([...modelArr, ...data.data]);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };

  useEffect(() => {
    setWholeManufacturers(manArr);
  }, []);

  useEffect(() => {
    let newManufacturers: ManufacturerInterface[] = [];
    if (cartegory === 0) {
      newManufacturers = wholeManufacturers.filter((e) => e.is_car === "1");
    } else if (cartegory === 1) {
      newManufacturers = wholeManufacturers.filter((e) => e.is_spec === "1");
    } else if (cartegory === 2) {
      newManufacturers = wholeManufacturers.filter((e) => e.is_moto === "1");
    }
    if (wholeManufacturers.length > 0) {
      setManArr(newManufacturers);
    }
  }, [cartegory, wholeManufacturers.length]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const showDropdown = (): void => {
    if (!dropped) {
      setDropped(true);
    }
  };

  const handleBlur = (): void => {
    setDropped(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropped(false);
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

  const handleLabelMouseDown = (
    event: React.MouseEvent<HTMLLabelElement>
  ): void => {
    event.preventDefault();
  };

  const resetVal = (group: string): void => {
    if (group === "man") {
      setCurrentMan([]);
      setModelArr([]);
      setDropped(false);
    }
  };

  return (
    <div>
      <div className="form-group">
        <div tabIndex={0} onFocus={showDropdown} onBlur={handleBlur}>
          <div className="input-group">
            <input
              className="form-control border-1"
              type="text"
              readOnly
              value={currentMan.join(", ")}
              placeholder={placeholder}
            />
            {currentMan.length > 0 ? (
              <button
                className="btn  input-group-append"
                onClick={() => resetVal("man")}
              >
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
              dropped ? "checkbox-container " : "checkbox-container d-none "
            }
            ref={dropdownRef}
          >
            <div className={"scrollable-checkbox border-0 "}>
              {manArr.map((man) => {
                return (
                  <div className="form-check" key={man.man_name}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={man.man_name}
                      id={man.man_name}
                      onMouseDown={handleCheckboxMouseDown}
                      value={man.man_name}
                      onChange={handleChange}
                      checked={currentMan.includes(man.man_name)}
                    />
                    <label
                      onClick={handleLabelMouseDown}
                      className="form-check-label w-100"
                      htmlFor={man.man_name}
                    >
                      {man.man_name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;
