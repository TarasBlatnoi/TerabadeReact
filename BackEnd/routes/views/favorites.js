"use strict"
import { UI, Storage, Products } from "../scripts/main.js"
const products = document.getElementById("favorite-products")
if (products) {
  document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI()
    const products = new Products()
    //setup app
    ui.setupAPP()
    //get all products
    products
      .getProducts("/favorites/products")
      .then((products) => {
        ui.displayProducts(products)
        Storage.saveFavoriteProducts(products)
      })
      .then(() => {
        ui.getBagButtons()
        ui.cartLogic()
      })
  })
}
