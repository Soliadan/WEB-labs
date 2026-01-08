
import { apiClient } from "./client";


export async function getPerfumes(filters = {}) {
  const params = {};


  if (filters.search) params.q = filters.search;


  if (filters.brand && filters.brand !== "all") {
    params.brand = filters.brand;
  }

  
  if (filters.minPrice) params.price_gte = filters.minPrice;
  if (filters.maxPrice) params.price_lte = filters.maxPrice;

  const response = await apiClient.get("/perfumes", { params });
  return response.data;
}

export async function addPerfume(perfume) {
  const response = await apiClient.post("/perfumes", perfume);
  return response.data;
}

export async function updatePerfume(id, updates) {
  const response = await apiClient.patch(`/perfumes/${id}`, updates);
  return response.data;
}

export async function deletePerfume(id) {
  return apiClient.delete(`/perfumes/${id}`);
}
