let listusers = JSON.parse(localStorage.getItem("list-user")) || [];

$("form").submit((e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $("#password").val();
  if (checkLogin(username, password)) {
    alert("đăng nhập thành công");
    let user = JSON.parse(localStorage.getItem("user-login"));
    if (user.role === "ADMIN") {
      // trang admin
      window.location = "./index.html";
    } else {
      if (user.status === true) {
        // cho đăng nhập
      } else {
        // chuyển hướng trang
      }
      // trang người dùng
      window.location = "../user/index.html";
    }
  } else {
    alert("sai thông tin tài khoản hoặc mật khẩu");
  }
});

function checkLogin(username, password) {
  let check = false;
  listusers.forEach((element) => {
    if (element.username === username && element.password === password) {
      check = true;
      // lưu thông tin tài khoả đang đăng nhập vào localstorage
      localStorage.setItem("user-login", JSON.stringify(element));
    }
  });
  return check;
}
