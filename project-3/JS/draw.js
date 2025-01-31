import { API_PRODUCT } from "./constant.js";
import { fetchAPI } from "./lopdungchung.js";
import { params } from "./valiable.js";

const products = document.querySelector("#products");

export const drawProduct = () => {
    console.log(params);
    const api = `${API_PRODUCT}?q=${params.q}`;

    // Display loading spinner
    products.innerHTML = '<div class="spinner">Loading...</div>';

    fetchAPI(api)
        .then(data => {
            const htmls = data.map(item => {
                const {
                    thumbnail = "default-thumbnail.jpg", // Default image
                    title,
                    category,
                    description,
                    price,
                    tags,
                    reviews
                } = item;

                return `
                    <div class="products__item">
                        <img class="product-thumbnail" src="${thumbnail}" alt="${title}">
                        <div class="product-details">
                            <div class="product-title">${title}</div>
                            <div class="product-category">Category: ${category}</div>
                            <div class="product-description">${description}</div>
                            <div class="product-price">$${price}</div>
                            <div class="product-tags">
                                Tags: ${tags.map(tag => `<span>${tag}</span>`).join(" ")}
                            </div>
                        </div>
                        <div class="review-container">
                            ${reviews.map(({ reviewerName, comment, date }) => `
                                <div class="review">
                                    <div class="reviewer-name">${reviewerName}</div>
                                    <div class="review-comment">${comment}</div>
                                    <div class="review-date">${new Date(date).toLocaleDateString()}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `;
            });

            products.innerHTML = htmls.join("");
        })
        .catch(error => {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            products.innerHTML = '<div class="error-message">Failed to load products. Please try again later.</div>';
        });
};



