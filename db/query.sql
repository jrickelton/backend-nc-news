\c nc_news

SELECT article_id, COUNT(article_id) AS comment_count FROM comments GROUP BY article_id;

SELECT articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.author, 
COUNT(comments.article_id) 
AS comment_count 
FROM articles  
LEFT JOIN comments 
ON articles.article_id = comments.article_id 
WHERE articles.article_id = 9
GROUP BY articles.article_id
ORDER BY articles.created_at