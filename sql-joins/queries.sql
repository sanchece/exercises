-- write your queries here
--part 1--
--1--
SELECT * FROM owners o LEFT JOIN vehicles v ON o.id=v.owner_id;

--2--
SELECT first_name,last_name,COUNT(*) FROM owners o JOIN vehicles v ON o.id=v.owner_id 
GROUP BY o.id
ORDER BY first_name;

--3--
SELECT first_name,last_name,CAST(AVG(price) AS INT) AS average_price,COUNT(*) 
FROM owners o JOIN vehicles v ON o.id=v.owner_id 
GROUP BY o.id
HAVING AVG(price)>=10000
ORDER BY first_name DESC;

