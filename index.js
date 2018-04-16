var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll.db');

db.serialize(function() {
  db.all(`SELECT name,location,grade_current, COUNT(votes.politicianId) AS totalVote FROM politicians
          JOIN votes ON votes.politicianId = politicians.id WHERE politicians.grade_current < 9 GROUP BY politicians.name ORDER BY totalVote ASC`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT newTable.totalVote, newTable.name as politicianName, (voters.first_name ||" "|| voters.last_name) AS voterName,voters.gender FROM
          (SELECT COUNT(votes.politicianId)AS totalVote,politicians.name,politicians.id FROM votes JOIN politicians ON
          politicians.id = votes.politicianId GROUP BY votes.politicianId ORDER by totalVote DESC LIMIT 3) AS newTable JOIN votes
          ON votes.politicianId = newTable.id JOIN voters ON voters.id = votes.voterID ORDER BY totalVote DESC, politicianName`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })

  db.all(`SELECT COUNT(votes.voterID) AS totalVote, (voters.first_name ||" "|| voters.last_name) AS name, gender,age from voters JOIN
          votes ON votes.voterID = voters.id GROUP BY voters.id HAVING totalVote > 1 order by totalVote DESC`,(err,data)=>{
          console.log("======================================")
          console.log(data)
  })



})
