import { getAllCategories, getAllSubCategories } from "../lib/api";

export const fetchCategoriesData = async () => {
  try {
    const categories = await getAllCategories();
    const subcategories = await getAllSubCategories();

    return categories.map((category) => {
      const matchedSubcategories = subcategories.filter(
        (sub) => sub.category_id === category.id,
      );

      return {
        title: category.name,
        catid: category.id,
        items: matchedSubcategories.map((sub) => ({
          category: sub.name,
          link: `products/${category.id}/${sub.id}`,
          image: sub.image_url[0],
        })),
        class: "",
      };
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};
