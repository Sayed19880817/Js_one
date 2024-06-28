
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productsContainer = [];


if(localStorage.getItem('myProduct') != null)
    {
        productsContainer = JSON.parse(localStorage.getItem('myProduct'))
        displayProduct(productsContainer);
    }
else
{
    productsContainer = [];
}

function addproduct (){

    if(validateProductName() == true)
    {
        var product = {
            name: productNameInput.value ,
            price: productPriceInput.value ,
            category: productCategoryInput.value ,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        localStorage.setItem('myProduct',JSON.stringify(productsContainer));
        clearFrom();
        displayProduct(productsContainer);
    }
    else
    {
        alert("productName invalid")
    }

}
function clearFrom(){

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProduct(List) {
    var cartoona = ``;
    for (var i = 0 ; i < List.length; i++) {
        cartoona +=`<tr>
                <td>${i}</td>
                <td>${List[i].name}</td>
                <td>${List[i].price}</td>
                <td>${List[i].category}</td>
                <td>${List[i].desc}</td>
                <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">update</button></td>
                <td><button onclick="deleteProducts(${i})" class="btn btn-danger">delete</button></td>
            </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function searchProducts(searchTerm) {
    var searchResult = [];
    for(var i =0 ; i <productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true )
        {
           searchResult.push(productsContainer[i]);
        }
    }
    displayProduct(searchResult)
}
function deleteProducts(deletedIndex)  {
    productsContainer.splice(deletedIndex,1);
    localStorage.setItem('myProduct',JSON.stringify(productsContainer));
    displayProduct(productsContainer);
    
}
function setFormForUpdate(updatedIndex) {
    productNameInput.value = productsContainer[updatedIndex].name;
    productPriceInput.value = productsContainer[updatedIndex].price;
    productCategoryInput.value = productsContainer[updatedIndex].category;
    productDescInput.value = productsContainer[updatedIndex].desc;
    
    updateBtn.classList.replace('d-none' , 'd-inline-block');
    addBtn.classList.add('d-none');

}

function validateProductName() {

    var regex = /^[A-Z][a-z]{3,8}$/;
    if( regex.test(productNameInput.value) == true)
    {
        productNameInput.classList.replace('is-invalid' , 'is-valid')
        return true;
    }
    else
    {
        productNameInput.classList.add('is-invalid')
        return false;
    }
}











