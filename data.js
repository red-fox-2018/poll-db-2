const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
//database didapat dari folder poll db 1
var db = new sqlite3.Database('../poll-db-1/database.db');

function release0No1() {
  db.all(`SELECT name, location, grade_current, (SELECT COUNT(*) FROM Votes WHERE Politicians.Politician_id = Votes.Politician_id) AS totalVote
      FROM Politicians
      WHERE grade_current < 9
      ORDER BY grade_current asc
      `, (err, data) => {
        if (err) {
          console.log('error');
        } else {
          console.log(data);
        }
    })
}

function release0No2() {
  db.all(`SELECT akui.totalVote, akui.name AS politicianName, (Voters.first_name||''||Voters.last_name) AS voterName, Voters.gender
    FROM
    (SELECT count(Votes.Politician_id) AS totalVote,
     Politicians.name,Politicians.Politician_id FROM Politicians JOIN Votes
     ON Votes.Politician_id = Politicians.Politician_id GROUP BY Votes.Politician_id order by totalVote DESC limit 3)
    AS akui
    INNER JOIN Votes ON akui.Politician_id = Votes.Politician_id
    INNER JOIN Voters ON Votes.voter_id = Voters.voter_id
    ORDER BY totalVote DESC, akui.name
    `, (err, data) => {
      if (err) {
        console.log('error');
      } else {
        console.log(data);
      }
  })
}

function release0No3() {
  db.all()
}

// release0No1()
