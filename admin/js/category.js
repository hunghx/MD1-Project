// let listCategories = [
//   {
//     id: 1,
//     name: "Quần",
//     description: "Quần hoa",
//     createdDate: "10/4/2023",
//     status: true,
//   },
//   {
//     id: 2,
//     name: "Áo",
//     description: "Áo hoa",
//     createdDate: "10/4/2023",
//     status: true,
//   },
//   {
//     id: 3,
//     name: "Giày",
//     description: "Giày hoa",
//     createdDate: "10/4/2023",
//     status: true,
//   },
//   {
//     id: 4,
//     name: "Trang sức",
//     description: "Dồ trang sức",
//     createdDate: "10/4/2023",
//     status: true,
//   },
// ];
let listCategories = JSON.parse(localStorage.getItem("list-category")) || [];
//CRUD
// create
function createCategory() {
  let idNew;
  // tạo id tự tăng
  if (listCategories.length == 0) {
    idNew = 1;
  } else {
    idNew = listCategories[listCategories.length - 1].id + 1;
  }
  let name = $("#category").val();
  let description = $("#description").val();
  //   console.log(name, description);
  let date = new Date();
  //   console.log(date);

  let createdDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  let newCategory = { id: idNew, name, description, createdDate, status: true };
  // thêm vào mảng
  listCategories = [...listCategories, newCategory];
  localStorage.setItem("list-category", JSON.stringify(listCategories));
  show(listCategories);
  $("#category").val("");
  $("#description").val("");
}

// show list
function show(list) {
  let string = "";
  for (let i = 0; i < list.length; i++) {
    string += `<tr>
      <td>${i + 1}</td>
      <td>${list[i].name}</td>
      <td>
      ${list[i].description}
      </td>
      <td>${list[i].createdDate}</td>
      <td>
          <button type="button" class="btn btn-warning" data-bs-toggle="modal"
          data-bs-target="#modalUpdate" onclick="handleEdit('${
            list[i].id
          }')">Edit</button>
      </td>
      <td>
          <button type="button" class="btn btn-danger" onclick="deleteCategory('${
            list[i].id
          }')">Delete</button>
      </td>
  </tr>`;
  }
  //   let string = list.map(
  //     (cat, index, arr) =>
  //       `<tr>
  //     <td>${index + 1}</td>
  //     <td>${cat.name}</td>
  //     <td>
  //     ${cat.description}
  //     </td>
  //     <td>${cat.createdDate}</td>
  //     <td>
  //         <button type="button" class="btn btn-warning">Edit</button>
  //     </td>
  //     <td>
  //         <button type="button" class="btn btn-danger">Delete</button>
  //     </td>
  //     </tr>`
  //   );
  $("tbody").html(string);
}
show(listCategories);
// hiển thị dữ liệu lên forrm edit
function handleEdit(idCate) {
  let catEdit = findById(idCate);
  $("#id_update").val(catEdit.id);
  $("#category_update").val(catEdit.name);
  $("#description_update").val(catEdit.description);
}
// cập nhật lại
function updateCategory() {
  let idUpdate = $("#id_update").val();
  let name = $("#category_update").val();
  let description = $("#description_update").val();
  for (let i = 0; i < listCategories.length; i++) {
    if (listCategories[i].id == idUpdate) {
      listCategories[i].name = name;
      listCategories[i].description = description;
      break;
    }
  }

  show(listCategories);
  localStorage.setItem("list-category", JSON.stringify(listCategories));
}

// tìm kiếm phần tử theo id
function findById(id) {
  for (let i = 0; i < listCategories.length; i++) {
    if (listCategories[i].id == id) {
      return listCategories[i];
    }
  }
}
// delete by id
function deleteCategory(id) {
  let listUpdate = listCategories.filter((cat) => cat.id != id);
  listCategories = [...listUpdate];
  show(listCategories);
  localStorage.setItem("list-category", JSON.stringify(listCategories));
}

// tìm kiếm tương đối theo tên
$("#submit").click(function (e) {
  e.preventDefault();
  let searchName = $("#search").val();
  let listSearch = listCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchName.toLowerCase())
  );
  show(listSearch);
});
