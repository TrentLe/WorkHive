import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const News = () => {

    const [news, setNews] = useState([])

    const limitedNews = [];

    const getNews = () => {

        Axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2023-08-16&sortBy=publishedAt&apiKey=7fb98074f5544ddaaaf883b1f3c6c357`)
            .then((res) => {
                // setNews(res.data.articles)
                console.log(res.data.articles[0].author)
                console.log(news)

                for (let i = 0; i < 10; i++) {
                    limitedNews.push(res.data.articles[i])
                }
                return setNews(limitedNews)
            })

    }

    useEffect(() => {
        getNews()
    }, [])




    console.log(limitedNews)


    return (
        <section>
            <h1>News</h1>
            {news.map((article) => (
                <div className='d-flex flex-column mb-4'>
                    <a href={article.url} ><h4>{article.title}</h4></a>
                    <h6>{article.author}</h6>
                    <img src={article.urlToImage} style={{ height: "5rem", width: "5rem" }} alt="" />

                </div>
            ))

            }
            {/* <h1>{news[0].title}</h1> */}

        </section>
    )
}

export default News