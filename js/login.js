
$(document).on('click', '#login_btn', function () {
    test();
});
var btn = $("#login_btn");
var btn1 = $("#login_btn1")
btn.hover(function () {
    btn.css("font-size", "16px");
}, function () {
    btn.css("font-size", "14px");
});
btn1.hover(function () {
    btn1.css("font-size", "16px");
}, function () {
    btn1.css("font-size", "14px");
});
function test() {
    var password = $('#password').val();
    var name = $('#name').val();
    //判断用户名不得为空
    if (name == '') {
        alert('请输入用户名');
        return false;
    }
    //判断密码不得为空
    if (password == '') {
        alert('请输入密码');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "../api/admin/login.php",
        data: {name: name, pwd: password},
        datatype: "json",
        success: function (data) {
           var result = JSON.parse(data);
            if (result.error == 0) {
              window.location.href="index.html";
            } else {
                alert("失败");
            }
        },
        error: function (data) {
            var result = JSON.parse(data);
            if (result.error != 0) {
                alert("失败");
            }
        }
    });
}
