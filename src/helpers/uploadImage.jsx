const url = `${import.meta.env.VITE_CLOUDINARY_URL}/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ecommerce_mern_products");

    const dataResponse = await fetch(url, {
        method: "POST",
        body : formData
    })

    return dataResponse.json();

}

export default uploadImage;