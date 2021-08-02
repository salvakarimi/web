//showes slides in main page
function showSlides() {
    var i
    var slides = document.querySelectorAll(".slider__image")
    console.log(slides.length)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    slideIndex++
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block"
    setTimeout(showSlides, 10000) // Change image every 2 seconds
}

//changes slides in main page
function changeSlides(offset) {
    var i
    var slides = document.querySelectorAll(".slider__image")
    console.log(slides.length)
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    slideIndex += offset
    console.log(`offset is ${offset}`)
    console.log(`slide index is ${slideIndex}`)
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (slideIndex <= 0) {
        slideIndex = slides.length
    }
    slides[slideIndex - 1].style.display = "block"
}

//creates a new product box
function createProducts(input_product) {
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
    img.src = input_product.image

    var productDetailsName = document.createElement("p")
    productDetailsName.innerHTML = input_product.name
    productDetailsName.className = "product__details--name"

    var productDetailsCategory = document.createElement("p")
    productDetailsCategory.innerHTML = input_product.category
    productDetailsCategory.className = "product__details--category"

    var productPrice = document.createElement("p")
    productPrice.innerHTML = `${input_product.price} تومان`
    productPrice.className = "product__price"

    var productButton = document.createElement("button")
    productButton.textContent = "خرید محصول"
    productButton.className = "product__button"
    productButton.addEventListener("click", (event) => {
        add_to_shop_basket(input_product.name)
    })

    productDetails.appendChild(productDetailsName)
    productDetails.appendChild(productDetailsCategory)

    productImage.appendChild(img)

    productUpper.appendChild(productImage)
    productUpper.appendChild(productDetails)

    productLower.appendChild(productButton)
    productLower.appendChild(productPrice)

    product.appendChild(productUpper)
    product.appendChild(productLower)

    return product
}

//creates a modal with header, body and footer
function createModal(product){
    // <!-- The Modal -->
    // <div id="myModal" class="modal">
    // <!-- Modal content -->
    //     <div class="modal-content">
    //         <div class="modal-header">
    //             <span class="close">&times;</span>
    //             <h2>Modal Header</h2>
    //         </div>
    //         <div class="modal-body">
    //             <p id='modal__msg'></p>
    //         </div>
    //         <div class="modal-footer">
    //             <h3>Modal Footer</h3>
    //         </div>
    //     </div>
    // </div>
        var modal = document.createElement("div")
        modal.className = "modal"
        modal.id='myModal'

        var modal_content = document.createElement("div")
        modal_content.className = "modal-content"

        var modal_header = document.createElement("div")
        modal_header.className = "modal-header"

        var close = document.createElement("span")
        close.className = "close"

        var modal_body = document.createElement("div")
        modal_body.className = "modal-body"

        var modal_input_box =document.createElement('div')
        modal_input_box.className='modal_input_box'


        var modal_input = document.createElement("INPUT")
        modal_input.setAttribute("type", "text");
        modal_input.className='modal_input'
        modal_input.id='modal__input'

        var modal_button = document.createElement("INPUT")
        modal_button.setAttribute("type", "submit");
        modal_button.className='modal_button'
        modal_button.id='modal__btn'

        var modal_msg = document.createElement("p")
        modal_msg.id='modal__msg'

        var modal_footer = document.createElement('div')
        modal_footer.className='modal-footer'

        modal_header.appendChild(close)
        modal_input_box.appendChild(modal_input)
        modal_input_box.appendChild(modal_button)
        modal_body.appendChild(modal_input_box)
        modal_body.appendChild(modal_msg)
        modal_content.appendChild(modal_header)

        modal_content.appendChild(modal_body)
        modal_content.appendChild(modal_footer)
        modal.appendChild(modal_content)

        return modal
}

//creates paging button
function createPagingButtons() {
    var paging = document.querySelector(".paging")
    paging.innerHTML = ""
    var prevPage = document.createElement("button")
    prevPage.className = "prev-page__btn"
    prevPage.textContent = "صفحه قبل"
    prevPage.addEventListener(
        "click",
        function () {
            changePage(pageIndex - 1)
        },
        false
    )
    var nextPage = document.createElement("button")
    nextPage.className = "next-page__btn"
    nextPage.textContent = "صفحه بعد"
    nextPage.addEventListener(
        "click",
        function () {
            changePage(pageIndex + 1)
        },
        false
    )
    var pagingButtons = document.createElement("div")
    pagingButtons.className = "page__buttons"
    pagingButtons.innerHTML = ""

    for (var i = 0; i < Math.ceil(totalProducts / itemPerPage); i++) {
        var btn = document.createElement("button")
        btn.textContent = i + 1
        btn.addEventListener(
            "click",
            function () {
                changePage(parseInt(this.textContent))
            },
            false
        )
        if (i + 1 === pageIndex) {
            btn.style.backgroundColor = "rgb(249, 89, 58)"
        }
        pagingButtons.appendChild(btn)
    }

    if (pageIndex === Math.ceil(totalProducts / itemPerPage)) {
        nextPage.style.display = "none"
    } else if (pageIndex === 1) {
        prevPage.style.display = "none"
    }

    if (totalProducts > 0) {
        paging.appendChild(prevPage)
        paging.appendChild(pagingButtons)
        paging.appendChild(nextPage)
    }
}

//the pagining functionality, send a request to main for categories
function pagging(inp_replace = 0, slide1_val = 0, slide2_val = 500000000) {
    console.log(`pagging ${inp_replace}`)

    if (inp_replace === 0) {
        console.log("umad cat")
        loading.style.display = "flex"
        console.log("loading")
        fetch(`/main`, {
            method: "POST",
            body: JSON.stringify({ command: "get_categories" }),
            headers: new Headers({ "content-type": "application/json" }),
            cache: "no-cache",
        }).then(function (response) {
            if (response.status !== 200) {
                console.log(`bad request: ${response.status}`)
                return
            }
            response.json().then(function (data) {
                categories = data.message
                var cat_table = document.querySelector(
                    ".main__bottom__lower__filter--categories--choices"
                )
                if (inp_replace === 1) {
                    cat_table.innerHTML = ""
                }
                totalCategories = categories.length
                for (var i = 0; i < totalCategories; i++) {
                    var table_row = createCategoryRow(categories[i], i)
                    cat_table.appendChild(table_row)
                }
                loading.style.display = "none"
            })
        })
    }

    if (inp_replace === 0) {
        slider_start()
    }
    var selected_categories = get_selected_categories()
    var sort_price_btn = document.querySelector(
        ".main__bottom__sort__button--price"
    )
    var sort_date_btn = document.querySelector(
        ".main__bottom__sort__button--date"
    )

    var order = "desc"
    var sort = "sold"
    if (sort_price_btn.style.backgroundColor === "red") {
        order = "desc"
        sort = "price"
    } else if (sort_price_btn.style.backgroundColor === "rgb(0, 156, 255)") {
        order = "asc"
        sort = "price"
    } else if (sort_date_btn.style.backgroundColor === "rgb(0, 156, 255)") {
        order = "desc"
        sort = "date"
    } else {
        order = "desc"
        sort = "sold"
    }

    console.log(
        `sort: ${sort}, order: ${order}, product name: ${filter_by_name}`
    )
    loading.style.display = "flex"
    fetch(`${window.location.origin}/main`, {
        method: "POST",
        body: JSON.stringify({
            command: "get_products",
            sort: sort,
            sort_order: order,
            product_name: filter_by_name,
            product_categories: selected_categories,
            price_range: [slide1_val, slide2_val],
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            loading.style.display = "none"
            return
        }
        response.json().then(function (data) {
            products = data.message

            if (inp_replace === 1) {
                mainBottomLowerProduct.innerHTML = ""
            }
            totalProducts = products.length
            if (totalProducts === 0) {
                window.alert("هیچ کالایی با این مشخصات موجود نیست")
            }
            for (var i = 0; i < totalProducts; i++) {
                var product = createProducts(products[i])

                mainBottomLowerProduct.appendChild(product)

                if (i >= pageIndex * itemPerPage) {
                    product.style.display = "none"
                }
                if (i < (pageIndex - 1) * itemPerPage) {
                    product.style.display = "none"
                }
            }
            createPagingButtons()
            loading.style.display = "none"
        })
    })
}

//functin gives selected categories
function get_selected_categories() {
    var choices = document.getElementsByClassName("checkbox")

    var selected = []
    for (i = 0; i < choices.length; i += 1) {
        if (choices[i].checked) {
            selected.push(choices[i].name)
        }
    }

    return selected
}

//creates a category row
function createCategoryRow(inp_cat, i) {
    var div = document.createElement("div")
    div.className = "choice"

    var inp = document.createElement("input")
    inp.className = "checkbox"
    inp.type = "checkbox"
    inp.name = inp_cat.name
    inp.id = i
    inp.addEventListener("click", () => {
        pageIndex = 1
        pagging(1)
    })

    var label = document.createElement("label")
    label.for = inp_cat.name
    label.innerHTML = inp_cat.name

    div.appendChild(label)
    div.appendChild(inp)

    return div
}

//changes the page
function changePage(index) {
    pageIndex = index
    mainBottomLowerProduct.innerHTML = ""
    pagging(1)
}

//change items in a page
function changeItemPerPage(value) {
    itemPerPage = value
    if (totalProducts < itemPerPage * pageIndex) {
        pageIndex = 1
    }

    mainBottomLowerProduct.innerHTML = ""
    pagging(1)
}

//loading
var loading = document.querySelector(".loading-2")
var slideIndex = 0
totalProducts = 40
var pageIndex = 1
var itemPerPage = 15
var filter_by_name = ""
showSlides()
const next_btn = document.querySelector("#next")
next_btn.addEventListener(
    "click",
    function () {
        changeSlides(1)
    },
    false
)
const prev_btn = document.querySelector("#prev")
prev_btn.addEventListener(
    "click",
    function () {
        changeSlides(-1)
    },
    false
)

// // var products = [
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  1",
// //         category: "دسته بندی  1",
// //         price: "10000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  2",
// //         category: "دسته بندی  2",
// //         price: "20000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  3",
// //         category: "دسته بندی  3",
// //         price: "30000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  4",
// //         category: "دسته بندی  4",
// //         price: "40000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  5",
// //         category: "دسته بندی  5",
// //         price: "50000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  6",
// //         category: "دسته بندی  6",
// //         price: "60000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  7",
// //         category: "دسته بندی  7",
// //         price: "70000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  8",
// //         category: "دسته بندی  8",
// //         price: "80000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  9",
// //         category: "دسته بندی  9",
// //         price: "90000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  10",
// //         category: "دسته بندی  10",
// //         price: "100000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  11",
// //         category: "دسته بندی  11",
// //         price: "110000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  12",
// //         category: "دسته بندی  12",
// //         price: "120000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  13",
// //         category: "دسته بندی  13",
// //         price: "130000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  14",
// //         category: "دسته بندی  14",
// //         price: "140000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  15",
// //         category: "دسته بندی  15",
// //         price: "150000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  16",
// //         category: "دسته بندی  16",
// //         price: "160000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  17",
// //         category: "دسته بندی  17",
// //         price: "170000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  18",
// //         category: "دسته بندی  18",
// //         price: "180000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  19",
// //         category: "دسته بندی  19",
// //         price: "190000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  20",
// //         category: "دسته بندی  20",
// //         price: "200000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  21",
// //         category: "دسته بندی  21",
// //         price: "210000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  22",
// //         category: "دسته بندی  22",
// //         price: "220000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  23",
// //         category: "دسته بندی  23",
// //         price: "230000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  24",
// //         category: "دسته بندی  24",
// //         price: "240000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  25",
// //         category: "دسته بندی  25",
// //         price: "250000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  26",
// //         category: "دسته بندی  26",
// //         price: "260000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  27",
// //         category: "دسته بندی  27",
// //         price: "270000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  28",
// //         category: "دسته بندی  28",
// //         price: "280000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  29",
// //         category: "دسته بندی  29",
// //         price: "290000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  30",
// //         category: "دسته بندی  30",
// //         price: "300000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  31",
// //         category: "دسته بندی  31",
// //         price: "310000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  32",
// //         category: "دسته بندی  32",
// //         price: "320000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  33",
// //         category: "دسته بندی  33",
// //         price: "330000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  34",
// //         category: "دسته بندی  34",
// //         price: "340000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  35",
// //         category: "دسته بندی  35",
// //         price: "350000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  36",
// //         category: "دسته بندی  36",
// //         price: "360000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  37",
// //         category: "دسته بندی  37",
// //         price: "370000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  38",
// //         category: "دسته بندی  38",
// //         price: "380000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  39",
// //         category: "دسته بندی  39",
// //         price: "390000",
// //     },
// //     {
// //         img: "/static/Pictures/Product_sample_picture.png",
// //         name: "موس گیمینگ ریزر  40",
// //         category: "دسته بندی  40",
// //         price: "400000",
// //     },
// ]
var mainBottomLowerProduct = document.querySelector(
    ".main__bottom__lower__products"
)
window.onload = () => {
    pagging(0)
}

var select = document.querySelector("#item-per-page__select")
select.addEventListener("change", (event) => {
    changeItemPerPage(event.target.value)
})

// var menuProductBtn = document.querySelector(".menu__product-btn")
// menuProductBtn.addEventListener('click', (event)=>{
//   window.location.replace(`${window.location.origin}/main#productt`)
// })

//redirect to profile
dropdown__profile = document.getElementById("dropdown__profile")
if (dropdown__profile != null) {
    dropdown__profile.onclick = function () {
        console.log("user fetch")
        window.location.replace("/user")
    }
}

//logout
dropdown__logout = document.getElementById("dropdown__logout")
if (dropdown__logout != null) {
    dropdown__logout.onclick = function () {
        console.log("logout fetch")
        loading.style.display = "flex"
        fetch(`${window.origin}/logout`, {
            method: "GET",
            //body: JSON.stringify({}),
            headers: new Headers({ "content-type": "application/json" }),
            cache: "no-cache",
        }).then(function (response) {
            if (response.status !== 200) {
                console.log(`bad request: ${response.status}`)
                return
            }
            console.log("fetch main")
            loading.style.display = "none"
            window.location.replace("/main")
        })
    }
}

//redirect to sign-in
main__signin = document.getElementById("main__signin")
if (main__signin != null) {
    main__signin.onclick = function () {
        console.log("signin fetch")
        window.location.replace("/signin")
    }
}

var price_btn = document.querySelector(".main__bottom__sort__button--price")
var sold_btn = document.querySelector(".main__bottom__sort__button--sales")
var date_btn = document.querySelector(".main__bottom__sort__button--date")

price_btn.addEventListener("click", (event) => {
    if (price_btn.style.backgroundColor === "rgb(0, 156, 255)") {
        price_btn.style.backgroundColor = "red"
        price_btn.innerHTML = "قیمت (نزولی)"
        price_btn.style.color = "aliceblue"
        sold_btn.style.backgroundColor = "inherit"
        sold_btn.style.color = "black"

        date_btn.style.backgroundColor = "inherit"
        date_btn.style.color = "black"
    } else if (price_btn.style.backgroundColor === "red") {
        price_btn.style.backgroundColor = "inherit"
        price_btn.style.color = "black"
        price_btn.innerHTML = "قیمت"
        sold_btn.style.backgroundColor = "rgb(0, 156, 255)"
        sold_btn.style.color = "aliceblue"
        date_btn.style.backgroundColor = "inherit"
        date_btn.style.color = "black"
    } else {
        price_btn.style.backgroundColor = "rgb(0, 156, 255)"
        price_btn.innerHTML = "قیمت (صعودی)"
        price_btn.style.color = "aliceblue"
        sold_btn.style.backgroundColor = "inherit"
        sold_btn.style.color = "black"
        date_btn.style.backgroundColor = "inherit"
        date_btn.style.color = "black"
    }
    pagging(1)
})

sold_btn.addEventListener("click", (event) => {
    sold_btn.style.backgroundColor = "rgb(0, 156, 255)"
    price_btn.style.backgroundColor = "inherit"
    price_btn.style.color = "black"
    price_btn.innerHTML = "قیمت"
    sold_btn.style.color = "aliceblue"
    date_btn.style.backgroundColor = "inherit"
    date_btn.style.color = "black"
    pagging(1)
})

date_btn.addEventListener("click", (event) => {
    date_btn.style.backgroundColor = "rgb(0, 156, 255)"
    date_btn.style.color = "aliceblue"

    sold_btn.style.backgroundColor = "inherit"
    price_btn.style.backgroundColor = "inherit"
    price_btn.style.color = "black"
    price_btn.innerHTML = "قیمت"
    sold_btn.style.color = "black"
    pagging(1)
})

var search_btn = document.querySelector(".main__main__button--search")
var filter_by_name_input = document.querySelector(".main__main__input--search")
filter_by_name_input.addEventListener("keyup", (event) => {
    event.preventDefault()
    if (event.keyCode === 13) {
        console.log("enter")
        filter_by_name = filter_by_name_input.value
        console.log(filter_by_name)
        pagging(1)
    }
})
search_btn.addEventListener("click", () => {
    console.log("btn click")
    filter_by_name = filter_by_name_input.value
    console.log(filter_by_name)
    pagging(1)
})

// Slider js start

function getVals() {
    // Get slider values
    var parent = this.parentNode
    var slides = parent.getElementsByTagName("input")
    var slide1 = parseFloat(slides[0].value)
    var slide2 = parseFloat(slides[1].value)
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        var tmp = slide2
        slide2 = slide1
        slide1 = tmp
    }

    var displayElement = parent.getElementsByClassName("rangeValues")[0]
    displayElement.innerHTML = `${slide1},      ${slide2}`
    displayElement.style.direction = "rtl"
    pagging(1, slide1, slide2)
}

function slider_start() {
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider")
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input")
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals
                // Manually trigger event first time to display values
                sliders[y].oninput()
            }
        }
    }
}
// slider js end

//adding item to cart
function add_to_shop_basket(input_product_name) {
 
    var modal = document.getElementById("myModal")

    //var modal = document.getElementById("myModal");
    modal.style.display = "block"
    // request server, post, input_product_name
    // availability number
    // if > 0 -> modal: added to shop basket
    // else -> not available
           
    var span = document.getElementsByClassName("close")[0]

    // When the user clicks the button, open the modal and display specified message
    btn=document.getElementById('modal__buttonn')
    modal_button.onclick = function() {
    
        number=document.getElementById('modal_input')
        modal_msg=document.getElementById('modal__msg')
        product_number=Number(number.value)
        
        fetch(`${window.origin}/user/add_to_shop_basket`, {
            method: "POST",
            body: JSON.stringify({
                "product_name": input_product_name,
                "product_count": product_number
            }),
            headers: new Headers({"content-type": "application/json"}),
            cache: 'no-cache'
        })
        .then(function (response){
            if(response.status !== 200 && response.status !== 405){
                console.log(`bad request: ${response.status}`)
                return;
            }
            response.json().then(function (data){
                console.log(data)
                modal_msg.innerHTML=data['message']
                })
        });
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none"
        modal_msg.innerHTML=""
        number.value=0

    //setNewWindow();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none"
        modal_msg.innerHTML=""
        number.value=0
        //setNewWindow();
        }
    }

   
    

}
