const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

class Poll_db_2 {
  constructor() {

  }

  static number_one(){

    db.all(`SELECT * FROM politicians
              WHERE politicians.grade_current < 9 ORDER BY politicians.grade_current DESC`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })

  }

  static number_two(){

    db.all(`SELECT table1.totalVote, table1.name AS politicianName, (voters.first_name ||" "|| voters.last_name) AS voterName
            FROM
            (select politicians.id, name, party, location, COUNT(votes.politicianId)
                    	  AS totalVote FROM votes
                      	  INNER JOIN politicians ON politicians.id = votes.politicianId
                          GROUP BY name ORDER BY totalVote DESC LIMIT 3) AS table1 JOIN votes ON votes.politicianId = table1.id
            			  JOIN voters ON voters.id = votes.voterId
            ORDER BY totalVote DESC, politicianName`)

  }

  static number_three(){

    db.all(`SELECT COUNT(votes.voterId) AS totalVote,
          	(voters.first_name ||" "|| voters.last_name) AS name, gender, age
          		FROM voters
          			JOIN votes ON votes.voterId = voters.id
          			GROUP BY voters.id
          				HAVING totalVote > 1 order BY totalVote DESC`, (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(data);
                    }
                  })

  }

}

Poll_db_2.number_one()
