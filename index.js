var sqlite3=require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');

db.serialize(function() {
function nomor1() {
	db.all(`SELECT name,location,grade_current,COUNT(*) AS totalVote FROM Politicians JOIN Votes ON Politicians.PoliticianID= Votes.PoliticianID WHERE Grade_Current < 9 GROUP BY Name ORDER BY Grade_Current;`, function(err,rows) {
		console.log('===NOMOR 1===');
		console.log(rows);
	} )
} 



function nomor2() {
	db.all(`SELECT totalVote,politicianName,voterName,gender FROM voterTable JOIN politicianTable ON voterTable.politicianID = politicianTable.politicianID GROUP BY voterName ORDER BY totalVote	DESC`, function(err,rows) {
		console.log('===NOMOR 2===');
		console.log(rows);
	} )
}

function nomor3() {
	db.all(`SELECT totalVote,(First_Name ||" " ||Last_Name)AS name,gender,age FROM Voters JOIN fraudVoter ON Voters.VoterID = fraudVoter.VoterID ORDER BY totalVote DESC;`, function(err,rows) {
		console.log('===NOMOR 3===');
		console.log(rows);
	} )
}

nomor1();
nomor2();
nomor3();
}) 


	






	