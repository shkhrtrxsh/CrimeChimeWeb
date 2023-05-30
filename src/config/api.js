import axios from "axios";
// const devEnv = process.env.NODE_ENV !== "production";

// const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//   baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });
// const API = axios.create({ baseURL: `http://127.0.0.1:8000/api` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("_token")) {
        req.headers.Authorization = `Bearer ${
      localStorage.getItem("_token")
    }`;
    }
    return req;
});


// export const signIn = (formData) => API.post("/users/signin", formData);
// export const signUp = (formData) => API.post("/users/signup", formData);

// export const createTour = (tourData) => API.post("/tour", tourData);

// export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
// export const updateTour = (updatedTourData, id) =>
//   API.patch(`/tour/${id}`, updatedTourData);
// export const deleteTour = (id) => API.delete(`/tour/${id}`);
export default API