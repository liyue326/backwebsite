list();
$(document).on("click", "#user_list", function () {
    list();
});
function list() {
    window.offset = 0;
    window.number = 5;
    var table = $('.table');
    var panel_he = $(".panel-heading");
    panel_he.html('');
    panel_he.append("用户管理");
    table.html('');
    table.append('<tr><td>管理员ID</td><td>用户名</td><td>密码</td><td>类型</td><td>时间</td><td>操作</td></tr>');
    $.ajax({
        type: "POST",
        url: "../api/manager/list.php",
        data: {offset: window.offset, number: window.number},
        datatype: "json",
        success: function (data) {
            var json = JSON.parse(data);

            if (json.error == 0) {
                //todo
                var result = json.data;

                if (data.length == 0) {
                    alter('没有更多数据！');
                } else {
                    for (var i = 0; i < result.length; i++) {
                        var item = result[i];
                        table.append('<tr><td>' + item.manager_id + '</td><td>' + item.name + '</td><td>' + item.pwd + '</td><td>' + item.type + '</td><td>' + item.time + '</td><td><button class="btn btn_del btn-success" manager_id="">delete</button></td></tr>')

                    }
                }

            } else {
                alert('系统异常！');
            }

        },
        error: function () {
            alert("失败");
        }
    });
}
//添加用户函数
$(document).on("click", "#add_user", function () {
    var table = $('.table');
    table.html('');
    var panel_he = $(".panel-heading");
    panel_he.html('');
    panel_he.append("添加用户");
    table.append("<tr><td>用户名</td><td><input class='form-control' id='name'type='text' value=''></td></tr>" +
        "<tr><td>密码</td><td><input class='form-control' id='password' type='text' value=''></td></tr>" +
        "<tr><td>权限等级</td><td><select value=''><option value='3'>低</option><option value='2'>中</option><option value='1'>高</option></select></td></tr>" +
        "<tr><td colspan='2'><input type='submit' class='btn  btn-primary' id='btn_add'></td></tr>"
    );
});
$(document).on("click", "#btn_add", function () {
    add_user();
});
function add_user() {
    var btn = $("#btn_add");
    var password = $('#password').val();
    var name = $('#name').val();
    var type = $('#select').val();
    if (name == "") {
        alert("请输入用户名");
        return false;
    }
    if (password == "") {
        alert("请输入密码");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "../api/manager/add.php",
        data: {name: name, pwd: password, type: type},
        datatype: "json",
        success: function (data) {
            var json = JSON.parse(data);
            if (json.error == 0) {
                alert("成功");

            } else {
                alert("失败");
            }
        },
        error: function () {
            alert("再次失败");
        }
    });
}
//删除用户函数
//$('').attr('banner_id','3');
//
//$('').attr('banner_id);
$(document).on("click", ".btn_del", function () {
    del();
    $(this).parent().parent().remove();
});
function del() {
    var manager_id = $('.btn_del').attr('manager_id');
    $.ajax({
        type: "POST",
        url: "../api/manager/delete.php",
        datatype: "json",
        data: {manager_id: manager_id},
        success: function (data) {
            var json = JSON.parse(data);
            if (json.error == 0) {
                alert("删除用户成功");

            } else {
                alert("删除用户失败");
            }
        },
        error: function () {
            alert("失败");
        }
    })
}