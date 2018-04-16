const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

class readDatabase{
    static getData1(){
        let sql = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT(politicianId) AS 'TotalVote' 
                    FROM politicians JOIN votes ON politicians.id = votes.politicianId 
                    WHERE politicians.grade_current < 9 GROUP BY politicians.name ORDER BY TotalVote`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData2(){
        let sql = `WITH param AS(
                        SELECT 
                        COUNT(politicianId) AS 'totalvote', politicians.name AS 'politicianName', politicians.id  
                        FROM politicians 
                        JOIN votes 
                        ON politicians.id = votes.politicianId 
                        GROUP BY politicians.name 
                        ORDER BY totalvote 
                        DESC LIMIT 3
                    ) 
                    ,param2 AS(
                        SELECT 
                        voters.first_name ||' '|| voters.last_name AS 'voterName',
                        voters.gender,
                        votes.politicianId
                        FROM voters
                        JOIN votes
                        ON voters.id = votes.voterId
                    )
                    SELECT param.totalvote AS 'Total Vote', param.politicianName AS 'Politician Name', 
                    param2.voterName AS 'Voter Name', param2.gender AS ' Gende'
                        FROM param
                        JOIN param2
                        ON param.id = param2.politicianId
                        ORDER BY param.totalvote DESC`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }

    static getData3(){
        let sql = `SELECT  tab.v AS 'Total Vote',tab.name AS 'Name' , tab.gender AS 'Gender', tab.age AS 'Age'
                        FROM(SELECT voters.first_name||' '||voters.last_name AS 'name', voters.age, voters.gender, 
                        COUNT(votes.politicianId) AS v
                        FROM voters JOIN votes
                        ON voters.id = votes.voterId
                        GROUP BY voters.first_name
                        ORDER BY v DESC) as tab
                        WHERE tab.v > 1`
        db.all(sql,[], function(err, rows){
            if (err) {
                throw err;
              }
            console.log(rows)
        })
    }
}

readDatabase.getData1()
readDatabase.getData2()
readDatabase.getData3()