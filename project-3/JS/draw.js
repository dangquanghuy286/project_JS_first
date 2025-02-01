import { API_PRODUCT } from "./constant.js"; // Nhập khẩu API_PRODUCT từ tệp constant.js
import { fetchAPI } from "./lopdungchung.js"; // Nhập khẩu hàm fetchAPI từ tệp lopdungchung.js
import { params } from "./valiable.js"; // Nhập khẩu params từ tệp valiable.js

const products = document.querySelector("#products"); // Lấy phần tử có id là "products"

export const drawProduct = () => {
    console.log("Fetching with params:", params); // In ra thông tin params đang được sử dụng

    // Tạo URL API dựa trên params
    const api = `${API_PRODUCT}?q=${encodeURIComponent(params.q)}&_sort=${params.sort}&_order=${params.order}&_start=${params.start}&_limit=${params.limit}`;



    // Hiển thị spinner khi đang tải dữ liệu
    products.innerHTML = '<div class="spinner">Loading...</div>';

    // Gọi hàm fetchAPI để lấy dữ liệu từ API
    fetchAPI(api)
        .then(data => {
            // Kiểm tra nếu dữ liệu trả về không phải là một mảng
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format from API");
            }

            // Lấy danh sách sản phẩm và vẽ HTML
            const htmls = data.map(item => {
                // Destructuring các thuộc tính của mỗi sản phẩm
                const {
                    thumbnail = "default-thumbnail.jpg", // Hình ảnh thu nhỏ mặc định
                    title = "No Title", // Tiêu đề mặc định
                    category = "Unknown Category", // Danh mục mặc định
                    description = "No description available", // Mô tả mặc định
                    price = "N/A", // Giá mặc định
                    tags = [], // Thẻ mặc định
                    reviews = [] // Đánh giá mặc định
                } = item;

                // Trả về HTML cho mỗi sản phẩm
                return `
                    <div class="products__item">
                        <img class="product-thumbnail" src="${thumbnail}" alt="${title}">
                        <div class="product-details">
                            <div class="product-title">${title}</div>
                            <div class="product-category">Category: ${category}</div>
                            <div class="product-description">${description}</div>
                            <div class="product-price">$${price}</div>
                            <div class="product-tags">
                                Tags: ${tags.length ? tags.map(tag => `<span>${tag}</span>`).join(" ") : "No tags"}
                            </div>
                        </div>
                        <div class="review-container">
                            ${reviews.length ? reviews.map(({ reviewerName = "Anonymous", comment = "No comment", date = new Date() }) => `
                                <div class="review">
                                    <div class="reviewer-name">${reviewerName}</div>
                                    <div class="review-comment">${comment}</div>
                                    <div class="review-date">${new Date(date).toLocaleDateString()}</div>
                                </div>
                            `).join("") : "<div class='no-reviews'>No reviews yet</div>"}
                        </div>
                    </div>
                `;
            }).join("");

            // Hiển thị danh sách sản phẩm hoặc thông báo không có sản phẩm
            products.innerHTML = htmls || '<div class="no-products">No products found.</div>';
        })
        .catch(error => {
            // Xử lý lỗi khi lấy dữ liệu
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            products.innerHTML = '<div class="error-message">Failed to load products. Please try again later.</div>';
        });
};
