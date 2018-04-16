SELECT name,address,grade_current,
(SELECT COUNT(*) FROM Votes WHERE Votes.Politicians_id=Politicians.Politicians_id)as totalvotes
FROM Politicians WHERE grade_current < 9 ORDER BY totalvote ASC



SELECT
(SELECT name FROM Politicians where Votes.Politicians_id=Politicians.Politicians_id) AS PoliticiansName,
(SELECT COUNT(voters_id) FROM Votes WHERE Politicians.Politicians_id = Votes.Politicians_id)AS totalVote,
(first_name || ' '||last_name)as voterName, gender
FROM Votes
INNER JOIN Voters on Votes.voters_id=Voters.voters_id
INNER JOIN Politicians on Votes.Politicians_id=Politicians.Politicians_id
WHERE totalvote > 10
ORDER BY totalvote DESC


SELECT (SELECT COUNT(voters_id) FROM Votes WHERE Votes.voters_id = Voters.voters_id)
as totalvotes, (first_name || ' '||last_name) AS name,gender,age
FROM Voters WHERE totalVotes>1 ORDER BY totalVotes DESC
