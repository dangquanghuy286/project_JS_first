export let params = {
    q: "",
    sort: "",
    order: "",
    start: 0,  // Bắt đầu từ sản phẩm số 0
    limit: 10  // Số sản phẩm mỗi trang
};
export const inputSearch = document.querySelector("#search input");
export const buttonSearch = document.querySelector("#search button");
export const filter = document.querySelector("#filter");
export const pagiPev = document.querySelector("#Pa_Prev");
export const pagiNumber = document.querySelector("#Pa_Number");
export const pagiNext = document.querySelector("#Pa_Next");
export const products = document.querySelector("#products");