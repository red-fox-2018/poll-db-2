var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db-poll.db');

class Query {
  constructor() {

  }

  static belowGrade9() {
    let innerQuery = `SELECT *
                FROM votes
                LEFT JOIN politicians
                  ON votes.politicianId = politicians.id
                WHERE grade_current < 9`
    db.all(`WITH inner AS (${innerQuery})
            SELECT name, location, grade_current, COUNT(*) AS totalVote
            FROM inner
            LEFT JOIN voters
              ON inner.voterId = voters.id
            GROUP BY inner.name
            ORDER BY grade_current`, (err, row) => {
      console.log(err);
      console.log(row);
    })
  }

  static showPoliticiansAndVoters() {
    let top_votes = `SELECT politicians.id, COUNT(*) as totalVote, politicians.name as politicianName
                      FROM votes
                      LEFT JOIN politicians
                        ON votes.politicianId = politicians.id
                      GROUP BY politicianName
                      ORDER BY totalVote DESC LIMIT 3`;
    db.serialize(() => {
      db.run(`CREATE VIEW top_votes AS ${top_votes}`, (err) => {
        console.log(err);
      })
      let inner = `SELECT *
                  FROM top_votes
                  LEFT JOIN votes
                    ON top_votes.id = votes.politicianId`;
      db.all(`WITH inner as (${inner})
              SELECT totalVote, politicianName,
                (voters.first_name || ' ' || voters.last_name) as voterName, gender
              FROM inner
              LEFT JOIN voters
                ON inner.voterId = voters.id`, (err, output) => {
        console.log(output);
      })
    })
  }

  static showCheater() {
    db.all(`SELECT *
            FROM (SELECT COUNT(*) AS 'totalVote',
                    (voters.first_name || ' ' || voters.last_name) AS name, gender, age
                  FROM votes
                  LEFT JOIN voters
                    ON votes.voterId = voters.id
                  GROUP BY name
                  ORDER BY totalVote DESC)
            WHERE totalVote > 1
              `, (err, output) => {
        console.log(err);
        console.log(output);
    })
  }
}

// Query.belowGrade9()
// Query.showPoliticiansAndVoters()
Query.showCheater()
