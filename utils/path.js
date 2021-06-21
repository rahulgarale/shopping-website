const path=require('path');


//this will return main folder path in which app.js or starting file is avaliable in out case its
//D:\personal\Node-Practice\Node-Maxmillan-tut\working with Express\handling_routes_with_express
module.exports=path.dirname(require.main.filename);
