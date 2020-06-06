


{
/********************Search Links and Tags************************/

    let search = function(){
        
        let searchData = $("#search-form");
        searchData.submit(function(e){
            e.preventDefault();
            // console.log("II");
            
            $.ajax({
                type: "post",
                url: "/search",    
                data: searchData.serialize(),
                success: function(data){
                    cleardata();
                    // console.log(data.data.nonredArray[0]);
                    // console.log(data);
                    let tags = data.data.tags;
                    if(data.data.nonredArray.length > 0){
                        for(let i=0; i<data.data.nonredArray.length; i++){
                            crawlData(data.data.nonredArray[i]);
                        }
                    }
                    //related tags
                    
                    // console.log(data.data.tags[0]);
                    for(let i=0;i<tags.length;i++){
                        // console.log(tags[i]);
                        let tag = renderTag(tags[i]);
                        $(".tags").append(tag);
                    }
                    
                    return;
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }


/********************Crawl Data************************/

    let crawlData = function(link){
        // console.log("crawl");
        // console.log(link);
        linkSplit = link.split("?");
        // console.log(linkSplit);
        link = {
            link : linkSplit[0]
        }
        $.ajax({
            type: "post",
            url: "/crawldata",
            // dataType: "text/plain",
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


/********************Clear DOM************************/

    let cleardata = function(){
        document.querySelectorAll(".post-list").forEach((item, index) => {
            // console.log("item",item);
            item.innerHTML = "";
            // console.log(item);
        });
        document.querySelectorAll("#suggested-tag").forEach((item,index) => {
            item.innerHTML = "";
        });
    }

    let renderTag = function(tag){
        return $(`
            <span> <code id="suggested-tag" class="${tag}"> ${tag} </code>&nbsp;
            &nbsp; </span> 
        `);
    }


    
/********************Rendering Blogs************************/

    let renderPost = function(data){
        return $(
            `<li id="posts">
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
                        Link: <a href="${data.link}" target="_blank">Click here</a> 
                    </div>
                </div>
            </li>
            <br>
            `
        );
    }

    search();
}