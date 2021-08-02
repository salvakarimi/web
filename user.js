//changing the reciept and profile tag
function change_tab() {
    if (currentTab === "profile") {
        profileContent.style.display = "none"
        profileHeader.style.display = "none"

        receiptContent.style.display = "block"
        receiptHeader.style.display = "block"

        profileBtn.style.backgroundColor = "rgb(247, 247, 247)"
        receiptBtn.style.backgroundColor = "rgb(238, 238, 238)"
        currentTab = "receipt"

        if (totalReceipts === 0) {
            window.alert("هیچ رسیدی موجود نیست")
        }
    } else {
        profileContent.style.display = "block"
        profileHeader.style.display = "flex"

        receiptContent.style.display = "none"
        receiptHeader.style.display = "none"

        profileBtn.style.backgroundColor = "rgb(238, 238, 238)"
        receiptBtn.style.backgroundColor = "rgb(247, 247, 247)"
        currentTab = "profile"
    }
}

console.log("Hello")

var receiptBtn = document.querySelector(".receipt__button")
var profileBtn = document.querySelector(".profile__button")

var receiptContent = document.querySelector("#receipt__content")
var profileContent = document.querySelector("#profile__content")

var receiptHeader = document.querySelector("#receipt__header")
var profileHeader = document.querySelector("#profile__header")

var currentTab = "receipt"
change_tab()
window.onload = fill_data
//load profile
receiptBtn.addEventListener("click", (event) => {
    if (currentTab === "profile") {
        change_tab()
    }
})
//load reciepts
profileBtn.addEventListener("click", (event) => {
    if (currentTab === "receipt") {
        change_tab()
    }
})

//logout
user_logout = document.getElementById("user_logout")
if (user_logout != null) {
    user_logout.onclick = function () {
        fetch(`${window.origin}/logout`, {
            method: "GET",
            //body: JSON.stringify({}),
            headers: new Headers({ "content-type": "application/json" }),
            cache: "no-cache",
        }).then(function (response) {
            if (response.status !== 200) {
                console.log(`bad request: ${response.status}`)
                window.alert(`Cant logout. Error: ${response.status}`)
                return
            }
            window.location.replace("/main")
        })
    }
}

//profile validation
//first name box content
const fname = document.getElementById("fname")
console.log(fname)
//last name box content
const lname = document.getElementById("lname")
//pass box content
const pass = document.getElementById("pass")
//adrress box content
const address = document.getElementById("address")

// //check pass content when user is typing
// pass.addEventListener('keyup',(event)=>{
//     //event.preventDefault();
//     checkPass();
// });
// //check first name content when user is typing
// fname.addEventListener('keyup',(event)=>{
//     //event.preventDefault();
//     checkName();
// });
// //check last name content when user is typing
// lname.addEventListener('keyup',(event)=>{
//     //event.preventDefault();
//     checkLName();
// });
// //check address content when user is typing
// address.addEventListener('keyup',(event)=>{
//     //event.preventDefault();
//     checkAddress();
// });

// //checks pass  box content
// const checkPass=() => {
//     //boolean, specifies the correctness
//     let check=false;
//     //box contnet value
//     const passValue=pass.value;
//     //check for empty
//     if(passValue===''){
//         setError(pass,"رمز عبور نمی‌تواند خالی باشد");
//     //check for min length
//     }else if(passValue.length<8){
//         setError(pass,"رمز عبور باید حداقل ۸ کاراکتر باشد");
//     }
//     //check foprm max length
//     else if(passValue.length>255){
//         setError(pass,"رمز باید کمتر از ۲۵۵ کاراکتر باشد");
//     }
//     //chek if  itcontains  numbers
//     else if(passValue.search(/\d/) == -1){
//         setError(pass,'رمز عبور باید شامل اعداد نیز باشد');
//     }
//     //checkif  it  contains charachters
//     else if(passValue.search(/[a-zA-Z]/) == -1){
//         setError(pass,'رمز عبور باید شامل حروف نیز باشد');
//     }else{
//         setSuccess(pass);
//         check=true;
//     }
//     return check;
// }

// //checks  the  name box content
// const checkName = () => {
//     //boolean, defines rhe  correctnes at  th end
//     let check=false;
//     const nameValue = fname.value.trim(); //removing whitespace from end and begining
//     if (nameValue === ''){ //error if input is deleted(empty)
//         setErrorName(fname,'نام نمی‌تواند خالی باشد');
//     }
//     else if(nameValue.length >255){//max 255 charachters
//         setErrorName(fname,'نام باید کمتر از ۲۵۵ کاراکتر باشد');
//     } else{
//         setSuccessName(fname);
//         check=true;
//     }
//     return check;
// }

// //checks lastname box content
// const checkLName = () => {
//     //boolean, defnes the coorecteness at the end
//     let check=false;
//     const lnameValue = lname.value.trim(); //removing whitespace from end and begining
//     if (lnameValue === ''){ //error if input is deleted(empty)
//         setErrorLName(lname,'نام خوانوادگی نمی‌تواند خالی باشد');
//     }
//     else if(lnameValue.length >255){//max 255 charachters
//         setErrorLName(lname,'نام خوانوادگی باید کمتر از ۲۵۵ کاراکتر باشد');
//     } else{
//         setSuccessLName(lname);
//         check=true;
//     }
//     return check;
// }

// //checks address bo  content
// const checkAddress = () => {
//     //boolean, defines correctness at the end
//     let check=false;
//     //address bax value without beginning or ending spaces
//     const addressValue = address.value;
//     if (addressValue === ''){ //error if input is deleted(empty)
//         setError(address,'آدرس نمی‌تواند خالی باشد');
//     }
//     else if(addressValue.length >1000){//max 1000 charachters
//         setError(address,'آدرس باید کمتر از ۱۰۰۰ کاراکتر باشد');
//     } else{
//         setSuccess(address);
//         check=true;
//     }
//     return check;
// }

//change state to erroneous=>red border and small message
const setError = (input, msg) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    //importanttt! changes all classes to main__from__mail error
    inputType.className = "profile__password error"
    small.innerText = msg
    console.log("err")
}
const setErrorName = (input, msg) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    //importanttt! changes all classes to main__from__mail error
    inputType.className = "profile__fname error"
    small.innerText = msg
    console.log("err")
}
const setErrorLName = (input, msg) => {
    const inputType = input.parentElement
    const small = document.getElementById("lname_small")
    //importanttt! changes all classes to main__from__mail error
    inputType.className = "profile__lname error"
    small.innerText = msg
    console.log("err")
}

//sets state to correct=> green border and no message
const setSuccess = (input) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    inputType.className = "profile__password success"
}
//sets state to correct=> green border and no message
const setSuccessName = (input) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    inputType.className = "profile__fname success"
}
const setSuccessLName = (input) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    inputType.className = "profile__lname success"
}

// Get the modal
var modal = document.getElementById("myModal")

// Get the button that opens the modal
//the edit button
var edit = document.getElementById("edit")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

// When the user clicks the button, open the modal and display specified message
if (edit != null) {
    edit.onclick = function () {
        modal.style.display = "block"
        setMessage()
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
//vhanging the message displayed in modal
// function setMessage(){
//     //correctness of boxes
//     is_valid_pass=checkPass();
//     is_valid_name=checkName();
//     is_valid_lname=checkLName();
//     is_valid_address=checkAddress();

//     //finding number of falses
//     const validation_arr=[is_valid_pass,is_valid_name,is_valid_lname,is_valid_address];
//     let false_num=0;
//     for(let i=0;i<validation_arr.length;i++){
//         if(validation_arr[i]===false){
//             false_num++;
//         }
//     }

//     //value of the boxes
//     passValue=pass.value;
//     nameValue=fname.value.trim();
//     lnameValue=lname.value.trim();
//     addressValue=address.value;

//     modal_msg=document.getElementById('modal__msg');
//     //more than two boxes or wrong
//     if(false_num>1){
//         modal_msg.innerHTML='فیلدهای مشخص شده را کامل کنید';
//     }
//     //if only pass is invalid
//     else if(is_valid_pass==false){
//         modal_msg.innerHTML='فیلد رمز عبور را کامل کنید';
//     }
//     //if only name is invalid
//     else if(is_valid_name==false){
//          modal_msg.innerHTML='فیلد نام را کامل کنید';
//     }
//     //if only pass is invalid
//     else if(is_valid_lname==false){
//         modal_msg.innerHTML='فیلد نام خوانوادگی را کامل کنید';
//     }
//     //if only pass is invalid
//     else if(is_valid_address==false){
//         modal_msg.innerHTML='فیلد آدرس را کامل کنید';
//     }
//     //username and password are correct and defined
//     else{
//         modal_msg.innerHTML='ویرایش با موفقیت انجام شد';
//     }

// }

//check pass box at edit
pass.addEventListener("keyup", (event) => {
    //value of the boxes
    passValue = pass.value
    nameValue = fname.value.trim()
    lnameValue = lname.value.trim()
    addressValue = address.value
    fetch(`${window.origin}/user/profile`, {
        method: "POST",
        body: JSON.stringify({
            first_name: nameValue,
            last_name: lnameValue,
            password: passValue,
            address: addressValue,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert(
                `Cant Edit your info with this data Error: ${response.status}`
            )
            return
        }
        response.json().then(function (data) {
            console.log(data)
            if (data["pass"] == "pass empty") {
                setError(pass, "رمز عبور نمی‌تواند خالی باشد")
            } else if (data["pass"] == "pass min len invalid") {
                setError(pass, "رمز عبور باید حداقل ۸ کاراکتر باشد")
            } else if (data["pass"] == "pass num invalid") {
                setError(pass, "رمز عبور باید شامل اعداد نیز باشد")
            } else if (data["pass"] == "pass max len invalid") {
                setError(pass, "رمز باید کمتر از ۲۵۵ کاراکتر باشد")
            } else if (data["pass"] == "pass char invalid") {
                setError(pass, "رمز عبور باید شامل حروف نیز باشد")
            } else {
                setSuccess(pass)
            }
        })
    })
})

increase_credit = document.getElementById("increase_credit")

//increase credit
if (increase_credit != null) {
    increase_credit.onclick = function () {
        //console.log("logout fetch")
        fetch(`${window.origin}/credit`, {
            method: "GET",
            //body: JSON.stringify({}),
            headers: new Headers({ "content-type": "application/json" }),
            cache: "no-cache",
        }).then(function (response) {
            if (response.status !== 200) {
                console.log(`bad request: ${response.status}`)
                window.alert(`Cant Increase credit. Error: ${response.status}`)
                return
            }
            console.log("fetch main")
            // window.location.replace("/user/profile")
            fill_data((inp_replace = 1))
        })
    }
}
//seting the modal message
function setMessage() {
    passValue = pass.value
    nameValue = fname.value.trim()
    lnameValue = lname.value.trim()
    addressValue = address.value
    modal_msg = document.getElementById("modal__msg")
    console.log("edit fetch")
    fetch(`${window.origin}/edit/submit`, {
        method: "POST",
        body: JSON.stringify({
            first_name: nameValue,
            last_name: lnameValue,
            password: passValue,
            address: addressValue,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert(`Cant submit thi data. Error: ${response.status}`)
            return
        }
        response.json().then(function (data) {
            console.log(data)
            if (data["state"] == "success") {
                modal_msg.innerHTML = "ویرایش موفق"
                window.location.replace("/main")
            } else if (data["state"] == "fail") {
                modal_msg.innerHTML = "ویرایش ناموفق"
            }
        })
    })
}
//onload function
function fill_data(inp_replace = 1) {
    // request to server credit
    fetch(`/user`, {
        method: "POST",
        body: JSON.stringify({ command: "get_current_user" }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert(`Cant get current user. Error: ${response.status}`)
            return
        }
        response.json().then(function (data) {
            console.log(`got user response`)
            console.log(data)
            current_user_data = data["message"][0]
            fill_user_data(current_user_data)
        })
    })
    // DOM set credit

    // request to server receipts
    fetch(`/user`, {
        method: "POST",
        body: JSON.stringify({ command: "get_receipts" }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert(`Cant get receipts. Error: ${response.status}`)
            return
        }
        response.json().then(function (data) {
            console.log(`got receipt response: ${data}`)
            receipts = data.message
            var receipt_table = document.querySelector(".receipt__table")
            if (inp_replace === 1) {
                receipt_table.innerHTML = ""
            }
            totalReceipts = receipts.length
            for (var i = 0; i < totalReceipts; i++) {
                var receipt_row = createReceiptRow(receipts[i])
                receipt_table.appendChild(receipt_row)
            }
        })
    })
    // receipt
}
//creating a reciept row
function createReceiptRow(rec) {
    // <tr>
    // <td>ُSHOP102030</td>
    // <td>موس گیمینگ ریزر</td>
    // <td>200,000 تومان</td>
    // <td>تهران، تهران، امیرکبیر</td>
    // <td>در حال انجام</td>
    // </tr>

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

    var td5 = document.createElement("td")
    td5.innerHTML = rec["customer_address"]
    first_tr.appendChild(td5)

    var td = document.createElement("td")
    td.innerHTML = rec["state"]
    first_tr.appendChild(td)

    return first_tr
}

function fill_user_data(user_data) {
    var credit = document.querySelector(".profile__header__credit__amount")
    credit.innerHTML = user_data["user_credit"]
}

var shop_btn = document.querySelector(".shop_button")

shop_btn.addEventListener("click", (event) => {
    console.log("shop button clicked")
    fetch("/user/shop_basket", {}).then(function (response) {
        window.location.replace("/user/shop_basket")
    })
})
