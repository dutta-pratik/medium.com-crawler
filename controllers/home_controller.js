const axios = require("axios");

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
            
            axios(url)
                .then(response => {
                    // console.log("resp", response);
                    const html = response.data;
                    // console.log("html",html);
                    // console.log($("article"));
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
