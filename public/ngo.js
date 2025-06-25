function open_login(){
    $(".register").css("display","none");
    $(".login").css("display","block");
}

function open_register(){
$(".register").css("display","block");
$(".login").css("display","none");

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