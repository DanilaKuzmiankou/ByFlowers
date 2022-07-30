import { postRequest } from '../index.network';
import { getRequest } from '../index.network';
// import { generateRandomString } from '../../utils/Utils';
// import firebase from '../../utils/Firebase';
//
//
//
// export async function uploadImagesToFirebaseCloud(images) {
//   const imagesUrl = [];
//   let file;
//   let fileRef;
//   let downloadUrl;
//   let uploadTaskSnapshot;
//   let fileName;
//   const storageRef = firebase.storage().ref();
//   for (let i = 0; i < images.length; i++) {
//     file = images[i];
//     if (file.preview) {
//       fileName = generateRandomString();
//       try {
//         fileRef = storageRef.child('reviews_images/' + fileName);
//         uploadTaskSnapshot = await fileRef.put(file);
//         downloadUrl = await uploadTaskSnapshot.ref.getDownloadURL();
//         imagesUrl[i] = downloadUrl;
//       } catch (error) {
//         console.log('ERR ===', error);
//       }
//     }
//   }
//   return imagesUrl;
// }
//
// export async function deleteImagesFromFirebaseCloud(pictures) {
//   if (pictures && pictures.length) {
//     const storage = firebase.storage();
//     for (let i = 0; i < pictures?.length; i++) {
//       try {
//         const url = pictures[i].imageLink;
//         const imageRef = storage.refFromURL(url);
//         await imageRef.delete();
//         await deleteImageFromDatabase(url);
//       } catch (error) {
//         console.log('ERR ===', error);
//       }
//     }
//   }
// }
//
// export async function addImagesToDatabase(picturesUrl, reviewId) {
//   picturesUrl?.forEach((pictureUrl) => addImageToDatabase(pictureUrl, reviewId));
// }
//
// async function deleteImageFromDatabase(url) {
//   const body = JSON.stringify({ url });
//   return await postRequest('/api/review/deleteImage', body);
// }
//
// async function addImageToDatabase(url, reviewId) {
//   const body = JSON.stringify({ url, reviewId });
//   return await postRequest('/api/review/addImage', body);
// }

export async function getProducts(types:string[], minPrice:number, maxPrice:number, limit:number, offset:number) {
    const typesStr = types.join(',')
    console.log('li', limit)
    return await getRequest(
        `/api/product/getProducts`+
        `?types=${encodeURIComponent(typesStr)}` +
        `&minPrice=${encodeURIComponent(minPrice)}` +
        `&maxPrice=${encodeURIComponent(maxPrice)}` +
        `&limit=${encodeURIComponent(limit)}` +
        `&offset=${encodeURIComponent(offset)}`);
}
