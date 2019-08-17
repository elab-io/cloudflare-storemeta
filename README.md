# Cloudflare Workers Experiements

To play with cloudflare with KeyValue store. Using KV store for fast retrival for data from edge server, then dynamically re-route user request to a pre-defined location, or cloud function.

### Sample KV data
```
const defaultStoreMetadata = {
  stores: [
    {
      id: 1,
      name: 'Store 1',
      location: 'flushing',
      hours: 'Mon-Sun 9:00am - 9:00pm',      
      redirect: 'https://nytui.com/us/store'
    },
    {
      id: 2,
      name: 'Store 2',
      location: 'shanhai',
      hours: 'Mon-Sun 10:00am - 7:00pm',
      redirect: 'https://nytui.com/cn/store'
    },    
  ],
}

```

### Test
```
https://nytui.com/store/1 => https://nytui.com/us/store
https://nytui.com/store/2 => https://nytui.com/cn/store

```