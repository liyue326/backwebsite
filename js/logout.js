$(document).on("click","#logout_li",function(){
    logout();
});
var logout_li=$("#logout_li");
//logout_li.click=function(){
//    logout();
//};
function logout(){
    $.ajax({
        type:"POST",
        url:"../api/admin/logout.php",
        datatype:"json",
        success:function(data){
            var json=JSON.parse(data);
            if(json.error==0){
               window.location.href="login.html";
            }else{
                alert("退出失败");
            }
        },
        error:function(){
            alert("失败");
        }
    })
}
