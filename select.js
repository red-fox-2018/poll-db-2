const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db')

function politiciansGradeUnderNine(){
    let query = `select name, location, grade_current, 
                        (select count(*) from votes where politicianId = politicians.id) totalVote 
                 from politicians 
                 where grade_current < 9 
                 order by grade_current;
                `
    
    db.all(query, [], (err, politiciansGradeUnderNine) => {
        if(err) throw err;
        console.log(politiciansGradeUnderNine)
    })                 
}

function threePoliticansMaxVoters(){
    let query = `
                select dodol.totalVote, dodol.name, voters.first_name||' '||voters.last_name voterName, voters.gender
                from voters
                join votes on voterId = voters.id
                join 
                    (
                        select count(politicianId) totalVote, politicians.id id, politicians.name
                        from votes
                        join politicians on politicians.id = votes.politicianId
                        group by politicians.id
                        order by totalvote desc limit 3
                    ) as dodol on dodol.id = votes.politicianId
                order by dodol.totalVote desc`

    db.all(query, [], (err, threePoliticansMaxVoters) => {
        if(err) throw err;
        console.log(threePoliticansMaxVoters)
    })                                 

}


function votersFraud(){
    let query = `
                select a.totalVote, voters.first_name||' '||voters.last_name name, gender, age
                from
                (
                    select count(voterId) totalVote, voterId
                    from votes
                    group by voterId
                ) as a
                join voters on voters.id = a.voterId
                where totalVote > 1
                order by totalVote desc
                `

    db.all(query, [], (err, votersFraud) => {
        if(err) throw err;
        console.log(votersFraud)
    })                
}


// politiciansGradeUnderNine()
// votersFraud()
threePoliticansMaxVoters()