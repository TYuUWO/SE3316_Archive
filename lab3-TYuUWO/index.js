const express = require('express');
const newConnection = require('./DBConnection'); //sql connection class

const app = express();

// serve static contents
app.use(express.static('static'));
app.use(express.urlencoded({
  extended: true
}))

// dynamic handling

var userAdmin = false;
const adminUser = "admin";
const adminPass = "admin";
var editRow = 0;
var timeslots = ["timeslot1","timeslot2","timeslot3","timeslot4","timeslot5","timeslot6","timeslot7","timeslot8","timeslot9","timeslot10"];
var testrow = [0,0,0,0,0,0,0,0,0,0];
var testname = "testname";

var conn = newConnection();
//delete existing table
conn.query(`DROP TABLE Timetable`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )
//initialize db with data
conn.query(`CREATE TABLE Timetable(Name varchar(100),Timeslot1 varchar(100),Timeslot2 varchar(100),Timeslot3 varchar(100),Timeslot4 varchar(100),Timeslot5 varchar(100),Timeslot6 varchar(100),Timeslot7 varchar(100),Timeslot8 varchar(100),Timeslot9 varchar(100),Timeslot10 varchar(100))`
, (err,rows,fields) => {
  if (err)
    console.log(err);
  else
    console.log('Table Created');
  })
//(Name,Timeslot1,Timeslot2,Timeslot3,Timeslot4,Timeslot5,Timeslot6,Timeslot7,Timeslot8,Timeslot9,Timeslot10)
conn.query(`INSERT INTO Timetable VALUES('Name',"timeslot1","timeslot2","timeslot3","timeslot4","timeslot5","timeslot6","timeslot7","timeslot8","timeslot9","timeslot10")`
, (err,rows,fields) => {
  if (err)
    console.log(err);
  else
    console.log('Table Initialized');
  })

var tableRows = (conn.query(`SELECT COUNT(*) FROM Timetable`), (err,rows,fields) => {
  if (err)
    console.log(err);
  else
    console.log('Table Counted');
  });
if (tableRows != 1){
  console.log("Error: initialization failed");
}
conn.end();

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/static/index.html')
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
  var username = req.body.user;
  var password = req.body.pass;
  var message = "Access Denied";
  if (username == "admin"&&password == "admin"){
    message = "Admin access granted";
    userAdmin = true;
  }
  res.send(message + "<br><a href=\"/Admin\">continue</a>"); //add code following admin access
});

app.get('/Guest', (req,res) => {
  //initialize content with admin login link at the top
  if (userAdmin) {
    res.redirect("/Admin");
  }
  //create header row
  var content = "<div> <table> <tr> <th>Name</th>";
  for (var i = 0; i<10; i++) {
    content += "<th>"+timeslots[i]+"</th>";
  }
  content += "</tr>"
  //insert rows of entries
  var ttList
  var conn = newConnection();
  conn.query("SELECT * FROM Timetable WHERE Name<>'Name'", (err,rows,fields) => {

      if (err)
          response.send('ERROR: ' +err)
      else
      {
          ttList = rows;
          console.log(ttList);
          console.log(JSON.parse(JSON.stringify((ttList))));
          console.log(typeof JSON.parse(JSON.stringify((ttList))));
          //create display with table rows
          for (t of ttList)
          {
              content += '<tr><td>';
              content += t.Name+"</td>";
              //create checkboxes
              if (t.Timeslot1==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot2==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot3==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot4==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot5==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot6==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot7==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot8==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot9==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot10==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              content += '</tr>'
          }
          content += "</tr> </table> </div>";
          content += "<br><a href=\"/post\">post as guest</a>";
          conn.end();
          res.send(content);
      }
  })
});

app.get('/post', (req, res) => {
  res.sendFile(__dirname + '/static/post.html');
});

app.post('/post', (req,res) => {
   var toSend = "<p>saved</p><br><a href=\"Guest\">return</a>";
   var test1 = req.body.timeslot1 ? testrow[0] = 1 : testrow[0] = 0;
   var test1 = req.body.timeslot2 ? testrow[1] = 1 : testrow[1] = 0;
   var test1 = req.body.timeslot3 ? testrow[2] = 1 : testrow[2] = 0;
   var test1 = req.body.timeslot4 ? testrow[3] = 1 : testrow[3] = 0;
   var test1 = req.body.timeslot5 ? testrow[4] = 1 : testrow[4] = 0;
   var test1 = req.body.timeslot6 ? testrow[5] = 1 : testrow[5] = 0;
   var test1 = req.body.timeslot7 ? testrow[6] = 1 : testrow[6] = 0;
   var test1 = req.body.timeslot8 ? testrow[7] = 1 : testrow[7] = 0;
   var test1 = req.body.timeslot9 ? testrow[8] = 1 : testrow[8] = 0;
   var test1 = req.body.timeslot10 ? testrow[9] = 1 : testrow[9] = 0;
   testname = req.body.name + "";
   var conn = newConnection();
   var queryStatement = ("INSERT INTO Timetable VALUES ('"+testname+"'")
   for (var i=0; i<10; i++){
     queryStatement += (","+testrow[i]);
   }
   queryStatement += ")";
   conn.query(queryStatement);
   conn.end();
   tableRows += 1;
   if (userAdmin){
     toSend = "<p>saved</p><br><a href=\"/Admin\">return</a>";
   }
  res.send(toSend);
})

app.get('/Admin', (req,res) => {
  if(userAdmin){
  //create header row
  var content = "<div> <form action='/Admin' method = \"post\"> <table> <tr> <th>Name</th>";
  for (var i = 0; i<10; i++) {
    content += "<th> <input type='text' name='timeslot"+(i+1)+"'value='"+timeslots[i]+"'</th>";
  }
  content += "</tr>"
  //insert rows of entries
  var ttList
  var conn = newConnection();
  conn.query("SELECT * FROM Timetable WHERE Name<>'Name'", (err,rows,fields) => {

      if (err)
          response.send('ERROR: ' +err)
      else
      {
          ttList = rows;
          //create display with table rows
          for (t of ttList)
          {
              content += '<tr><td>';
              content += t.Name+"</td>";
              //create checkboxes
              if (t.Timeslot1==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot2==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot3==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot4==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot5==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot6==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot7==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot8==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot9==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              if (t.Timeslot10==1){
                content +="<td><input type=\"checkbox\" checked/></td>"
              }
              else {
                content += "<td><input type=\"checkbox\"/></td>"
              }
              content += '</tr>'
          }
      }
      content += "</table> <input type=\"submit\"/> </div>";
      content += "<br><a href=\"/post\">post</a>"
      conn.end();
      res.send(content);
  })
}
else {
  res.send("Access Denied");
}
});

app.post('/Admin', (req,res) => {
  timeslots[0] = req.body.timeslot1 + "";
  timeslots[1] = req.body.timeslot2 + "";
  timeslots[2] = req.body.timeslot3 + "";
  timeslots[3] = req.body.timeslot4 + "";
  timeslots[4] = req.body.timeslot5 + "";
  timeslots[5] = req.body.timeslot6 + "";
  timeslots[6] = req.body.timeslot7 + "";
  timeslots[7] = req.body.timeslot8 + "";
  timeslots[8] = req.body.timeslot9 + "";
  timeslots[9] = req.body.timeslot10 + "";
 res.send("<p>saved</p><br><a href=\"Admin\">return</a>");
});

//port 80 is to be used
app.listen(80);
