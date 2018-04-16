var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('poll.db');



    db.all(`SELECT politicians.name,politicians.location,politicians.grade_current,COUNT(*) AS totalVote
            FROM politicians
            join votes
            ON votes.politicianId = politicians.id
            WHERE politicians.grade_current<9
            GROUP BY politicians.name
            ORDER BY totalVote ASC;`,function (err,rows) {
                if(err) console.log('error')
                    console.log('----------- Question No.1-----------')
                    console.log(rows)
                    console.log()
            
    })

    db.all(`WITH vote AS (
            SELECT COUNT(*) AS totalVote,politicians.name,votes.politicianId FROM politicians
            join votes
            ON politicians.id = votes.politicianId
            GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3
            )
            SELECT vote.totalVote,vote.name,voters.first_name || ' ' || voters.last_name AS FullName, voters.gender FROM vote
            join votes
            ON votes.politicianId = vote.politicianId
            join voters
            ON voters.id = votes.voterId
            ORDER BY vote.totalVote DESC`,function (err,rows) {
                if(err)console.log('error')
                    console.log('----------- Question No.2-----------')
                    console.log(rows)
                    console.log()
    })
    db.all(`WITH cheater AS (
            SELECT COUNT(*) AS totalVote,voters.first_name||' '||voters.last_name AS full_name,voters.gender,voters.age FROM voters
            JOIN votes
            ON voters.id=votes.voterId
            GROUP BY votes.voterId
            ORDER BY totalVote DESC
            )
            SELECT * FROM cheater
            WHERE cheater.totalVote>1`,function (err,rows) {
                if (err) console.log('error')
                console.log('----------- Question No.3-----------')
                console.log(rows)
                console.log()
    })


