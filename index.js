const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

class readDatabase{
    static displayDataNo1(callback){
        db.serialize(function(){
            db.all("SELECT name,location,grade_current, COUNT(*) AS 'totalVote' FROM politicians JOIN votes ON politicians.id = votes.politicianId WHERE grade_current < 9 GROUP BY grade_current",function(err,row){
                if(err){
                    throw err
                }
                callback(row)
            })
        })
    }

    static displayDataNo2(callback){
        db.serialize(function(){
            db.all("SELECT (SELECT COUNT(*) FROM votes WHERE politicianId = politicians.id GROUP BY votes.politicianId) AS 'TotalVote', politicians.name AS 'politicianName', voters.first_name || ' ' ||  voters.last_name AS 'voterName', voters.gender FROM politicians JOIN votes ON politicians.id = votes.politicianId JOIN voters ON votes.voterId = voters.id WHERE politicians.id IN (SELECT politicians.id FROM politicians JOIN votes ON politicians.id = votes.politicianId GROUP BY politicians.id ORDER BY COUNT(votes.voterId) DESC LIMIT 3) ORDER BY TotalVote DESC, politicians.id",function(err,row){
                if(err){
                    throw err
                }
                callback(row)
            })
        })
    }

    static displayDataNo3(callback){
        db.serialize(function(){
            db.all("SELECT COUNT(*) AS 'totalVote',first_name || ' ' || last_name AS 'name',gender,age FROM voters JOIN votes ON voterId = voters.id GROUP BY voterId ORDER BY totalVote DESC",function(err,row){
                if(err){
                    throw err
                }
                callback(row)
            })
        })
    }
}

readDatabase.displayDataNo1(display)
function display(displayDataNo1){
    console.log("1. Tampilkan nama politicians, lokasi, grade_current dan jumlah votenya.")
    console.log(displayDataNo1)
}

readDatabase.displayDataNo2(display2)
function display2(displayDataNo2){
    console.log("\n2. Tampilkan 3 politicians yg memiliki vote terbanyak dan siapa saja yg memilih politicians tsb. list nama politicians, totalVote, fullname, voternya, dan jenis kelamin pemilihnya.")
    console.log(displayDataNo2)
}

readDatabase.displayDataNo3(display3)
function display3(displayDataNo3){
    console.log("\n3. Tampilkan jumlah voting yg dia lakukan, nama lengkap, jenis kelamin, dan umurnya. urutkan berdasarkan jumlah voting fraud yg banyak dan berdasarkan nama lengkap dari pemilihnya")
    console.log(displayDataNo3)
}