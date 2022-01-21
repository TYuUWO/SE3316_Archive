const express = require('express');
let jobs = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))
// serve static contents
app.use(express.static('static'));

// dynamic handling

app.get('/categories', (request, response) => {
    let content ='';
    let jCategories = [];
    let jCatCount = [];
    var jKeys = Object.keys(jobs);

    for (j of jKeys)
    {
      for(var c=0;c<jobs[j].categories.length;c++){
        var cat = jobs[j].categories[c];
            if(jCategories.includes(cat)){
              for(var i=0;i<jCategories.length;i++){
                //increment the counter when found
                if(jCategories[i]==cat){
                  jCatCount[i] += 1;
                }
              }
            }
            else{
              //add to array
              jCategories.push(cat);
              jCatCount.push(1);
            }
          }
    }
    for(var i=0;i<jCategories.length;i++){
      content += '<div>';
      content += jCategories[i] + ": " + jCatCount[i];
      content += '</div>'
      content += '\n';
    }
    content += '<div>';
    content += "result"
    content += '</div>'
    content += '\n';
    response.send(content);
})

app.get('/jobsByCategory/:category', (req,res) => {
  var jobSubset = [{}];
  var counter = 0;
  var jKeys = Object.keys(jobs);

  for (j of jKeys)
  {
    for(var c=0;c<jobs[j].categories.length;c++){
      var cat = jobs[j].categories[c];
        if(cat == req.params.category){
          jobSubset.push(jobs[j]);
      }
    }
  }
  res.json(jobSubset);
});

app.get('/jobsByCity/:city' , (req,res) => {
  var jobSubset = [{}];
  var counter = 0;
  var jKeys = Object.keys(jobs);

  for (j of jKeys)
  {
    //check for "("
    var checkChar = false;
    //check for ","
    var checkChar1 = false;
    var tempString = "";

    for(c of jobs[j].title){
      if (checkChar && c==","){
        checkChar1 = true;
      }
      if(checkChar && (!checkChar1)){
        tempString += c;
      }
      else if(c == "("){
        checkChar = true;
      }
      //discard tempstring if ")" is found before ","
      else if((!checkChar1) && c == ")"){
        tempString = "";
      }
    }
    if(tempString == req.params.city){
      jobSubset.push(jobs[j]);
    }
  }
  res.json(jobSubset);
});


app.listen(80);
