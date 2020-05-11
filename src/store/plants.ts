import {
  apiCancelLike,
  apiGetAllPlantInstance,
  apiGetCertainPlantsInstance,
  apiGetPlants,
  apiLikePlant, apiSearchPlants
} from "../api/plant";
import {getDispatch} from "./dispatches";
import {stateMap, STORES} from "./const";

let initialState = {
  likedPlantIds: loadPlantIds(),
  plantInstances: [],
  plants: [],
  skip: 0,
  limit: 1000,
  total: -1,

  currentPlantDetail: undefined,
  currentPlantInstance: undefined,
};

function loadPlantIds() {
  let result = localStorage.getItem("LIKED_PLANTS");
  if (result != null) {
    return JSON.parse(result)
  } else {
    return []
  }
}

function loadPlantInstances() {
  apiGetAllPlantInstance().then(res => {
    getDispatch(STORES.PLANT_STORE)({
      plantInstances: res.data.plantInstances
    })
  })
}

function loadPlantInstancesByPlantId(plantId) {
  apiGetCertainPlantsInstance(plantId).then(res => {
    getDispatch(STORES.PLANT_STORE)({
      plantInstances: res.data.plantInstances
    })
  })
}

function persistPlantIds(data) {
  localStorage.setItem("LIKED_PLANTS", JSON.stringify(data))
}

export function getPlantIds() {
  return getState(STORES.PLANT_STORE).likedPlantIds;
}

export function addLike(id) {
  apiLikePlant(id).then(res => {
    const data = getState(STORES.PLANT_STORE).likedPlantIds.concat(id);
    getDispatch(STORES.PLANT_STORE)({
      likedPlantIds: data
    });
    fetchPlants();
    persistPlantIds(data);
  })
}

export function removeLike(id) {
  apiCancelLike(id).then(res => {
    const data = getState(STORES.PLANT_STORE).likedPlantIds.filter(item => item !== id);
    getDispatch(STORES.PLANT_STORE)({
      likedPlantIds: data
    });
    fetchPlants();
    persistPlantIds(data);
  })
}

export function fetchPlants(params = {}) {
  return new Promise((resolve) => {
    apiSearchPlants(params).then(res => {
      resolve()
      getDispatch(STORES.PLANT_STORE)({
        plants: res.data.plants
      })
    })
  })
}

export function toggleLike(_id: string) {
  if (isPlantLiked(_id)) {
    removeLike(_id)
  } else {
    addLike(_id)
  }
}

export function getState(store) {
  return stateMap.get(store);
}

export function isPlantLiked(id) {
  return getState(STORES.PLANT_STORE).likedPlantIds.indexOf(id) >= 0
}

export const PlantStore = {
  initialize: (stateMap, reducerMap) => {
    stateMap.set(STORES.PLANT_STORE, initialState);
    loadPlantInstances();
  },
  loadPlantInstancesByPlantId,
  loadNextPage,
  loadPlantInstances,
};

function loadNextPage() {
  let tempSkip = getState(STORES.PLANT_STORE).skip + getState(STORES.PLANT_STORE).limit;
  apiGetPlants(tempSkip, getState(STORES.PLANT_STORE).limit).then(res => {
    getDispatch(STORES.PLANT_STORE)({
      plants: getState(STORES.PLANT_STORE).plants.concat(res.data.plants),
      skip: tempSkip
    })
  })
}
