import {httpClient} from "./http";

export function apiCreatePlant(data) {
  return httpClient.post('/plant/create', data)
}

export function apiUpdatePlant(id, data) {
  return httpClient.put(`/plant/${id}`, data)
}

export function apiDeletePlant(id) {
  return httpClient.delete(`/plant/${id}`)
}

export function apiGetPlants() {
  return httpClient.get(`/plant/list`)
}
