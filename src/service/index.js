const backendDomain = "http://localhost:8080/api"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/signup`,
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    },
    signIn : {
        url : `${backendDomain}/signin`,
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    },
    current_user : {
        url : `${backendDomain}/user-details`,
        method : "get",
        // headers : {
        //     "Content-Type" : "application/json",
        //     "Accept" : "application/json"
        // }
    }

}

export default SummaryApi;