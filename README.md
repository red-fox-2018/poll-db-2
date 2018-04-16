# poll-db-2

nomor1:
SELECT name, location, grade_current, count(*) AS totalVote 
FROM politicians 
JOIN votes ON politicians.id = votes.politicianId 
WHERE grade_current < 9 
GROUP BY politicianId 
ORDER BY grade_current asc;

nomor2:
SELECT tmpTable.totalVote, tmpTable.name AS politicianName, (voters.first_name ||" "|| voters.last_name) AS voterName, voters.gender 
FROM votes 
JOIN (SELECT count(politicians.id) AS totalVote, politicians.id, politicians.name FROM votes JOIN politicians ON votes.politicianId = politicians.id GROUP BY politicians.id ORDER BY totalVote DESC LIMIT 3) AS tmpTable ON tmpTable.id = votes.politicianId 
JOIN voters ON voters.id = votes.voterId 
ORDER BY tmpTable.name desc;

nomor3:
SELECT count(*) AS totalVote, first_name || " " || last_name AS name, gender, age FROM voters 
JOIN votes ON voters.id = votes.voterId 
GROUP BY voterId 
HAVING totalVote > 1 
ORDER BY totalVote desc;