
var productName = document.getElementById("name");
var productUrl = document.getElementById("url");
var modal = document.getElementById("exampleModal");
var addBtn = document.getElementById("addBtn");

var productContainer;

if (localStorage.getItem('Book Market')) {
    productContainer = JSON.parse(localStorage.getItem('Book Market'));
    displayBook(productContainer);
}
else {
    productContainer = [];
}

function addBook() {
    if (valideProductName(productName.value) && valideProductUrl(productUrl.value)) {
        var product = {
            name: productName.value,
            url: productUrl.value
          
        }
        productContainer.push(product);
        localStorage.setItem('Book Market', JSON.stringify(productContainer));
        clearForm();
        displayBook(productContainer);
        addBtn.removeAttribute("data-bs-toggle");
        addBtn.removeAttribute("data-bs-target");
    } else {
        addBtn.setAttribute("data-bs-toggle", "modal");
        addBtn.setAttribute("data-bs-target", "#exampleModal");

        clearForm();


    }

}


function clearForm() {
    productName.value = '';
    productUrl.value = '';
}


function displayBook(arr) {
    var cartonaa = ``;
    for (var i = 0; i < arr.length; i++) {
        cartonaa +=
            `
            <tr>
            <td>${i + 1}</td>
            <td>${arr[i].name}</td>
            <td><button  class=" btn1  btn-sm" onclick="location.href='${arr[i].url}'" target="_blank" >
            <i class="fa-regular fa-eye" "></i>
            Visit</button></td>
            <td><button onclick='deleteBook(${i})' class=" btn2  btn-sm">
            <i class="fa-solid fa-trash-can"></i>
            Delete</button></td>
            </tr>
        `
       
    }
    tableBody.innerHTML = cartonaa;
}



function deleteBook(deleteIndex) {
    productContainer.splice(deleteIndex, 1);
    localStorage.setItem('Book Market', JSON.stringify(productContainer));
    displayBook(productContainer);
}


function valideProductName(name) {
    var regex = /^([A-z0-9]{3,}(([A-z0-9])?)+)((\s[A-z0-9])?|(\s[A-z0-9]{1,})+)$/;
    if (regex.test(name)) {
        productName.classList.replace('is-invalid', 'is-valid');
        return true;
    } else {
        productName.classList.add('is-invalid');
        return false;
    }
}
// ^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$
function valideProductUrl(name) {
    var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (regex.test(name)) {
        productUrl.classList.replace('is-invalid', 'is-valid');
        return true;
    } else {
        productUrl.classList.add('is-invalid');
        return false;
    }
}