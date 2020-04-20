import {httpClient} from "./http";

export function apiCreatePlant(data) {
  return httpClient.post('/plant/create', data)
}

export function apiUpdatePlant(id, data) {
  return httpClient.put(`/plant/${id}`, data)
}

export function apiCreatePlantInstance(data) {
  return httpClient.post('/plantInstance/create', data)
}

export function apiUpdatePlantInstance(id, data) {
  return httpClient.put(`/plantInstance/${id}`, data)
}

export function apiDeletePlant(id) {
  return httpClient.delete(`/plant/${id}`)
}

export function apiGetPlants(skip: number = 0, limit: number = 5) {
  return httpClient.get(`/plant/list`, {
    params: {
      skip,
      limit,
    }
  })
}

export function apiGetAllPlants() {
  return httpClient.get(`/plant/list`, {
    params: {
      skip: 0,
      limit: 10000,
    }
  })
}

export function apiGetAllPlantInstance() {
  return httpClient.get(`/plantInstance/list`, {
    params: {
      skip: 0,
      limit: 10000,
    }
  })
}

export function apiGetCertainPlantsInstance(plantId) {
  return httpClient.get(`/plantInstance/list/` + plantId, {
    params: {
      skip: 0,
      limit: 10000,
    }
  })
}

export function apiLikePlant(plantId: string) {
  return httpClient.post(`/plant/${plantId}/like`)
}

export function apiCancelLike(plantId: string) {
  return httpClient.post(`/plant/${plantId}/like/cancel`)
}

