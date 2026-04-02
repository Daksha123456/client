import axios from "axios";


const API=axios.create({
    baseURL:"http://localhost:5000/api",
   });

//attach token automatically
API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token");
    console.log ("API Interceptor - Token:", token); // Debug log to check token retrieval
    if(token){
        req.headers.Authorization=`Bearer ${token}`;
    }
    return req;
});

export default API;