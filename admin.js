var receiptBtn = document.querySelector(".tab__receipt__button")
var productBtn = document.querySelector(".tab__product__button")
var categoryBtn = document.querySelector(".tab__category__button")

var receiptContent = document.querySelector("#receipt__content")
var productContent = document.querySelector("#product__content")
var categoryContent = document.querySelector("#category__content")

receiptBtn.addEventListener("click", (event) => {
    console.log("sth clicked")
    productContent.style.display = "none"
    categoryContent.style.display = "none"
    receiptContent.style.display = "block"
    productBtn.style.backgroundColor = "rgb(247, 247, 247)"
    categoryBtn.style.backgroundColor = "rgb(247, 247, 247)"
    receiptBtn.style.backgroundColor = "rgb(238, 238, 238)"

    if (totalReceipts === 0) {
        window.alert("هیچ رسیدی موجود نیست")
    }
})

productBtn.addEventListener("click", (event) => {
    console.log("sth clicked")
    productContent.style.display = "block"
    categoryContent.style.display = "none"
    receiptContent.style.display = "none"

    productBtn.style.backgroundColor = "rgb(238, 238, 238)"
    categoryBtn.style.backgroundColor = "rgb(247, 247, 247)"
    receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
})

categoryBtn.addEventListener("click", (event) => {
    console.log("sth clicked")
    productContent.style.display = "none"
    categoryContent.style.display = "block"
    receiptContent.style.display = "none"

    productBtn.style.backgroundColor = "rgb(247, 247, 247)"
    categoryBtn.style.backgroundColor = "rgb(238, 238, 238)"
    receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
})

function load_products(replace = 0) {
    loading.style.display = "flex"
    fetch(`${window.location.origin}/admin`, {
        method: "POST",
        body: JSON.stringify({ command: "get_products" }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("products cant be load (server error)!")
            loading.style.display = "none"
        }
        response.json().then(function (data) {
            products = data.message
            var productContentLower = document.querySelector(
                ".product__content__lower"
            )
            if (replace === 1) {
                productContentLower.innerHTML = ""
            }
            totalProducts = products.length
            if (totalProducts === 0) {
                window.alert("هیچ کالایی موجود نیست")
            }
            for (var i = 0; i < totalProducts; i++) {
                var aug_product = createAugmentedProducts(products[i])
                productContentLower.appendChild(aug_product)
            }
            loading.style.display = "none"
        })
    })

    fetch(`/admin`, {
        method: "POST",
        body: JSON.stringify({ command: "get_categories" }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            window.alert("cant get categories (server error)!")
            console.log(`bad request: ${response.status}`)
            return
        }
        response.json().then(function (data) {
            console.log(`got category response: ${data}`)
            categories = data.message
            var cat_table = document.querySelector(".category__table")
            if (replace === 1) {
                cat_table.innerHTML = ""
                var init_tr = document.createElement("tr")
                var init_th1 = document.createElement("th")
                init_th1.innerHTML = "عملیات"

                var init_th2 = document.createElement("th")
                init_th2.innerHTML = "نام دسته بندی"

                init_tr.appendChild(init_th2)
                init_tr.appendChild(init_th1)
                cat_table.appendChild(init_tr)
            }
            totalCategories = categories.length
            for (var i = 0; i < totalCategories; i++) {
                var table_row = createCategoryRow(
                    categories[i],
                    replace,
                    cat_table
                )
                cat_table.appendChild(table_row)
            }
        })
    })

    fetch(`/admin`, {
        method: "POST",
        body: JSON.stringify({ command: "get_receipts" }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("cant get receipts (server error)!")
            return
        }
        response.json().then(function (data) {
            console.log(`got receipt response: ${data}`)
            receipts = data.message
            var receipt_table = document.querySelector(".receipt__table")
            if (replace === 1) {
                receipt_table.innerHTML = ""
            }
            totalReceipts = receipts.length
            for (var i = 0; i < totalReceipts; i++) {
                var receipt_row = createReceiptRow(receipts[i])
                receipt_table.appendChild(receipt_row)
            }
        })
    })
}

function createCategoryRow(cat, replace = 0, cat_table = "") {
    cat_name = cat["name"]
    var first_tr = document.createElement("tr")
    first_tr.id = cat_name
    var first_td = document.createElement("td")
    first_td.innerHTML = cat_name
    first_tr.appendChild(first_td)

    var second_td = document.createElement("td")
    var div = document.createElement("div")
    div.className = "action__div"
    var btn = document.createElement("button")
    btn.innerHTML = "ویرایش دسته بندی"
    btn.addEventListener("click", () => {
        edit_category_start(first_tr.id)
    })
    div.appendChild(btn)

    var btn2 = document.createElement("button")
    btn2.innerHTML = "Xحذف دسته بندی"
    btn2.addEventListener("click", () => {
        delete_cat(first_tr.id)
    })
    div.appendChild(btn2)

    second_td.appendChild(div)
    first_tr.appendChild(second_td)

    return first_tr
}

function createReceiptRow(rec) {
    rec_id = rec["id"]
    var first_tr = document.createElement("tr")
    first_tr.id = rec_id

    var td1 = document.createElement("td")

    td1.innerHTML = rec_id
    first_tr.appendChild(td1)

    var td2 = document.createElement("td")
    td2.innerHTML = rec["product_name"]
    first_tr.appendChild(td2)

    var td3 = document.createElement("td")
    td3.innerHTML = `${rec["total_price"]} تومان`
    first_tr.appendChild(td3)

    var td4 = document.createElement("td")
    td4.innerHTML = `${rec["customer_first_name"]} ${rec["customer_last_name"]}`
    first_tr.appendChild(td4)

    var td5 = document.createElement("td")
    td5.innerHTML = rec["customer_address"]
    first_tr.appendChild(td5)

    var td6 = document.createElement("td")
    td6.innerHTML = rec["purchase_number"]
    first_tr.appendChild(td6)

    var td = document.createElement("td")
    td.innerHTML = ""
    var btn = document.createElement("button")
    btn.textContent = rec["state"]
    btn.style.backgroundColor = "inherit"
    btn.style.border = "none"
    btn.className = "edit-receipt-state"
    btn.addEventListener("click", (event) => {
        edit_receipt_start(first_tr.id)
    })
    td.appendChild(btn)
    first_tr.appendChild(td)

    return first_tr
}

function delete_cat(cat_name) {
    loading.style.display = "flex"
    fetch(`/admin/delete_category`, {
        method: "POST",
        body: JSON.stringify({ cat_name: cat_name }),
        headers: new Headers({ "content-type": "application/json" }),
        credentials: "include",
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            window.alert("This category cant be deleted")
            console.log(`bad request: ${response.status}`)
            loading.style.display = "none"
        }
        // var row = document.getElementById(cat_name)
        // row.style.display = "none"
        loading.style.display = "none"
        load_products(1)
    })
}

function createAugmentedProducts(data) {
    var augmentedProduct = document.createElement("div")
    augmentedProduct.className = "augmented-product"

    var sold_btn = document.createElement("button")
    sold_btn.className = "product__sold"
    sold_btn.textContent = data.sold_number

    var product = document.createElement("div")
    product.className = "product"
    var productUpper = document.createElement("div")
    productUpper.className = "product__upper"
    var productImage = document.createElement("div")
    productImage.className = "product__image"
    var productDetails = document.createElement("div")
    productDetails.className = "product__details"
    var productLower = document.createElement("div")
    productLower.className = "product__lower"

    var img = document.createElement("img")
    img.src = data.image

    var productDetailsName = document.createElement("p")
    productDetailsName.innerHTML = data.name
    productDetailsName.className = "product__details--name"

    var productDetailsCategory = document.createElement("p")
    productDetailsCategory.innerHTML = data.category
    productDetailsCategory.className = "product__details--category"

    var productPrice = document.createElement("p")
    productPrice.innerHTML = `${data.price} تومان`
    productPrice.className = "product__price"

    var productButton = document.createElement("button")
    productButton.textContent = "ویرایش محصول"
    productButton.className = "product__button"
    productButton.addEventListener("click", edit_product)

    productDetails.appendChild(productDetailsName)
    productDetails.appendChild(productDetailsCategory)

    productImage.appendChild(img)

    productUpper.appendChild(productImage)
    productUpper.appendChild(productDetails)

    productLower.appendChild(productButton)
    productLower.appendChild(productPrice)

    product.appendChild(productUpper)
    product.appendChild(productLower)

    augmentedProduct.appendChild(product)
    augmentedProduct.appendChild(sold_btn)

    return augmentedProduct
}

function add_product() {
    console.log("umad")
    window.location.replace(`${window.origin}/admin/create_product`)
    fetch(`${window.origin}/admin/create_product`, {})
}

function edit_product() {
    ancestor = this.parentElement.parentElement.parentElement
    product_name = ancestor.querySelector(".product__details--name").innerHTML
    console.log(product_name)
    loading.style.display = "flex"
    fetch(`/admin/edit_product`, {
        method: "POST",
        body: JSON.stringify({ product_name: product_name }),
    }).then(function (response) {
        if (response.status == 200) {
            loading.style.display = "none"
            window.location.replace(`/admin/edit_product`)
        }
        loading.style.display = "none"
    })
}

function edit_category_start(cat_name) {
    var div = document.querySelector(".edit-cat-div")
    div.style.display = "block"

    var old_name_div = document.querySelector(".old-cat-name")
    old_name_div.innerHTML = cat_name

    var inp_cat_name = document.querySelector(".cat-name")
    inp_cat_name.value = ""
}

function edit_receipt_start(rec_name) {
    var div = document.querySelector(".edit-rec-div")
    div.style.display = "block"

    var old_name_div = document.querySelector(".old-rec-name")
    old_name_div.innerHTML = rec_name

    var inp_rec_name = document.querySelector(".rec-name")
    inp_rec_name.value = ""
}

function edit_category() {
    var div_cat_name = document.querySelector(".old-cat-name")
    var old_name = div_cat_name.innerHTML
    console.log(old_name)

    var inp_cat_name = document.querySelector(".cat-name")
    var cat_name = inp_cat_name.value

    loading.style.display = "flex"
    fetch(`/admin/edit_category`, {
        method: "POST",
        body: JSON.stringify({ old_name: old_name, cat_name: cat_name }),
        headers: new Headers({ "content-type": "application/json" }),
        credentials: "include",
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            window.alert("The category cant be updated to this")
            console.log(`bad request: ${response.status}`)
            loading.style.display = "none"
            return
        }

        var div = document.querySelector(".edit-cat-div")
        div.style.display = "none"
        div_cat_name.innerHTML = ""
        loading.style.display = "none"
        load_products(1)
    })
}

function edit_receipt() {
    var div_rec_name = document.querySelector(".old-rec-name")
    var old_name = div_rec_name.innerHTML
    console.log(old_name)

    var inp_rec_name = document.querySelector(".rec-name")
    var rec_name = inp_rec_name.value
    loading.style.display = "flex"
    fetch(`/admin/edit_receipt`, {
        method: "POST",
        body: JSON.stringify({ old_name: old_name, rec_name: rec_name }),
        headers: new Headers({ "content-type": "application/json" }),
        credentials: "include",
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("The receipt cant be updated to this name!")
            loading.style.display = "none"
            // load_products(1)
        }

        var div = document.querySelector(".edit-rec-div")
        div.style.display = "none"
        div_rec_name.innerHTML = ""
        loading.style.display = "none"
        load_products(1)
    })
}

function filter_receipt_func(rec_id) {
    loading.style.display = "flex"
    fetch(`/admin`, {
        method: "POST",
        body: JSON.stringify({
            command: "get_filtered_receipts",
            rec_id: rec_id,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("Cant get filtered receipt")
            loading.style.display = "none"
        }
        response.json().then(function (data) {
            console.log(`got receipt response: ${data}`)
            receipts = data.message
            var receipt_table = document.querySelector(".receipt__table")
            receipt_table.innerHTML = ""

            totalReceipts = receipts.length
            for (var i = 0; i < totalReceipts; i++) {
                var receipt_row = createReceiptRow(receipts[i])
                receipt_table.appendChild(receipt_row)
            }
        })
        loading.style.display = "none"
    })
}

window.onload = load_products

var create_product = document.querySelector(".product__content__upper")
create_product.addEventListener("click", add_product)

var add_cat = document.querySelector(".add-category")
add_cat.addEventListener("click", (event) => {
    var cat_name = document.querySelector(".category__add__input")
    console.log(cat_name.value)
    loading.style.display = "flex"
    fetch(`/admin/add_category`, {
        method: "POST",
        body: JSON.stringify({ cat_name: cat_name.value }),
        headers: new Headers({ "content-type": "application/json" }),
    }).then(function (response) {
        if (response.status == 200) {
            cat_name.value = ""
            cat_name.innerHTML = ""
            load_products(1)
        } else {
            console.log(response.json())
            //new
            load_products(1)
        }
        loading.style.display = "none"
    })
})

var submit_edit_cat_btn = document.querySelector(".edit-cat-btn")
submit_edit_cat_btn.addEventListener("click", edit_category)

var close_edit_cat_btn = document.querySelector(".close-edit-cat")
close_edit_cat_btn.addEventListener("click", (event) => {
    var div = document.querySelector(".edit-cat-div")
    div.style.display = "none"
})

var submit_edit_rec_btn = document.querySelector(".edit-rec-btn")
submit_edit_rec_btn.addEventListener("click", edit_receipt)

var close_edit_rec_btn = document.querySelector(".close-edit-rec")
close_edit_rec_btn.addEventListener("click", (event) => {
    console.log("helloo")
    var div = document.querySelector(".edit-rec-div")
    div.style.display = "none"
})

var filter_receipt = document.querySelector(".search-receipt")
var recept_search_input = document.querySelector(".recept__search__input")
filter_receipt.addEventListener("click", () => {
    filter_receipt_func(recept_search_input.value)
})

var loading = document.querySelector(".loading-2")

var close = document.getElementsByClassName("closebtn")
var i

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement
        div.style.opacity = "0"
        setTimeout(function () {
            div.style.display = "none"
        }, 600)
    }
}

function add_notif(context) {
    // <div class="alert">
    // <span class="closebtn">&times;</span>
    // {{ message }}
    // </div>
    console.log(context)
}
