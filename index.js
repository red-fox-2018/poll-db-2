
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Solve {
  releaseOne() {
    db.all(`
    SELECT
      name, location, grade_current, count(*) as totalVotes
      from politicians
      join votes on votes.politicianId = politicians.id
      where grade_current < 9
      group by politicians.name
      order by totalVotes;
    `, [], (err, res) => {
      console.log(res);
    });
  }
  releaseTwo() {
    db.all(`
      SELECT
        (SELECT COUNT(*) from votes where  politicianId = politicians.id group by votes.politicianId) as totalVotes,
        politicians.name as politicianName,
        voters.first_name || ' ' || voters.last_name as voterName,
        voters.gender
        from votes
        join voters on voters.id = votes.voterId
        join politicians on votes.politicianId = politicians.id
        where politicianId in 
        ( SELECT
            politicians.id
            from votes
            join politicians on votes.politicianId = politicians.id
            group by politicians.name
            order by COUNT(*) desc limit 3
        )
        order by politicianId desc;
    `, [], (err, res) => {
      console.log(res);
    });
  }
  releaseThree() {
    db.all(`
    SELECT
      voters.first_name || ' ' || voters.last_name as nama,
      voters.gender,
      voters.age,
      count(*) as totalVotes
      from votes
      join voters on votes.voterId = voters.id
      group by votes.voterId
      having totalVotes > 1
      order by totalVotes desc;
      `, [], (err, res) => {
        console.log(res);
    });
  }
}

