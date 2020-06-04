const axios = require("axios");
const cheerio = require("cheerio");

module.exports.homePage = async function(req, res){
    try{
        return res.render("admin_panel");
    }catch(err){
        console.log("error in homepage");
    }
}

module.exports.search = async function(req, res){
    try{

        
        if(req.xhr){
            console.log(req.body);
            const url = "https://medium.com/hackernoon/the-future-of-cyber-security-in-the-fintech-era-78b9d7f7c0f0";
            const url1 = "https://medium.com/@shenequagolding/maintaining-professionalism-in-the-age-of-black-death-is-a-lot-5eaec5e17585";
            axios(url1)
                .then(response => {
                    // console.log("resp", response);
                    const html = response.data;
                    const $ = cheerio.load(html);

                    //fetching title
                    const title = $('h1:first-child');
                    console.log($(title).text());

                    //fetching blog details
                    const details = $("section:nth-child(2) > div > div > div > div div > div > span:nth-child(2)");
                    console.log($(details).text());

                    //fetching author
                    const author = $("section:nth-child(2) > div > div > div > div div > div > div > div div > span > a");
                    console.log($(author).text());
                    // console.log("html",html);

                    //fetching tags
                    const tagarr = [];
                    const tag = $("ul > li [href^='/tag']");
                    console.log($(tag).text());
                    tag.each(e =>{
                        tagarr.push(tag[e].children[0].data);
                    });
                    console.log(tagarr);

                    //fetching content
                    const content = $("section:nth-child(2) > div.n.p > div");
                    console.log($(content).text());

                    //response text
                    const responseText = $("a[href^='https://medium.com/p'] span div");
                    console.log("****************************", $(responseText).text());

                    //response Link

                    // return res.status(200).json({
                    //     data:{
                    //         data: html
                    //     },
                    //     message: "In here"
                    // });
                })
                .catch(console.error);

            
        }
    }catch(err){
        console.log("error in homepage", err);
    }
}
