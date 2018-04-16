const sqlite = require('sqlite3')
const db = new sqlite.Database('database.db')

db.each("SELECT name, location, grade_current, (SELECT COUNT(*) as 'totalVote'FROM votes WHERE votes.politicianId = politicians.id) as 'totalVote' FROM politicians WHERE grade_current < 9 ORDER BY totalVote;", (err, row) => {
  console.log(row);
})

db.each("SELECT (SELECT COUNT(*) FROM votes WHERE votes.politicianId = politicians.id) as 'totalVote', politicians.name as 'politicianName', voters.first_name || ' ' || voters.last_name as 'voterName', voters.gender FROM politicians JOIN votes ON votes.politicianId = politicians.id JOIN voters ON voters.id = votes.voterId WHERE politicians.id IN (SELECT politicians.id FROM politicians JOIN votes ON votes.politicianId = politicians.id GROUP BY politicians.id ORDER BY COUNT(votes.voterId) DESC LIMIT 3) GROUP BY votes.voterId ORDER BY totalVote DESC, politicianName;", (err, row) => {
  console.log(row);
})

db.each("SELECT COUNT(*) as 'totalVote', voters.first_name || ' ' || voters.last_name as 'fullName', gender, age FROM votes JOIN voters ON voters.id = votes.voterId GROUP BY votes.voterId HAVING totalVote > 1 ORDER BY totalVote DESC;", (err, row) => {
  console.log(row);
})
