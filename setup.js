let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./database.db')
	
db.serialize(function(){
//1
// db.all(`SELECT name,location,grade_curent, COUNT(*) AS totalVote FROM votes
// 		LEFT JOIN politicians ON politicians.id = votes.politicianID
// 		WHERE grade_curent<9
// 		GROUP BY name
// 		ORDER BY grade_curent ASC
// 		LIMIT 3`,[],(err,row) =>{
// 			if (err) throw err
// 			else{
// 				console.log(row)
// 			}
// 		})
//2
// db.all(`SELECT totalVote,first_name||' '||last_name AS "voterName", gender,votes.id
// 		FROM (SELECT COUNT(*) AS totalVote,name AS politicianName,politicians.id FROM votes
// 		LEFT JOIN politicians ON politicians.id = votes.politicianID
// 		GROUP BY politicianName
// 		ORDER BY totalVote DESC
// 		LIMIT 3) 
// 		LEFT JOIN votes ON votes.politicianID = votes.politicianID
// 		LEFT JOIN voters on voters.id = voters.id`,[],(err,row)=>{
// 			if (err) throw err
// 				else{
// 					console.log(row)
// 				}
// 		})
//3
	db.all(`SELECT COUNT(*) AS totalVote, first_name||' '||last_name AS name, gender, age FROM votes
            LEFT JOIN voters ON voters.id = votes.politicianID
            GROUP BY name
            HAVING totalVote > 1
            ORDER BY totalVote ASC`, [], (err, rows) => {
        if (err) throw err
            else {
                console.log(rows)
	            }
	})
})
	
db.close()

	