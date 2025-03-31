# NCF Export Meetups (JSON to CSV)

https://www.notion.so/nocodefrance/Meetups-r-alis-s-en-2024-1c5c676313ba8044a82ec65d0957779c


---

https://www.meetup.com/api/playground/#graphQl-playground

```gql
query {
  groupByUrlname(urlname: "nocode-france") {
    id
    name
    pastEvents(input: { first: 500 }) {
      edges {
        node {
          id
          title
          dateTime
          eventUrl
        }
      }
    }
  }
}
```

- Changer events.json
- Run export.js
- Update [Google Sheet](https://drive.google.com/drive/u/0/folders/1kyymB7elyr19GIly1IgfJRJ9SIqa6FXT) (Compte person Ambroise Dhenain)
