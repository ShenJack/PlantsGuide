import {httpClient} from "./http";

export function apiUploadImage(data: FormData, onProgress?: (progressEvent: any) => void) {
  return httpClient.request({
    url: "/upload/image",
    method: "POST",
    data: data,
    onUploadProgress: onProgress
  });
}
