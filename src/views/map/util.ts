export async function watchLocation(){
  navigator.geolocation.watchPosition(console.log)
}
