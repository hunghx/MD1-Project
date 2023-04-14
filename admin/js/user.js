/*
user{
    id,
    username,
    password,
    avatar,
    fullname,
    phonenumber,
    address,
    email,
    sex,
    status,
    role(admin/customer)
}
*/
let listusers = JSON.parse(localStorage.getItem("list-user")) || [];

$("form").submit(function (e) {
  e.preventDefault();
  let username = $("#username").val();
  console.log(checkUsernameExist(username));
  if (!checkUsernameExist(username)) {
    alert("username đã tồn tại vui lòng nhập tên khác");
    return;
  }
  let fullname = $("#fullname").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let rePassword = $("#confirm_password").val();
  if (password !== rePassword) {
    alert("mật khẩu không trùng khớp");
    return;
  }
  let id = listusers.length === 0 ? 1 : listusers[listusers.length - 1].id + 1;
  //  thêm tài khoản local
  // tạo 1 đối tượng user
  let status = true;
  let role = id === 1 ? "ADMIN" : "CUSTOMER";
  let newUser = {
    id,
    username,
    fullname,
    email,
    password,
    phonenumber: null,
    address: null,
    sex: null,
    status,
    role,
  };
  listusers = [...listusers, newUser];
  localStorage.setItem("list-user", JSON.stringify(listusers));
  alert("đăng kí thành công");
  // chuyển sang trang đăng nhập
  window.location = "login.html";
});

function checkUsernameExist(usernamecheck) {
  console.log(usernamecheck);
  let check = false;
  listusers.forEach(function (item) {
    console.log(item.username);
    if (item.username === usernamecheck) {
      check = true;
    }
  });
  if (check) {
    return false;
  }
  return true;
}
