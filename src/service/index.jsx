const backendDomain = "http://localhost:8080/api"
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
        // headers : {
        //     "Content-Type" : "application/json",
        //     "Accept" : "application/json"
        // }
    },
    logout_user : {
        url : `${backendDomain}/userLogout`,
        method : "GET",
        headers : header
    },
    allUser : {
        url : `${backendDomain}/allUsers`,
        method : "GET",
        // headers : {
        //     "Content-Type" : "application/json",
        //     "Accept" : "application/json"
        // }
    },
    updateUser : {
        url : `${backendDomain}/update-user`,
        method : "POST",
        header : header
    }

}

export default SummaryApi;