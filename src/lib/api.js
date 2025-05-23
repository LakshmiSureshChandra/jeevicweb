import axios from "axios";

const BASE_URL = "http://localhost:4545";
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

const handleAuthFailure = () => {
  localStorage.removeItem("access_token");
  window.location.href = "/sign-in";
};

// Address APIs
export const addAddress = async (address) => {
  try {
    const response = await api.post("/address", address);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateAddress = async (addressId, address) => {
  try {
    const response = await api.patch(`/address/${addressId}`, address);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await api.delete(`/address/${addressId}`);
  } catch (error) {
    handleError(error);
  }
};

export const getAddresses = async () => {
  try {
    const response = await api.get("/address");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/product/c/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getProductsBySubCategory = async (subCategoryId) => {
  try {
    const response = await api.get(`/product/s/${subCategoryId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/i/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await api.get(`/review/p/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getAverageRatingByProductId = async (productId) => {
  try {
    const response = await api.get(`/review/avg/p/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

// Category APIs
export const getAllCategories = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getCategoryById = async (category_id) => {
  try {
    const response = await api.get(`/category/${category_id}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getAllSubCategories = async () => {
  try {
    const response = await api.get("/subcategory");
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getSubcategoriesByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/subcategory/c/${categoryId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

export const getSubcategoriesById = async (subCategoryId) => {
  try {
    const response = await api.get(`/subcategory/${subCategoryId}`);
    return response.data;
  } catch (error) {
    handleError(error, false); // Don't force auth
  }
};

// Wishlist APIs
export const addToWishlist = async (productId) => {
  try {
    const response = await api.post("/wishlist", { product_id: productId });
    console.log("Request sent to /wishlist"); // Log to confirm request is sent
    return response.data;
  } catch (error) {
    console.error("Failed to add to wishlist:", error); // Log error details
    handleError(error);
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await api.delete("/wishlist", {
      data: { product_id: productId },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Cart APIs
export const addToCart = async (data) => {
  try {
    const response = await api.post("/cart", data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle unauthorized without redirect
      return { error: "unauthorized", items: [] };
    }
    throw error;
  }
};

export const updateCart = async (data) => {
  try {
    const response = await api.patch("/cart", data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { error: "unauthorized", items: [] };
    }
    throw error;
  }
};

export const removeFromCart = async (data) => {
  try {
    const response = await api.delete("/cart", { data });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { error: "unauthorized", items: [] };
    }
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { items: [] }; // Return empty cart for unauthorized users
    }
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete("/cart/clear");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { error: "unauthorized", items: [] };
    }
    throw error;
  }
};

const handleError = (error, forceAuth = true) => {
  console.error("API Error:", error);
  if (error.response && error.response.status === 401 && forceAuth) {
    handleAuthFailure();
  }
  throw error;
};

// Add this new function
export const getCategoriesWithSubcategories = async () => {
  try {
    const categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      return [];
    }

    const transformedData = await Promise.all(
      categories.map(async (category) => {
        const subcategoriesResponse = await getSubcategoriesByCategory(
          category.id,
        );

        const items = { Female: [], Male: [], Kids: [] };

        subcategoriesResponse.forEach((subcategory) => {
          if (
            subcategory &&
            subcategory.meta_data &&
            subcategory.meta_data.gender
          ) {
            const gender = subcategory.meta_data.gender.toLowerCase();
            if (gender === "female" || gender === "male" || gender === "kids") {
              items[gender.charAt(0).toUpperCase() + gender.slice(1)].push(
                subcategory.name,
              );
            }
          }
        });

        const cleanedItems = Object.fromEntries(
          Object.entries(items).filter(([_, value]) => value.length > 0),
        );

        return {
          id: category.id,
          name: category.name,
          image:
            category.image_url && category.image_url.length > 0
              ? category.image_url[0]
              : "https://via.placeholder.com/150",
          items: cleanedItems,
        };
      }),
    );

    return transformedData;
  } catch (error) {
    handleError(error, false);
  }
};

// Add this new function
export const getProductsByIds = async (productIds) => {
  try {
    if (!Array.isArray(productIds)) {
      throw new Error("productIds must be an array");
    }
    const response = await api.get("/product/fetch", {
      params: { product_ids: productIds.join(",") },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Add these new authentication APIs
export const loginRequest = async (countryCode, phoneNumber) => {
  try {
    const response = await api.post("/auth/login-request", {
      country_code: countryCode,
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyAccountAccess = async (countryCode, phoneNumber, otp) => {
  try {
    const response = await api.post("/auth/verify-account-access", {
      country_code: countryCode,
      phone_number: phoneNumber,
      otp,
    });
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchUserProfile = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      throw new Error(
        "Authentication access_token missing. Please login again.",
      );
    }
    const response = await api.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.put("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.url;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserProfile = async (formData) => {
  try {
    const access_token = localStorage.getItem("access_token");
    let profileData = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
    };

    // If there's a profile picture, upload it first
    const profilePicture = formData.get("profile_picture");
    if (profilePicture) {
      const imageUrl = await uploadProfilePicture(profilePicture);
      profileData.profile_picture = imageUrl;
    }

    // Update user profile with all data including image URL if present
    const response = await api.patch("/auth/user", profileData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserEmail = async (email) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await api.post(
      "/auth/user/email",
      { email },
      { headers: { Authorization: `Bearer ${access_token}` } },
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyEmailOtp = async (otp) => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await api.post(
      "/auth/user/verify-email",
      { otp },
      { headers: { Authorization: `Bearer ${access_token}` } },
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getNewItems = async () => {
  try {
    const response = await api.get("/product/newitems");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getJustForYou = async () => {
  try {
    const response = await api.get("/product/justforyou");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getMainBanner = async () => {
  try {
    const response = await api.get("/banner/mainbanner");
    return response.data[0];
  } catch (error) {
    handleError(error);
  }
};
export default api;
