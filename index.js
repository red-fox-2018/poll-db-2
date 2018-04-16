const fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../poll-db-1/poll.db');

class Output {
  static testCase1() {
    db.all("select politicians.name, politicians.location, politicians.grade_current, count(politicians.name) as totalVote from politicians left join votes on politicians.id = votes.politician_id where politicians.grade_current < 9 group by politicians.name order by politicians.grade_current  asc", function (err, rows) {
      console.log('============TEST CASE 1============')
      console.log(rows);
    });
  }
  static testCase2() {
    db.all("with pv as (select count(*) as totalVote, politicians.name, politicians.id from politicians left join votes on politicians.id = votes.politician_id group by politicians.name order by totalVote desc limit 3) select pv.totalVote, pv.name, voters.First_name || ' ' || voters.Last_name as voterName, voters.Gender from votes inner join pv on votes.politician_id = pv.id inner join voters on votes.voter_id = voters.id order by pv.totalVote desc", function (err, rows) {
      console.log('============TEST CASE 2============')
      console.log(rows);
    });
  }
  static testCase3() {
    db.all("with previousResult as (select count(*) as totalVote, voters.First_name || ' ' || voters.Last_name as name, voters.Gender, voters.Age from votes left join voters on votes.voter_id = voters.id group by voters.id order by totalVote desc) select * from previousResult where totalVote > 1;", function (err, rows) {
      console.log('============TEST CASE 3============')
      console.log(rows);
    });
  }
}

Output.testCase1();
Output.testCase2();
Output.testCase3();




