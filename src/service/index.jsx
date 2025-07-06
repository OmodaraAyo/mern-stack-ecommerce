const backendDomain = `${import.meta.env.VITE_BASE_URL}/api`
const header = {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
}

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/signup`,
        method : "POST",
        headers : header
    },
    signIn : {
        url : `${backendDomain}/signin`,
        method : "POST",
        headers : header
    },
    current_user : {
        url : `${backendDomain}/user-details`,
        method : "GET",
        headers : header
    },
    logout_user : {
        url : `${backendDomain}/userLogout`,
        method : "GET",
        headers : header
    },
    allUser : {
        url : `${backendDomain}/allUsers`,
        method : "GET",
        headers : header
    },
    updateUser : {
        url : `${backendDomain}/update-user`,
        method : "POST",
        headers : header
    },
    uploadProduct : {
        url : `${backendDomain}/upload-product`,
        method : "POST",
        headers : header 
    },
    getAllProduct : {
        url : `${backendDomain}/all-products`,
        method : "GET",
        headers : header
    },
    updateProduct : {
        url : `${backendDomain}/update-product`,
        method : "POST",
        headers : header
    },
    getProductCategories : {
        url : `${backendDomain}/get-product-category`,
        method : "GET",
        headers : header
    },
    getAllProductCategories : {
        url : `${backendDomain}/get-all-product-category`,
        method : "POST",
        headers : header
    },
    getProductDetails : {
        url : `${backendDomain}/get-product-details`,
        method : "POST",
        headers :  header
    },
    addProductToCart  : {
        url : `${backendDomain}/addToCart`,
        method : "POST",
        headers : header
    },
    countNumberOfProductInCart : {
        url : `${backendDomain}/countNumberOfProductInCart`,
        method : "GET",
        headers : header
    },
    viewCartProduct : {
        url : `${backendDomain}/view-cart-products`,
        method : "GET",
        headers : header
    },
    updateCartProduct : {
        url : `${backendDomain}/update-cart-product`,
        method : "POST",
        headers : header
    },
    deleteCartProduct : {
        url : `${backendDomain}/delete-cart-product`,
        method : "POST",
        headers : header
    },
    searchProduct : {
        url : `${backendDomain}/search`,
        method : "GET",
        headers : header
    },
    filterProduct : {
        url : `${backendDomain}/filter-product`,
        method : "POST",
        headers : header
    }

}

export default SummaryApi;