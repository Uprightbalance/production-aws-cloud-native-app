import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawBaseUrl) {
  // Fail fast for misconfiguration in development.
  // eslint-disable-next-line no-console
  console.error("VITE_API_BASE_URL is not defined. Please set it in your .env file.");
}

const normalizedBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/+$/, "") : "";

// Client for /api/v1 endpoints
const apiClient = axios.create({
  baseURL: `${normalizedBaseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Client for root-level endpoints (e.g., GET /)
const rootClient = axios.create({
  baseURL: normalizedBaseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

function handleApiResponse(response) {
  const { meta, data } = response.data || {};
  if (!meta || typeof meta.success === "undefined") {
    throw new Error("Unexpected API response format.");
  }
  if (!meta.success) {
    throw new Error(meta.message || "Request failed.");
  }
  return { meta, data };
}

export async function fetchCompanyInfo() {
  const response = await rootClient.get("/");
  return handleApiResponse(response);
}

export async function fetchServices() {
  const response = await apiClient.get("/services");
  return handleApiResponse(response);
}

export async function fetchAreas() {
  const response = await apiClient.get("/areas");
  return handleApiResponse(response);
}

export async function submitContact(formData) {
  const response = await apiClient.post("/contact", formData);
  return handleApiResponse(response);
}

export async function submitPickupRequest(formData) {
  const response = await apiClient.post("/pickup-request", formData);
  return handleApiResponse(response);
}
