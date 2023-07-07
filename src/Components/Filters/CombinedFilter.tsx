import React, { useEffect, useState } from "react";
import FiltersInterface from "../Interfaces/FiltersInterface";
import { ManufacturerInterface } from "../Interfaces/ManufacturerInterface";
import { ProductInterface } from "../Interfaces/ProductInterface";
import { CarTypeInterface } from "../Interfaces/CarTypeInterface";
import { modelInterface } from "../Interfaces/ModelInterface";

const CombinedFilter = (
  Products: ProductInterface[],
  DealType:string,
  AllManufacturers: ManufacturerInterface[],
  AllModels: modelInterface[],
  Manufacturer: string[],
  Model: string[],
  Category: string[],
  Cartegory: number,
  PriceRange: [number, number],
  allCategories: CarTypeInterface[]
): ProductInterface[] => {
  


  const findManId = (id: string): string => {
    let res: string = "";
    AllManufacturers.forEach((e) => {
      if (e.man_id == id) res = e.man_name;
    });

    return res;
  };
  const findModId = (id: number): string => {
    let res: string = "";
    AllModels.forEach((e) => {
      if (e.model_id == id) res = e.model_name;
    });
    return res;
  };


  const findCatId = (id: number): string => {
    let res: string = "";
    allCategories.forEach((e) => {
      if (e.category_id == id) {res = e.seo_title};
    });

    return res;
  };

  
  

  const filterProducts = (products: ProductInterface[]): ProductInterface[] => {
    return products.filter((product) => {
      if (product.vehicle_type != Cartegory) {
        return false;
      }

      if (
        Manufacturer.length > 0 &&
        !Manufacturer.includes(findManId(String(product.man_id)))
      ) {
        return false;
      }

      
        if(DealType === "ქირავდება" && product.for_rent != true){
          return false;
        }
        if(DealType === "იყიდება" && product.for_rent != false){
          return false;
        }
      

      if (Model.length > 0 && !Model.includes(findModId(product.model_id))) {
        return false;
      }

      // Filter by category name
      if (
        Category.length > 0 &&
        !Category.includes(findCatId(product.category_id))
      ) {
        return false;
      }

      // Filter by price range
      if (
        PriceRange &&
        (product.price_value < PriceRange[0] || product.price_value > PriceRange[1])
      ) {
        return false;
      }



      // All filters pass, include the product
      return true;
    });
  };

  // Call the filterProducts function with the Products array
  const filteredProducts = filterProducts(Products);

  return filteredProducts;
};

export default CombinedFilter;
