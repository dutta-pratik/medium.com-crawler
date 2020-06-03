
// let search = document.getElementById("submit");

// search.addEventListener("click", function(e){
//     e.preventDefault();
//     let formData = $("#tag");
//     console.log("Print");
//     $.ajax({
//         type: "post",
//         url: "/search",
//         data: formData.serialize(),
//         success: function(data){
//             console.log("sarchajax",data);
//         }, error: function(error){
//             console.log(error.responseText);
//         }
//     });
// });

{
    let search = function(){
        let searchData = $("#search-form");
        searchData.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: "post",
                url: "/search",
                data: searchData.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }


    search();
}