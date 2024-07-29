const products=[{id:1,category:"sunglasses",img:"img/sg-1.jpg",title:"Sweet Sunglasses",desc:"Green sunshine of summer",price:1409},{id:2,category:"sunglasses",img:"img/sg-2.jpg",title:"Cute Sunglasses",desc:"Nude lovers",price:1412},{id:3,category:"sunglasses",img:"img/sg-3.jpg",title:"Cool Sunglasses",desc:"Ice brown thoughts",price:1908},{id:4,category:"sunglasses",img:"img/sg-4.jpg",title:"Classic Sunglasses",desc:"The black dream of the beach",price:1023},{id:5,category:"sunglasses",img:"img/sg-5.jpg",title:"Modern Sunglasses",desc:"Red and modern",price:1905},{id:6,category:"trousers",img:"img/trousers-1.jpg",title:"Sweet Trousers",desc:"Pink mood of the day",price:1409},{id:7,category:"trousers",img:"img/trousers-2.jpg",title:"Cute Trousers",desc:"Let black feelings go",price:1412},{id:8,category:"trousers",img:"img/trousers-3.jpg",title:"Cool Trousers",desc:"Feel the Classicism",price:1908},{id:9,category:"trousers",img:"img/trousers-4.jpg",title:"Classic Trousers",desc:"Dress up like Swedish for once",price:1023},{id:10,category:"trousers",img:"img/trousers-cover.jpg",title:"Modern Trousers",desc:"Favourites of the years",price:1905},{id:11,category:"necklace",img:"img/necklace-1.jpg",title:"Cool Necklace",desc:"Innocence of white",price:1409},{id:12,category:"necklace",img:"img/necklace-2.jpg",title:"Cute Necklace",desc:"Blue feelings",price:1412},{id:13,category:"necklace",img:"img/necklace-3.jpg",title:"Cool Necklace",desc:"Shine like a diamonds",price:1908},{id:14,category:"necklace",img:"img/necklace-4.jpg",title:"Classic Necklace",desc:"Customize your gift",price:1023},{id:15,category:"necklace",img:"img/necklace-cover.jpg",title:"Chic Necklace",desc:"Modern way of prettiness",price:1905}],productContainer=document.querySelector(".js-productContainer"),productCategoryContainer=document.querySelector(".js-productCategoryContainer");window.addEventListener("DOMContentLoaded",(()=>{showCategoryProducts(products),showCategoryButtons()}));const formatter=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0});function addToCartClick(t){t.addEventListener("click",(()=>{const e=t.parentElement;addToCartQuantityTransform(t,e),addProductToCart(e),updateCartLength(1),sweetAlert("Shopping cart updated successfully!")}))}let totalPrice=0;function addProductToCart(t){const e=document.querySelector(".js-cartEmpty");e&&e.remove();let r=t.dataset.id;const a=products.find((t=>r==t.id));document.querySelector(".js-cartProductContainer").innerHTML+=`<div class="cart__product js-cartProduct" data-id="${a.id}">\n    <div class="cart__product-top-wrapper">\n        <img src="${a.img}" alt="Product Image" class="cart__product__image">\n        <div class="cart__product__content">\n            <div class="cart__product__content__title">${a.title}</div>\n            <div class="cart__product__content__desc">${a.desc}</div>\n            <div class="product__quantity">\n                <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">\n                    <svg class="icon icon-minus">\n                        <use xlink:href="#icon-minus"></use>\n                    </svg>\n                </button>\n                <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="1">\n                <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">\n                        <use xlink:href="#icon-plus"></use>\n                    </svg></button>\n            </div>\n        </div>\n    </div>\n    <div class="cart__product__price js-cartProductPrice">${formatter.format(a.price)}</div>\n</div>`;document.querySelectorAll(".js-cartProduct").forEach((t=>{cartQuantityTransform(t)})),totalPrice+=a.price,updateTotalPrice(),totalQuantity++,updateCartQuantity()}function addToCartQuantityTransform(t,e){t.outerHTML='<div class="product__quantity js-quantity">\n        <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">\n        <svg class="icon icon-minus">\n            <use xlink:href="#icon-minus"></use>\n        </svg>\n    </button>\n    <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="1">\n    <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">\n            <use xlink:href="#icon-plus"></use>\n        </svg></button>\n    </div>';const r=e.querySelector(".js-quantityIncreaseButton"),a=e.querySelector(".js-quantityDecreaseButton");r.addEventListener("click",(()=>{const t=r.parentElement.querySelector(".js-quantityInput");totalQuantity++,updateCartQuantity();let a=parseInt(t.value),c=t.getAttribute("max");c&&a>=c?(t.value=c,sweetAlert(`Only ${c} left!`,"warning")):(t.value=a+1,updateCartProduct(1,e.dataset.id),sweetAlert("Added to your cart successfully"))})),a.addEventListener("click",(()=>{const t=a.parentElement.querySelector(".js-quantityInput");totalQuantity--,updateCartQuantity();let r=parseInt(t.value);if(1==r){e.querySelector(".js-quantity").outerHTML='<button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>',addToCartClick(e.querySelector(".js-productItemButton")),document.querySelector(`.js-cartProduct[data-id="${e.dataset.id}"]`).remove();const t=products.find((t=>t.id==e.dataset.id));totalPrice-=t.price,updateTotalPrice(),updateCartLength(-1),sweetAlert("Removed from your cart successfully","danger")}else t.value=r-1,updateCartProduct(-1,e.dataset.id),sweetAlert("Number of products has been decreased ","warning")}))}function updateCartProduct(t,e){const r=document.querySelector(`.js-cartProduct[data-id="${e}"]`),a=r.querySelector(".js-quantityInput"),c=r.querySelector(".js-cartProductPrice"),n=products.find((t=>t.id==e));a.setAttribute("value",parseInt(a.value)+t),c.textContent="$"+a.value*n.price,totalPrice+=n.price*t,updateTotalPrice()}let cartLength=0;function updateCartLength(t){cartLength+=t;if(document.querySelector(".js-headerCartTitle").textContent=`Cart(${cartLength})`,0==cartLength)return document.querySelector(".js-cartProducts").innerHTML="",void(document.querySelector(".js-cartProductContainer").innerHTML='<div class="cart__empty js-cartEmpty">\n        There is nothing added in your cart.\n    </div>');document.querySelector(".js-cartProducts").innerHTML=`<div class="cart__total__title">Total Products: </div>\n    <div class="cart__total__length">${cartLength} products</div>`}let totalQuantity=0;function updateCartQuantity(){const t=document.querySelector(".js-cartQuantity");t.innerHTML=0!=totalQuantity?`<div class="cart__total__title">Total Quantities: </div>\n    <div class="cart__total__quantity">${totalQuantity} products</div>`:""}function updateTotalPrice(){const t=document.querySelector(".js-cartTotal");t.innerHTML=0!=totalPrice?`<div class="cart__total__title">Total Price: </div>\n    <div class="cart__total__price">${formatter.format(totalPrice)}</div>`:""}function cartQuantityTransform(t){const e=t.querySelector(".js-quantityIncreaseButton"),r=t.querySelector(".js-quantityDecreaseButton"),a=document.querySelector(`.js-productItem[data-id="${t.dataset.id}"]`);r.addEventListener("click",(()=>{a.querySelector(".js-quantityDecreaseButton").dispatchEvent(new Event("click"))})),e.addEventListener("click",(()=>{a.querySelector(".js-quantityIncreaseButton").dispatchEvent(new Event("click"))}))}function sweetAlert(t,e="success",r=null){if(!r)switch(e){case"warning":r="warning";break;case"danger":r="remove";break;default:r="tick"}let a=document.querySelector(".js-alertContainer");a||(a=document.createElement("div"),a.className="alert-container js-alertContainer",document.body.appendChild(a));const c=document.createElement("div");c.className=`alert alert--${e} js-alert`,c.innerHTML=`<svg class="icon icon-${r} alert__icon"><use xlink:href="#icon-${r}"></use></svg>\n    <div class="alert__message">${t}</div>`,a.appendChild(c),setTimeout((()=>{a.removeChild(c),!document.querySelector(".js-alert")&&document.body.contains(a)&&document.body.removeChild(a)}),2e3)}function showCategoryProducts(t){let e=t.map((t=>`<div class="product__item js-productItem" data-id="${t.id}">\n            <img src="${t.img}" alt="${t.title}" class="product__item__image">\n            <div class="product__item__detail">\n                <div class="product__item__detail__title">${t.title}</div>\n                <div class="product__item__detail__desc">${t.desc}</div>\n                <div class="product__item__detail__price js-productItemPrice">${formatter.format(t.price)}</div>\n            </div>\n            <button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>\n        </div>`)).join("");productContainer.innerHTML=e;productContainer.querySelectorAll(".js-productItemButton").forEach((t=>{addToCartClick(t)}))}function showCategoryButtons(){const t=["all"];products.forEach((e=>{t.includes(e.category)||t.push(e.category)}));const e=t.map((t=>`<button type="button" class="product__category js-productCategory${"all"==t?" is-active":""}" aria-label="Product Category Button" data-id=${t}>${t}</button>`)).join("");productCategoryContainer.innerHTML=e;const r=productCategoryContainer.querySelectorAll(".js-productCategory");r.forEach((t=>{t.addEventListener("click",(t=>{r.forEach((e=>{e==t.currentTarget?e.classList.add("is-active"):e.classList.remove("is-active")}));const e=t.currentTarget.dataset.id,a=products.filter((t=>{if(t.category===e)return t}));showCategoryProducts("all"===e?products:a)}))}))}