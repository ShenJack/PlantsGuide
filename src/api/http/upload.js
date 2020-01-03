import {httpClient} from "./index";

export function uploadImage(formData, onUploadProgress) {
  return httpClient.request({
    url: "/upload/image",
    method: "POST",
    data: formData,
    onUploadProgress:onUploadProgress
  });
}
