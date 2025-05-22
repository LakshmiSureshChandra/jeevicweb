import { getAllCategories, getAllSubCategories } from "../lib/api";

// Fetch and structure categories and subcategories data
const fetchData = async () => {
  try {
    const categories = await getAllCategories();
    const subcategories = await getAllSubCategories();

    // Map categories into desired format
    const structuredData = categories.map(category => {
      const matchedSubcategories = subcategories.filter(
        sub => sub.category_id === category.id
      );
        
      return {
        title: category.name,
        items: matchedSubcategories.map(sub => ({
          category: sub.name,
          link:  `products/${category.id}/${sub.id}`,   // make sure your subcategory object has 'link'
          image: sub.image_url[0], // and 'image' properties
        })),
        class: "", // default class value — adjust as needed
      };
    });

    return structuredData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

// Execute fetch immediately and export the result
export const categoriesData = await fetchData();

export default categoriesData;
