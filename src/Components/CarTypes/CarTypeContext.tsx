import React from "react";
import { CarTypeInterface } from "../Interfaces/CarTypeInterface";
import { createContext } from "react";
import { ManufacturerInterface } from "../Interfaces/ManufacturerInterface";
import { modelInterface } from "../Interfaces/ModelInterface";
import { ProductInterface } from "../Interfaces/ProductInterface";

interface CategoryInterface {
  sellType:string,
  setSellType:(newSelltype:string)=>void,

  categories: CarTypeInterface[];
  setCategories: (newCategories: CarTypeInterface[]) => void;

  chosenCategories: string[];
  setChosenCategories: (newchosenCat: string[]) => void;

  cartegory: number;
  setCartegory: (newCat: number) => void;

  manArr: ManufacturerInterface[];
  setManArr: (newArr: ManufacturerInterface[]) => void;

  currentMan: string[];
  setCurrentMan: (newVal: string[]) => void;

  modelArr: modelInterface[];
  setModelArr: (newVal: modelInterface[]) => void;

  chosenModel: string[];
  setChosen: (newVal: string[]) => void;

  PriceRange: [number, number];
  setPriceRange: (newValue: [number, number]) => void;

  products: ProductInterface[];
  setProducts: (newVal: ProductInterface[]) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;

  visibleProd:ProductInterface[];
  setVisible:(newProd:ProductInterface[])=>void

  filterMethod:string
  setFilterMethod:(val:string)=>void

  sortMethod:string
  setSortMethod:(val:string)=>void
}

const CarTypeContext = createContext<CategoryInterface>({
  sellType:"",
  setSellType:()=>{},

  categories: [],
  setCategories: () => {},
  cartegory: 0,
  setCartegory: () => {},

  manArr: [],
  setManArr: () => {},
  currentMan: [],
  setCurrentMan: () => {},

  modelArr: [],
  setModelArr: () => {},
  chosenModel: [],
  setChosen: () => {},

  chosenCategories: [],
  setChosenCategories: () => {},

  PriceRange: [0, 0],
  setPriceRange: () => {},

  products: [],
  setProducts: () => {},

  currentPage: 1,
  setCurrentPage: () => {},

  visibleProd:[],
  setVisible:()=>{},

  filterMethod:"",
  setFilterMethod:()=>{},

  sortMethod:"option1",
  setSortMethod:()=>{}
  
});

export default CarTypeContext;
