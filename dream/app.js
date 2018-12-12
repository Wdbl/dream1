const express=require("express");
const http=express();
const dbb=require("./js/db.js");
const db=new dbb("dream");
const bodyParser=require("body-parser");
const postparser=bodyParser.urlencoded({extended:false})

//跨域
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*")
	next()
})

//添加
http.post("/add",postparser,(req,res)=>{
	var data=req.body;
		db.insertOne("list",data,function(err){
			if(err) throw err
			res.send("添加成功")
		})
})

//渲染页面
http.get("/msg",(req,res)=>{
	var obj={
		query:{},
		limit:8
	}
	db.find("list",obj,function(err,data1){
		if(err)throw err
		res.send(data1)
	})
})


//删除
http.post("/del",postparser,(req,res)=>{
	var id=req.body.id
	console.log(id)
	db.deleteById("list",id,function(err){
		if(err) throw err
		res.send("删除成功")
	})
})

//
http.post("/colo",postparser,(req,res)=>{
	var id=req.body.id;
	db.findById("list",id,function(err,data){
		if (err) {
			res.send("渲染失败")
		} else{
			console.log(data)
			data.bala=data.bala?0:1;
			db.updateById("list",id,data,function(err){
				if (err) {
					res.send("变色失败")
				}else{
					res.send("变色成功")
				}
					
			})
		}
	})
})

http.listen(8080,()=>{
	console.log("run")
})
