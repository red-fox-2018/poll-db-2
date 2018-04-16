/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/
/*jshint -W083*/
/*jshint -W138*/

const Table = require('cli-table');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../poll-db-1/poll.db', (err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Connected to the in-memory SQlite database.');
});

//Release 0 no.1=====
db.all(`SELECT politician_name AS name, location, grade_current, COUNT(*) AS totalVote FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        WHERE grade_current < 9
        GROUP BY name
        ORDER BY grade_current ASC
        LIMIT 3;`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('\n');
      console.log('Release 0 NO.1');

      var table = new Table({
         head: ['Name', 'location', 'Grade Current', 'Total Vote'],
         colWidths: [20, 10, 18, 15]
      });

      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].name}`, `${dataRows[i].location}`, `${dataRows[i].grade_current}`, `${dataRows[i].totalVote}`]);
      }
      console.log(table.toString());
   }
});

//Release 0 no.2=====
db.all(`SELECT totalVote, politician_name AS politicianName, first_name||' '||last_name AS voterName, gender
        FROM (SELECT COUNT(*) As totalVote, politician_name AS politician_name, Politicians.politician_id FROM Votes
        LEFT JOIN Politicians ON Politicians.politician_id = Votes.politician_id
        GROUP BY politician_name
        ORDER BY totalVote DESC
        LIMIT 3) AS threeTopVote
        LEFT JOIN Votes ON Votes.politician_id = threeTopVote.politician_id
        LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id;`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('\n');
      console.log('Release 0 NO.2');

      var table = new Table({
         head: ['Total Vote', 'Politician Name', 'Voter Name', 'Gender'],
         colWidths: [15, 20, 20, 10]
      });

      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].totalVote}`, `${dataRows[i].politicianName}`, `${dataRows[i].voterName}`, `${dataRows[i].gender}`]);
      }
      console.log(table.toString());
   }
});

//Release 0 no.3=====
db.all(`SELECT COUNT(*) AS totalVote, first_name||' '||last_name AS name, gender, age FROM Votes
        LEFT JOIN Voters ON Voters.voter_id = Votes.voter_id
        GROUP BY name
        HAVING totalVote > 1
        ORDER BY totalVote DESC;`, (err, dataRows) => {
   if (err) throw err;
   else {
      console.log('\n');
      console.log('Release 0 NO.3');
      var table = new Table({
         head: ['Total Vote', 'Name','Gender', 'Age'],
         colWidths: [15, 20, 10, 5]
      });
      for (let i = 0; i < dataRows.length; i++) {
         table.push([`${dataRows[i].totalVote}`, `${dataRows[i].name}`, `${dataRows[i].gender}`, `${dataRows[i].age}`]);
      }
      console.log(table.toString());
   }
});


db.close((err) => {
   if (err) {
      return console.error(err.message);
   }
   console.log('Close the database connection.');
});
