import { drawProduct } from "./draw.js";
import { buttonSearch, filter, inputSearch, pagiNext, pagiNumber, pagiPev, params } from "./valiable.js";

drawProduct();
// SEARCH
// Sự kiện khi nhấn nút tìm kiếm
buttonSearch.addEventListener("click", function () {
    params.q = inputSearch.value.trim();
    drawProduct(); // Gọi lại hàm để cập nhật danh sách sản phẩm
});

// Xử lý sự kiện nhấn phím "Enter" trong ô tìm kiếm
inputSearch.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        params.q = inputSearch.value.trim();
        drawProduct(); // Gọi lại hàm để cập nhật danh sách sản phẩm
    }
});
// FILLTER
filter.addEventListener("change", function (event) {
    console.log(event.target.value);
    switch (event.target.value) {
        case "mac-dinh":
            params.sort = "";
            params.order = "";
            break;
        case "thap-den-cao":
            params.sort = "price";
            params.order = "asc";
            break;
        case "cao-den-thap":
            params.sort = "price";
            params.order = "desc";
            break;
        case "giam-manh":
            params.sort = "discountPercentage";
            params.order = "desc";
            break;

        default:
            break;
    }
    drawProduct();
})

pagiNext.addEventListener("click", function () {
    params.start += params.limit;
    pagiNumber.textContent = ` ${Math.floor(params.start / params.limit) + 1}`; // Cập nhật số trang
    drawProduct();

});

pagiPev.addEventListener("click", function () {
    if (params.start >= params.limit) {
        params.start -= params.limit;
    }
    pagiNumber.textContent = `${Math.floor(params.start / params.limit) + 1}`; // Cập nhật số trang
    drawProduct();
});

