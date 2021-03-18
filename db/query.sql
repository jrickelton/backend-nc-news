\c nc_news

SELECT * FROM comments;

SELECT articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.author, 
COUNT(comments.article_id) 
AS comment_count 
FROM articles
LEFT JOIN comments 
ON articles.article_id = comments.article_id 
WHERE articles.topic = mitch
GROUP BY articles.article_id
ORDER BY articles.created_at