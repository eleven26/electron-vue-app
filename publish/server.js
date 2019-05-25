const express = require('express')
const app = express()
const client = require('./oss')
const path = require('path')

app.get('/', (req, res) => {
  client.list().then(result => {
    let objects = result.objects
    objects = objects.map(obj => {
      return {
        url: decodeURIComponent(obj.url),
        size: `${Math.round(obj.size / 1024 / 1024)} M`
      }
    })
    let html = require('fs').readFileSync(path.join(__dirname, '/list.html'))
    let gitHelpers = ``
    objects.forEach(v => {
      gitHelpers += `
      <p>
        <a href="${v.url}" target="_blank">${v.url}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>${v.size}</span>
      </p>
      `
    })
    html = html.toString('UTF-8').replace('content', gitHelpers)

    res.send(html)
  })
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
