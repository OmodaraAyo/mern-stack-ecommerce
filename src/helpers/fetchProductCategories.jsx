import SummaryApi from "../service";

const fetchProductCategories = async (category) => {

    const response = await fetch(SummaryApi.getAllProductCategories.url,{
        method: SummaryApi.getAllProductCategories.method,
        headers: SummaryApi.getAllProductCategories.headers,
        body: JSON.stringify({ category: category }),
    })

    const dataResponse =  await response.json();

    return dataResponse;
}

export default fetchProductCategories;