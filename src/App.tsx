import React, { useContext, useEffect, useState } from "react";
import { CarTypeInterface } from "./Components/Interfaces/CarTypeInterface";
import CarTypeComp from "./Components/CarTypes/CarTypeComp";
import CarTypeContext from "./Components/CarTypes/CarTypeContext";
import { ProductInterface } from "./Components/Interfaces/ProductInterface";
import { ManufacturerInterface } from "./Components/Interfaces/ManufacturerInterface";
import { modelInterface } from "./Components/Interfaces/ModelInterface";
import ModelInp from "./Components/Filters/ModelInp";
import Manufacturer from "./Components/Filters/Manufacturer";
import ProductComponent from "./Components/Cards/Product";
import "bootstrap/dist/css/bootstrap.css";
import "./Components/Cards/Pages.css";
import Pagination from "./Components/Cards/Paginations";
import "./SearchResults.css";
import "./Components/Header/Header.css";
import Header from "./Components/Header/Header";
import SortDropdown from "./Components/DropDown/DropDown";
import "./Components/DropDown/Group33738.css";
import Category from "./Components/Filters/Category";
import PriceFilter from "./Components/Filters/PriceFilter";
import FilterButton from "./Components/Filters/FilterButton";
import "./iphone11/iphone11pro.css";
import SellType from "./Components/Filters/SellType";

const App: React.FC = () => {
  const [categories, setCategories] = useState<CarTypeInterface[]>([]);
  const [cartegory, setCartegory] = useState<number>(0);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [PriceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  const [manArr, setManArr] = useState<ManufacturerInterface[]>([]);
  const [currentMan, setCurrentMan] = useState<string[]>([]);

  //should get man id and then fetch from
  const [modelArr, setModelArr] = useState<modelInterface[]>([]);
  const [chosenModel, setChosen] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [fetchedProductCount, setFetchedProductCount] = useState<number>(0);

  const [wholeProducts, setWholeProducts] = useState<ProductInterface[]>([]);

  const [isHidden, setIsHidden] = useState(true);

  const [sellType,setSellType] = useState("")

  //-------------------------------------------------------//
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProd,setVisible] = useState<ProductInterface[]>([])

  const [filterMethod, setFilterMethod] = useState("");
  const [sortMethod, setSortMethod] = useState("option1");

  const itemsPerPage = 5;

  const totalPage = Math.ceil(visibleProd.length / itemsPerPage);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const matchesMediaQuery = (mediaQuery: string) => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia(mediaQuery);
      return mql.matches;
    }
    return false;
  };

  const isSmallScreen = matchesMediaQuery(
    "only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
  );

  const isDivHidden = isSmallScreen && isHidden;

  const fetchCategories = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        "https://api2.myauto.ge/ka/cats/get"
      );
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };

  const fetchManufacturers = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        "https://static.my.ge/myauto/js/mans.json"
      );
      const data = await response.json();
      setManArr(data);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };
  const fetchProducts = async (): Promise<void> => {
    try {
      let page = 1;
      let hasMorePages = true;
      let fetchedCount = 0;

      while (hasMorePages && page <= 20) {
        const response: Response = await fetch(
          `https://api2.myauto.ge/ka/products/?Page=${page}`
        );
        const data = await response.json();

        if (data.data.items.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...data.data.items]);
          setVisible((prevProducts) => [...prevProducts, ...data.data.items])
          setWholeProducts((prevProducs) => [
            ...prevProducs,
            ...data.data.items,
          ]);
          fetchedCount += data.data.items.length;
          setFetchedProductCount(fetchedCount);
          page++;
        } else {
          hasMorePages = false;
        }
      }
    } catch (error) {
      console.error("Error while fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchManufacturers();
    
  }, []);

  const productsToDisplay = visibleProd.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNum: number) => setCurrentPage(pageNum);

  if (wholeProducts.length < 300) {
    return <div>LOADING</div>;
  } else {
    return (
      <div className="searchResult">
        <CarTypeContext.Provider
          value={{
            sellType,
            setSellType,
            categories,
            setCategories,
            cartegory,
            setCartegory,
            manArr,
            setManArr,
            currentMan,
            setCurrentMan,
            modelArr,
            setModelArr,
            chosenModel,
            setChosen,
            chosenCategories,
            setChosenCategories,
            PriceRange,
            setPriceRange,
            products,
            setProducts,
            currentPage,
            setCurrentPage,
            visibleProd,
            setVisible,
            filterMethod,
            setFilterMethod,
            sortMethod,
            setSortMethod
          }}
        >
          <Header />
          {/* <div className="filterbg">
            <div className="recctangle"></div>
          </div> */}

          <div className="Group33738">
            <SortDropdown wholeProducts={wholeProducts} />
            <p className="gancxadebebisraodenoba">
              {visibleProd.length} განცხადება
            </p>
          </div>

          <div>
            <button className="iphonefilter" onClick={toggleHidden}>
              ძებნა
            </button>
          </div>
          <div className={`Frame33741 ${isDivHidden ? "hidden" : ""}`}>
            <div className="closeMenuButton" onClick={toggleHidden}>
              X
            </div>

            <CarTypeComp></CarTypeComp>

            <SellType />
            <Manufacturer></Manufacturer>
            <ModelInp></ModelInp>
            <Category></Category>
            <PriceFilter></PriceFilter>

            <FilterButton
              wholeProducts={wholeProducts}
              hideMenu={toggleHidden}
            />
          </div>
          {/* <div className={`Frame33741 ${isDivHidden ? "hidden" : ""}`}>
            <SellType />
            <Manufacturer></Manufacturer>
            <Category></Category>
            <PriceFilter></PriceFilter>{" "}
          </div> */}

          {/* <div className="Frame33741">
            <SellType />
            <Manufacturer></Manufacturer>
            <Category></Category>
            <PriceFilter></PriceFilter>
          </div> */}

          {productsToDisplay.map((product) => {
            return (
              <>
                <div className="row">
                  <ProductComponent product={product} />
                </div>
              </>
            );
          })}

          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePageClick={handlePageClick}
          />
        </CarTypeContext.Provider>
      </div>
    );
  }
};

export default App;
