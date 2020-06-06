/********************Importing Package************************/
const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

/********************Controller FOR homepage************************/
module.exports.homePage = async function(req, res){
    try{
        return res.render("admin_panel");
    }catch(err){
        console.log("error in homepage");
    }
}

/********************Controller FOR search************************/
module.exports.search = async function(req, res){
    try{
        if(req.xhr){
            // console.log("tag",req.body);
            let tag = req.body.tag;
            let tagURL = `https://medium.com/tag/${tag}`;
            // console.log(tagURL);
            
            let browser = await puppeteer.launch();
            let page = await browser.newPage();
            await page.goto(tagURL, {
                waitUntil: 'networkidle2',
                timeout: 3000000
            });
            
            let data = await page.evaluate(() => {

                //fetching post
                let posts =  document.querySelectorAll("[data-action='open-post']");

                let postArr = [];
                
                for(let i=0; i<posts.length; i++){
                    let m = posts[i].getAttribute("href");
                    postArr.push(m);
                }

                let nonredArray = [];
                for(let i=0; i<postArr.length; i=i+2){
                   nonredArray.push(postArr[i]);
                }
                
                //fetching tags
                let tags = [];
                
                document.querySelectorAll("[data-action-source='related']").forEach((item, index) => {
                    // console.log("index",item);
                    tags.push(item.innerText);
                });
                
                
                return {
                    nonredArray,
                    tags
                }
            });

            // console.log("scrape", data);
            return res.status(200).json({
                data: data
            })
        }
    }catch(err){
        console.log("error in homepage", err);
    }
}

/********************Controller FOR crawlData************************/
module.exports.crawlData = async function(req, res){
    try{
        console.log("link",req.body);
        if(req.xhr){
            let link = req.body.link;
            // console.log("L", link);
           
            axios(link)
                .then(response => {
                    // console.log("resp", response);
                    const html = response.data;
                    const $ = cheerio.load(html);

                    //fetching title
                    const title = $('h1:first-child');
                    // console.log($(title).text());
                    let postTitle = $(title).text();

                    //fetching blog details
                    const details = $("section:nth-child(2) > div > div > div > div div > div > span:nth-child(2)");
                    // console.log($(details).text());
                    let postDetails = $(details).text();

                    //fetching author
                    const author = $("section:nth-child(2) > div > div > div > div div > div > div > div div > span > a");
                    // console.log($(author).text());
                    let postAuthor = $(author).text();
                    // console.log("html",html);

                    //fetching tags
                    const tagarr = [];
                    const tag = $("ul > li [href^='/tag']");
                    // console.log($(tag).text());
                    tag.each(e =>{
                        tagarr.push(tag[e].children[0].data);
                    });
                    // console.log(tagarr);

                    //fetching content
                    const content = $("section:nth-child(2) > div.n.p > div");
                    // console.log($(content).html());

                    //response text
                    const responseText = $("a[href^='https://medium.com/p'] span div");
                    // console.log("****************************", $(responseText).text());

                    //response Link
                    
                    return res.status(200).json({
                        data:{
                            link: link,
                            title: postTitle,
                            details: postDetails,
                            author: postAuthor,
                            tag: tagarr,
                            content: $(content).html(),
                            response: $(responseText).text()
                        },
                        message: "In here"
                    });
                })
                .catch(console.error);
        }
    }catch(err){
        console.log("error in homepage", err);
    }
}
