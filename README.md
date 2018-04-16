# poll-db-2
1. SELECT name, location, grade_current, 
   (SELECT COUNT(*) FROM Votes WHERE Politicians.id = Votes.politicianId) 
   AS totalVote FROM Politicians 
   WHERE grade_current < 9 
   ORDER BY totalVote ASC 
   LIMIT 3;

2. FROM Votes
   JOIN (SELECT COUNT(Politicians.id) AS totalVote, Politicians.id AS politician_id, Politicians.name 
   FROM Votes 
   JOIN Politicians ON Votes.politicianId = Politicians.id
   GROUP BY Politicians.id
   ORDER BY totalVote DESC
   LIMIT 3) AS tempTable
   ON tempTable.politician_id = Votes.politicianId
   JOIN Voters ON Voters.id = Votes.voterId
   ORDER BY tempTable.name DESC;
   
3. SELECT (SELECT COUNT(*) FROM Votes WHERE Voters.id = Votes.voterId) 
   AS totalVote, first_name||' '||last_name AS name, gender, age 
   FROM Voters 
   WHERE totalVote > 1 
   ORDER BY totalVote DESC;