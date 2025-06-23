function open_login(){
    $("#login-page").css("display","block");
}

function open_register(){
$("#register-page").css("display","block");
}


// $(document).ready(function() {
// $("#s-register").click(function(event){
//   let flag=false
//     $(".must-fill").each(function(){
//         if ($(this).val().trim() == ""){
//             flag=true;
//         }
//     });
//     if(flag){
//           event.preventDefault();
//           alert("Fill All Fields");
//     }
//   });
//   });