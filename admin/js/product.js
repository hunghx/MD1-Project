//
let listCategories = JSON.parse(localStorage.getItem("list-category")) || [];
let listProducts = JSON.parse(localStorage.getItem("list-product")) || [];

/*
{
id,
name,
description,
images,
price,
createdDate,
status,
categoryId
}
*/
function showFormCreate() {
  let string = "";
  for (let i = 0; i < listCategories.length; i++) {
    const element = listCategories[i];
    string += `<option value="${element.id}">${element.name}</option>`;
  }
  $("#category_id").html(string);
}

function handleAddProduct() {
  let id = 1;
  if (listProducts.length > 0) {
    id = listProducts[listProducts.length - 1].id + 1;
  }
  let name = $("#product_name").val();
  let images = [];
  let price = $("#price").val();
  let description = $("#description").val();
  let status = $("#status").val();
  let categoryId = $("#category_id").val();
  let date = new Date();
  let createdDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let newProduct = {
    id,
    name,
    images,
    price,
    description,
    createdDate,
    status,
    categoryId,
  };
  listProducts = [...listProducts, newProduct];
  localStorage.setItem("list-product", JSON.stringify(listProducts));
  show(listProducts);
}
// tìm kiêm p tử theo id
function findById(id) {
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].id == id) {
      return listProducts[i];
    }
  }
}

function handleEdit(idPro) {
  let string = "";
  for (let i = 0; i < listCategories.length; i++) {
    const element = listCategories[i];
    string += `<option value="${element.id}">${element.name}</option>`;
  }

  $("#category_id_update").html(string);
  let productEdit = findById(idPro);
  $("#id_edit").val(productEdit.id);
  $("#product_name_update").val(productEdit.name);
  $("#price_update").val(productEdit.price);
  $("#description_update").val(productEdit.description);
  $("#status_update").val(productEdit.status);
  $("#category_id_update").val(productEdit.categoryId);
}

function handleUpdate() {
  let id = $("#id_edit").val();
  let name = $("#product_name_update").val();
  let images = [];
  let price = $("#price_update").val();
  let description = $("#description_update").val();
  let status = $("#status_update").val();
  let categoryId = $("#category_id_update").val();
  let date = new Date();
  let createdDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let updateProduct = {
    id,
    name,
    images,
    price,
    description,
    createdDate,
    status,
    categoryId,
  };
  //   let updateListProduct = listProducts.map((product)=>{
  //     if(product.id !== id){
  //         return product
  //     }else{
  //         return updateListProduct
  //     }

  //   })
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].id == id) {
      listProducts[i] = updateProduct;
      break;
    }
  }
  localStorage.setItem("list-product", JSON.stringify(listProducts));
  show(listProducts);
}

function show(list) {
  let string = "";

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    let categoryName = getCategoryNameById(element.categoryId);
    string += ` <tr>
        <td>${i + 1}</td>
        <td>${element.name}</td>
        <td><img src="" width="30%" alt="#"></td>
        <td>${element.description}</td>
        <td>${element.createdDate}</td>
        <td>${element.price} $</td>
        <td>${element.status === "1" ? "Còn hàng" : "Hết hàng"}</td>
        <td>${categoryName}</td>
        <td>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal"
            data-bs-target="#modalUpdate" onclick="handleEdit('${
              element.id
            }')">Edit</button>
        </td>
        <td>
            <button type="button" class="btn btn-danger">Delete</button>
        </td>
    </tr>`;
  }
  $("tbody").html(string);
}
show(listProducts);

function getCategoryNameById(id) {
  for (let i = 0; i < listCategories.length; i++) {
    if (listCategories[i].id == id) {
      return listCategories[i].name;
    }
  }
  return "";
}
