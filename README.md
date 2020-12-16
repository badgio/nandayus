# Badgio - Web App

Web App for Badgio

This project was created using Vue.js.

This project was carried out in the first semester of the fifth year of informatics engineering course at University of Minho. [2020-2021]

## Contributors
| <a href="https://github.com/andregclvs" target="_blank">**André Gonçalves**</a> | <a href="https://github.com/franciscoreinolds" target="_blank">**Francisco Reinolds**</a> |
| :---: | :---:|
| [![André Gonçalves](https://avatars3.githubusercontent.com/u/36642422?s=300&u=49eea4dafbe8e2404bfabaeaea686eb835b59f1d&v=4)](https://github.com/andregclvs) | [![Francisco Reinolds](https://avatars0.githubusercontent.com/u/36642413?s=300&u=09a99a4bfd10c305767fa7ea666c6859231c3fd8&v=4)](https://github.com/franciscoreinolds) |
| <a href="https://github.com/andregclvs" target="_blank">`github.com/andregclvs`</a> | <a href="https://github.com/franciscoreinolds" target="_blank">`github.com/franciscoreinolds`</a> |

### How to start the project

1. Clone the repo ` git clone https://github.com/badgio/nandayus.git`
2. Cd into it `cd nandayus`
3. Install dependencies `npm i`
4. Run the Web App `npm run serve`

### HTTP Requests Status


| Directory                  |      GET      |     POST      |     PATCH     |      PUT      |     DELETE    |
| -------------------------- | ------------- | ------------- | ------------- | ------------- |:-------------:|
| /locations                 |   &#x2611;    |       -       |       -       |       -       |       -       |
| /newlocation               |       -       |   &#x2611;    |       -       |       -       |       -       |
| /locations/:id             |   &#x2611;    |       -       |   &#x2612;    |       -       |    &#x2611;   |
| /locations/:id/statistics  |   &#x2612;    |       -       |       -       |       -       |       -       |
| /badges                    |   &#x2611;    |       -       |       -       |       -       |       -       |
| /newbadge                  |   &#x2612;    |   &#x2611;    |       -       |       -       |       -       |
| /badges/:id                |   &#x2611;    |       -       |   &#x2612;    |       -       |    &#x2611;   |
| /badges/:id/statistics     |   &#x2612;    |       -       |       -       |       -       |       -       |
| /collections               |   &#x2612;    |       -       |       -       |       -       |       -       |
| /newcollection             |   &#x2612;    |   &#x2612;    |       -       |       -       |       -       |
| /collections/:id           |   &#x2612;    |       -       |   &#x2612;    |       -       |    &#x2612;   |
| /collections/:id/statistics|   &#x2612;    |       -       |       -       |       -       |       -       |
| /rewards                   |   &#x2611;    |       -       |       -       |       -       |       -       |
| /newreward                 |   &#x2612;    |   &#x2611;    |       -       |       -       |       -       |
| /rewards/:id               |   &#x2611;    |       -       |   &#x2612;    |       -       |    &#x2611;   |
| /rewards/:id/statistics    |   &#x2612;    |       -       |       -       |       -       |       -       |