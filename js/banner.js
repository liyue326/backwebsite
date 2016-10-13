//添加banner函数
$(document).on('click','#banner_add',function(){
    var table = $('.table');
    table.html('');
    var panel_he = $(".panel-heading");
    panel_he.html('');
    panel_he.append("添加Banner");
    table.append("<tr><td>Position</td><td><input class='form-control' id='position'type='text' value=''></td></tr>" +
        "<tr><td>Title</td><td><input class='form-control' id='title' type='text' value=''></td></tr>" +
        "<tr><td>Url</td><td><input class='form-control' id='url' type='text' value=''></td></tr>" +
        "<tr><td>Img</td><td><input class='form-control' id='img' type='text' value=''></td></tr>"+
        "<tr><td ><input type='submit' class='btn btn-primary' id='btn_add'></td></tr>"
    );
});
$(document).on('click','#btn_add',function(){
    var posi=$('#position').val();
    var tit=$('#title').val();
    var ur=$('#url').val();
    var im=$('#img').val();
    if(posi==''){
        alert("请输入position");
        return false;
    }
    if(tit==''){
        alert("请输入title");
        return false;
    }
    if(im==''){
        alert("请输入img");
        return false;
    }
    if(ur==''){
        alert("请输入url");
        return false;
    }
    ban_add();
});
function ban_add() {
    var position=0;
    var img =$('#banner_add').attr("src");
    var url = window.location.href;
    var title =$('#banner_add').attr("title");
    $.ajax({
        type: "POST",
        url: "../api/banner/add.php",
        data: {position:position,title: title, url: url, img: img},
        datatype: "json",
        success: function (data) {
            var json = JSON.parse(data);
            if (json.error == 0) {
                alert("新增banner成功");
            } else {
                alert("失败");
            }
        },
        error: function () {
            alert("失败");
        }
    })
}
//删除banner函数
$(document).on('click','.banner_del',function(dom){
    ban_del();
});
function ban_del(dom) {
    //var temp=$(".banner_del")
    //temp=$(dom).attr('banner_id');
    var banner_id = $(".tr_del").attr("banner_id");
    alert(banner_id);
    $.ajax({
        type: "POST",
        url: "../api/banner/delete.php",
        data: {banner_id: banner_id},
        datatype: "json",
        success: function (data) {
            var json = JSON.parse(data);
            if (json.error == 0) {
                alert("删除banner成功");
                $(this).parent().parent().remove();
            } else{
                alert(data);
                alert("删除banner失败");
            }
        },
        error: function () {

            alert("失败");
        }
    })
}
//banner 列表函数
ban_list();
$(document).on('click','#banner_list',function(){
    ban_list();
});
function ban_list(){
    var table = $('.table');
    var panel_he = $(".panel-heading");
    panel_he.html('');
    panel_he.append("Banner列表");
    table.html('');
    table.append('<tr class="tr_del" ><td>banner_id</td><td>position</td><td>img</td><td>title</td><td>url</td><td>status</td></tr>');
    window.offset=0;
    window.number=5;
    window.position=0;
    $.ajax({
        type:"POST",
        url:"../api/banner/list.php",
        data:{position:window.position,offset:window.offset,number:window.number},
        datatype:"json",
        success:function(data){
            var json=JSON.parse(data);
            if(json.error==0){
                var result=json.data;
                if(result.length==0){
                    alert("没有数据");
                }else{
                    for(var i=0;i<result.length;i++){
                        var item=result[i];
                        table.append('<tr><td>' + item.banner_id + '</td><td>' + item.position + '</td><td><img style="width:20px;height:20px;"src='+item.img+'></td><td>' + item.title + '</td><td>' + item.url + '</td><td>' + item.status + '</td><td><button  banner_id="'+item.banner_id+'" class="btn banner_del btn-success" onclick="del_banner(this)" >delete</button></td></tr>')

                    }
                }
            }else{
                alert("失败");
            }

        },
        error:function(){

        }
    })
}

function del_banner(dom)
{
    $(dom).attr('banner_id');
}
//更新banner函数
function banner_update(){
    var banner_id=$("#header_img").attr("id");
    $.ajax({
        type:"POST",
        url:"../api/banner/update.php",
        data:{banner_id:banner_id},
        datatype:"json",
        success:function(data){
            var json=JSON.parse(data);
            if(json.error==0){
                alert("修改banner成功");
            }else{
                alert("修改banner失败");
            }
        },
        error:function(){
            alert("修改失败");
        }

    })
}
