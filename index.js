const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

// URL the site you want scraper
const url = 'https://www.theguardian.com/uk'

axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const articles = []

    // Add class or id the element you want scraper
    $('.fc-item__title', html).each(function () {
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      articles.push({
        title,
        url,
      })
    })
    console.log(articles)
  })
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
