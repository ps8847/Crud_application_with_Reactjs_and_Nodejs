const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
	host: "localhost",
	user:"root",
	password: "",
	database: "curd_contact"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/get" , (req,res) => {
	const sqlsel = "SELECT * from contact_db";
	db.query(sqlsel , (err,result) => {
		res.send(result);
	})
})

app.post("/api/post" , (req,res) => {
	const {name , email , contact} = req.body;
	const sqlInsert = "INSERT INTO contact_db (name , email , contact) VALUES (? , ? , ?)";
	db.query(sqlInsert , [name , email , contact] , (error , results) => {
		if(error){
			console.log(error);
		}
	})
})

app.delete("/api/remove/:id" , (req,res) => {
	const {id} = req.params;
	const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
	console.log(sqlRemove);
	db.query(sqlRemove , [id] , (error , results) => {
		if(error){
			console.log(error);
		}
	})
})


app.get("/api/view/:id" , (req,res) => 
{
	const {id} = req.params;
	const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
	db.query(sqlGet , [id] , (error , results) => 
	{
		if(error)
		{
			console.log(error);
		}
		res.send(results);
	})
})

app.put("/api/update/:id" , (req,res) => {
	const {id} = req.params;
	const {name , email , contact} = req.body;
	const sqlupdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
	console.log(sqlupdate);
	db.query(sqlupdate , [name, email, contact, id] , (error , results) => {
		if(error){
			console.log(error);
		}
		res.send(results);
})
})

app.get('/' , (req,res) => {

	res.send("hello server");
})

app.listen(5000 , () => {
	console.log('server is running at port 5000');
})