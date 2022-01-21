const express = require('express');
let questions = require('./questions.json');

const app = express();

// serve static contents
app.use(express.static('static'));
app.use(express.urlencoded({
  extended: true
}))

//remove answers from copy of questions
var qNotA = JSON.parse(JSON.stringify(questions));

for (e of qNotA){
  delete e.answerIndex;
}

// dynamic handling

app.get('/questionsInJson', (req,res) => {
    res.json(qNotA);
})

/*app.post('/questionFeedback', (req,res) => {
  var count = 0;
  for(q of questions){
    if(req.query.question == count){
      if(q.answerIndex == req.query.answer){
        res.send("<responseText>Correct</responseText>");
      }
      else{
        res.send("Try again");
      }
    }
      count++;
  }
})*/

app.post('/post', (req,res) => {
  var ansArray = [];
  var grade = 0;

  var reqBodyArray = Object.keys(req.body).map((key) => req.body[key]);
  console.log(reqBodyArray);
  
  for (ans of questions){
    ansArray.push(ans.answerIndex);
  }

  if (req.body.q0 == ansArray[0]){
    grade++;
  }
  if (req.body.q1 == ansArray[1]){
    grade++;
  }
  if (req.body.q2 == ansArray[2]){
    grade++;
  }
  if (req.body.q3 == ansArray[3]){
    grade++;
  }
  if (req.body.q4 == ansArray[4]){
    grade++;
  }

  res.send("<br><p>grade: "+grade+"</p>");
})

app.listen(80);
