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
        method : "GET",
        // headers : {
        //     "Content-Type" : "application/json",
        //     "Accept" : "application/json"
        // }
    },
    logout_user : {
        url : `${backendDomain}/userLogout`,
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }

}

export default SummaryApi;