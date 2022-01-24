import {fetchProducts, fetchProductsTitles} from "../actions/product_action";

export const initialBoot = ({query, titles}) => {
    // runs the initial fetches to initalize the program
    if (!("{\"taxonomy_paths\":[\"Art & Collectibles\"]}" in query))
        fetchProducts({taxonomy_paths: ["Art & Collectibles"]});
    if (!("{\"taxonomy_paths\":[\"Craft Supplies & Tools\"]}" in query))
        fetchProducts({taxonomy_paths: ["Craft Supplies & Tools"]});
    if (!("{\"taxonomy_paths\":[\"Books, Movies & Music\"]}" in query))
        fetchProducts({taxonomy_paths: ["Books, Movies & Music"]});
    if (!("{\"taxonomy_paths\":[\"Home & Living\"]}" in query))
        fetchProducts({taxonomy_paths: ["Home & Living"]});
    if (!("{\"taxonomy_paths\":[\"Home Decor\"]}" in query))
        fetchProducts({taxonomy_paths: ["Home Decor"]});
    if (!("{\"taxonomy_paths\":[\"Jewelry\"]}" in query))
        fetchProducts({taxonomy_paths: ["Jewelry"]});
    if (!("{\"taxonomy_paths\":[\"Toys & Games\"]}" in query))
        fetchProducts({taxonomy_paths: ["Toys & Games"]});
    if (!("{\"taxonomy_paths\":[\"Kitchen & Dining\"]}" in query))
        fetchProducts({taxonomy_paths: ["Kitchen & Dining"]});
    if (!("{\"taxonomy_paths\":[\"Drink & Barware\"]}" in query))
        fetchProducts({taxonomy_paths: ["Drink & Barware"]});

    if (titles.data && !Object.entries(titles.data).length)
        fetchProductsTitles();
}
