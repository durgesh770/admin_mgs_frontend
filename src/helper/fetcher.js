import axios from "axios";
// Setting up base Url for fetching data

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAuthToken = () => {
    if (typeof window !== "undefined") {
        const tokenData = JSON?.parse(localStorage.getItem("token"));
        if (tokenData?.token) {
            try {
                const token = tokenData.token
                return `Bearer ${token}`;
            } catch (error) {
                console.error("Error parsing token data:", error);
            }
        }
    }
    return null;
};

const fetcher = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
        Accept: "application/json",
    },
});
export default fetcher;