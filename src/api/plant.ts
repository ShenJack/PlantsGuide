import {httpClient} from "./http";
import {config} from "rxjs";

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

export function apiGetCertainPlant(plantId) {
  return httpClient.get(`/plant-card/` + plantId, {
    params:{
      id: plantId,
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

export function apiSearchPlants(params) {
  return httpClient.get(`/plant/search`, {
    params: params
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

export function apiLikePlantInstance(plantId: string) {
  return httpClient.post(`/plantInstance/${plantId}/like`)
}

export function apiCancelLikePlantInstance(plantId: string) {
  return httpClient.post(`/plantInstance/${plantId}/like/cancel`)
}

export function apiWaterPlantInstance(instanceId: string) {
  return httpClient.post(`/plantInstance/${instanceId}/water`)
}

export function apiCommentPlantInstance(instanceId: string, content: string) {
  return httpClient.post(`/comment/create`,{
    instanceId,
    content,
  })
}

export function apiGetPlantInstanceComments(instanceId: string) {
  return httpClient.post(`/comment/list`, {
    instanceId
  })
}

export function apiGetAdjacentPlantInstances(lat, lng) {
  return httpClient.post(`/plantInstance/adjacent`, {
    lat, lng
  })
}
