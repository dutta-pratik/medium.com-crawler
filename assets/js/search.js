
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
            console.log("II");
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

    

    let crawlData = function(link){
        $.ajax({
            type: "get",
            url: "/crawldata",
            data: link,
            success: function(data){
                 // console.log(data);
                 let blog = renderPost(data.data);
                 $('.post-list').append(blog);
            }, error: function(err){
                console.log(err.responseText);
            }
        });
    }


    let renderPost = function(data){
        return $(
            `<li>
                <div>
                    <div>
                        <strong>${data.title}</strong>
                    </div>
                    <div>
                        Author: ${data.author}
                    </div>
                    <div>
                        Details: ${data.details}
                    </div>
                    <div>
                        <code>${data.tag}</code>
                    </div>
                    <div>
                        Link: <a href="${data.link}">Click here</a> 
                    </div>
                </div>
            </li>
            `
        );
    }

    search();
}