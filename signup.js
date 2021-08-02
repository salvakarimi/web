//first name box content
const fname = document.getElementById("name")
//last name box content
const lname = document.getElementById("lname")
//email box content
const email = document.getElementById("email")
//pass box content
const pass = document.getElementById("pass")
//adrress box content
const address = document.getElementById("address")
//list of users and passoword, defined for phase2
const user_pass_list = [
    { mail: "salva_k4@yahoo.com", password: "12345678a" },
    { mail: "a@b.c", password: "12345678b" },
    { email: "a@b.d", password: "12345678c" },
]

//check mail content when user is typing
//email.addEventListener('keyup',(event)=>{

//checkMail();
//});
//check pass content when user is typing
//pass.addEventListener('keyup',(event)=>{
//checkPass();
//});
//check first name content when user is typing
//fname.addEventListener('keyup',(event)=>{
//checkName();
//});
//check last name content when user is typing
//lname.addEventListener('keyup',(event)=>{

//   checkLName();
//});
//check address content when user is typing
////address.addEventListener('keyup',(event)=>{

//checkAddress();
//});

//checks mail box content
//const checkMail = () => {
//boolean,return the correcness of box
//    let check=false;
//    const emailValue = email.value.trim(); //removing whitespace from end and begining
//    if (emailValue === ''){ //error if input is deleted(empty)
//        setError(email,'ایمیل نمی‌تواند خالی باشد');
//    }else if (ValidateEmail(emailValue)===false) { //email structure validation
//        setError(email,'ایمیل نامعتبر');
//    }
//    else if(emailValue.length >255){//max 255 charachters
//        setError(email,'ایمیل باید کمتر از ۲۵۵ کاراکتر باشد');
//    } else{
//        setSuccess(email);
///        check=true;
////    }
//   return check;
//}

//checks  the  name box content
//const checkName = () => {
//boolean, defines rhe  correctnes at  th end
//    let check=false;
//    const nameValue = fname.value.trim(); //removing whitespace from end and begining
//    if (nameValue === ''){ //error if input is deleted(empty)
//        setError(fname,'نام نمی‌تواند خالی باشد');
//   }
//   else if(nameValue.length >255){//max 255 charachters
//        setError(fname,'نام باید کمتر از ۲۵۵ کاراکتر باشد');
//   } else{
//      setSuccess(fname);
//      check=true;
//  }
////   return check;
//}

//checks lastname box content
//const checkLName = () => {
//boolean, defnes the coorecteness at the end
//   let check=false;
//    const lnameValue = lname.value.trim(); //removing whitespace from end and begining
//    if (lnameValue === ''){ //error if input is deleted(empty)
//        setError(lname,'نام خوانوادگی نمی‌تواند خالی باشد');
//    }
//    else if(lnameValue.length >255){//max 255 charachters
//        setError(lname,'نام خوانوادگی باید کمتر از ۲۵۵ کاراکتر باشد');
//   } else{
//       setSuccess(lname);
//       check=true;
//   }
//   return check;
//}

//checks address bo  content
//const checkAddress = () => {
//boolean, defines correctness at the end
//    let check=false;
//address bax value without beginning or ending spaces
//    const addressValue = address.value;
//    if (addressValue === ''){ //error if input is deleted(empty)
//       setErrorAddress(address,'آدرس نمی‌تواند خالی باشد');
//   }
//   else if(addressValue.length >1000){//max 1000 charachters
//       setErrorAddress(address,'آدرس باید کمتر از ۱۰۰۰ کاراکتر باشد');
//   } else{
//       setSuccessAddress(address,"success");
//       check=true;
//   }
//   return check;
//}

//change state to erroneous=>red border and small message
const setError = (input, msg) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    //importanttt! changes all classes to main__from__mail error
    inputType.className = "main__form__mail error"
    small.innerText = msg
    console.log("err")
}
//const setErrorAddress = (input, msg) => {
//    const inputType = input.parentElement;
//    const small = inputType.querySelector('small');
//importanttt! changes all classes to main__from__mail error
//    inputType.className = 'main__form__address error';
//   small.innerText = msg;
//   console.log("err");

//}

//sets state to correct=> green border and no message
const setSuccess = (input) => {
    const inputType = input.parentElement
    const small = inputType.querySelector("small")
    inputType.className = "main__form__mail success"
}
// const setSuccessAddress = (input,msg) => {
//     const inputType = input.parentElement;
//     const small = inputType.querySelector('small');
//     inputType.className = 'main__form__address success';
//     small.innerText = msg;
// }

//checks email format by comparing tho regex
// function ValidateEmail(mail)
// {
//  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
//   {
//     return (true);
//   }
//     //alert("You have entered an invalid email address!")
//     return (false);
// }

// Get the modal
var modal = document.getElementById("myModal")

// Get the button that opens the modal
//the sign up button
var btn = document.getElementById("button")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

// When the user clicks the button, open the modal and display specified message
btn.onclick = function () {
    modal.style.display = "block"
    setMessage()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none"
    //setNewWindow();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
        //setNewWindow();
    }
}
// //vhanging the message displayed in modal
// function setMessage(){
//     //correctness of boxes
//     //finding number of falses
//     const validation_arr=[is_valid_mail,is_valid_pass,is_valid_name,is_valid_lname,is_valid_address];
//     let false_num=0;
//     for(let i=0;i<validation_arr.length;i++){
//         if(validation_arr[i]===false){
//             false_num++;
//         }
//     }

//     //value of the boxes
//     passValue=pass.value;
//     mailValue=email.value.trim();
//     nameValue=fname.value.trim();
//     lnameValue=lname.value.trim();
//     addressValue=address.value;

//     //if username doesnt alrady exist, dublicate_user=-1
//     let duplicate_user=user_pass_list.findIndex(duplicate_user=>duplicate_user.mail==mailValue);
//     modal_msg=document.getElementById('modal__msg');
//     //more than two boxes or wrong
//     if(false_num>1){
//         modal_msg.innerHTML='فیلدهای مشخص شده را کامل کنید';
//     }
//     //if only mail is invalid
//     else if(is_valid_mail==false){
//         modal_msg.innerHTML='فیلد ایمیل را کامل کنید';
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
//     //if user name and passowrd arent in the list
//     else if(duplicate_user>-1){
//         modal_msg.innerHTML='ایمیل قبلا ثبت شده‌است';
//     }
//     //username and password are correct and defined
//     else{
//         modal_msg.innerHTML='ثبت نام موفق';

//     }

// }
<<<<<<< HEAD

//set small message for boxes
function setMessage(){
    passValue=pass.value;
    mailValue=email.value.trim();
    nameValue=fname.value.trim();
    lnameValue=lname.value.trim();
    addressValue=address.value;
    modal_msg=document.getElementById('modal__msg');
=======
function setMessage() {
    passValue = pass.value
    mailValue = email.value.trim()
    nameValue = fname.value.trim()
    lnameValue = lname.value.trim()
    addressValue = address.value
    modal_msg = document.getElementById("modal__msg")
>>>>>>> origin/main
    fetch(`${window.origin}/signup/submit`, {
        method: "POST",
        body: JSON.stringify({
            first_name: nameValue,
            last_name: lnameValue,
            email: mailValue,
            password: passValue,
            address: addressValue,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("Cant signup with this data")
            return
        }
        response.json().then(function (data) {
            console.log(data)
            if (data["state"] == "success") {
                modal_msg.innerHTML = "ثبت نام موفق"
                window.location.replace("/main")
            } else if (data["state"] == "fail") {
                modal_msg.innerHTML = "ثبت نام ناموفق"
            } else if (data["state"] == "duplicate") {
                modal_msg.innerHTML = "کاربری با این ایمیل وجود دارد"
            }
        })
    })
}

<<<<<<< HEAD

//check pass box for every input
pass.addEventListener('keyup',(event)=>{
=======
pass.addEventListener("keyup", (event) => {
>>>>>>> origin/main
    //value of the boxes
    passValue = pass.value
    mailValue = email.value.trim()
    nameValue = fname.value.trim()
    lnameValue = lname.value.trim()
    addressValue = address.value
    fetch(`${window.origin}/signup`, {
        method: "POST",
        body: JSON.stringify({
            first_name: nameValue,
            last_name: lnameValue,
            email: mailValue,
            password: passValue,
            address: addressValue,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("Cant signup with this data")
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

///
<<<<<<< HEAD
 
//check email box at every input
email.addEventListener('keyup',(event)=>{
=======

email.addEventListener("keyup", (event) => {
>>>>>>> origin/main
    //value of the boxes
    passValue = pass.value
    mailValue = email.value.trim()
    nameValue = fname.value.trim()
    lnameValue = lname.value.trim()
    addressValue = address.value
    fetch(`${window.origin}/signup`, {
        method: "POST",
        body: JSON.stringify({
            first_name: nameValue,
            last_name: lnameValue,
            email: mailValue,
            password: passValue,
            address: addressValue,
        }),
        headers: new Headers({ "content-type": "application/json" }),
        cache: "no-cache",
    }).then(function (response) {
        if (response.status !== 200) {
            console.log(`bad request: ${response.status}`)
            window.alert("Cant signup with this data")
            return
        }
<<<<<<< HEAD
        response.json().then(function (data){
            console.log(data);
                if(data['mail']=="mail empty"){
                    setError(email,"ایمیل نمی‌تواند خالی باشد");
                }
                else if(data['mail']=="mail len invalid"){
                    setError(email,'');
                }
                else if(data['mail']=="mail invalid"){
                    setError(email,'ایمیل نامعتبر');
                }
                else{
                    setSuccess(email);
                }
            })
    });
}); 

//sigin button at the top
signin_btn=document.getElementById('signin_btn');
if(signin_btn != null){
  signin_btn.onclick=function(){
    window.location.replace('/signin');
  }
}
=======
        response.json().then(function (data) {
            console.log(data)
            if (data["mail"] == "mail empty") {
                setError(email, "ایمیل نمی‌تواند خالی باشد")
            } else if (data["mail"] == "mail len invalid") {
                setError(email, "")
            } else if (data["mail"] == "mail invalid") {
                setError(email, "ایمیل نامعتبر")
            } else {
                setSuccess(email)
            }
        })
    })
})

signin_btn = document.getElementById("signin_btn")
if (signin_btn != null) {
    signin_btn.onclick = function () {
        window.location.replace("/signin")
    }
}
>>>>>>> origin/main
