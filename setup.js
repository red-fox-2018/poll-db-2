//your code here
const fs = require('fs');
const sqlite3 =require('sqlite3').verbose()
let db = new sqlite3.Database('database.db')

class Politicians {
  static createTable (){
    db.serialize(function (){
      db.run('CREATE TABLE politicians (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, party VARCHAR, location TEXT, grade_current REAL)')
    })
  }
  static insertTable (){
    fs.readFile('./politicians.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataPoliticians = data.split('\n')
      for (var i = 1; i < dataPoliticians.length; i++) {
        let splitData = dataPoliticians[i].split(',')
        db.run(`INSERT INTO politicians VALUES (null,'${splitData[0]}','${splitData[1]}','${splitData[2]}',${splitData[3]})`)
      }
    })
  }
  static grade_currentUnder9(){
    db.all(`SELECT name, location,grade_current, count(*) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politician_id WHERE politicians.grade_current < 9 GROUP BY politicians.id ORDER BY totalVote`,[],(err,data) => {
      console.log(data);
    })
  }
}
class Voters {
  static createTable(){
    db.run('CREATE TABLE voters (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR, last_name VARCHAR, gender VARCHAR, age INTEGER)')
  }
  static insertTable (){
    fs.readFile('./voters.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataVoters = data.split('\n')
      for (var i = 1; i < dataVoters.length; i++) {
        let splitData = dataVoters[i].split(',')
        db.run(`INSERT INTO voters VALUES (null,'${splitData[0]}',"${splitData[1]}",'${splitData[2]}',${splitData[3]})`)
      }
    })
  }
  static fraudVoters(){
    db.all(`SELECT (SELECT COUNT(*) FROM votes WHERE voters.id = votes.voter_id) AS totalVote, (first_name||' '||last_name) AS name, gender, age FROM voters WHERE totalVote > 1 ORDER BY totalVote DESC`, [], (err,data)=>{
      console.log(data);
    })
  }
}
class Votes {
  static createTable(){
    db.run('CREATE TABLE votes (id INTEGER PRIMARY KEY AUTOINCREMENT, voter_id INTEGER, politician_id INTEGER)')
  }
  static insertTable (){
    fs.readFile('./votes.csv', 'utf8', (err, data) => {
      data = data.trim()
      let dataVotes = data.split('\n')
      for (var i = 1; i < dataVotes.length; i++) {
        let splitData = dataVotes[i].split(',')
        db.run(`INSERT INTO votes VALUES (null,${splitData[0]},${splitData[1]})`)
      }
    })
  }
  static whoVoteTopThree (){
    db.all(`SELECT topThree.totalVote, topThree.name AS politicianName, (voters.first_name ||' '|| voters.last_name) AS voterName, voters.gender FROM votes JOIN (SELECT politicians.id,count(politicians.id) AS totalVote, politicians.name FROM votes JOIN politicians ON politicians.id = votes.politician_id GROUP BY politicians.id ORDER BY totalVote DESC LIMIT 3) AS topThree ON topThree.id = votes.politician_id JOIN voters ON voters.id = votes.voter_id GROUP BY voterName ORDER BY topThree.name DESC`,[],(err,data) => {
      console.log(data);
    })
  }

}
//
// Politicians.createTable()
// Politicians.insertTable()
// Politicians.grade_currentUnder9()
// Voters.createTable()
// Voters.insertTable()
Voters.fraudVoters()
// Votes.createTable()
// Votes.insertTable()
// Votes.whoVoteTopThree()
