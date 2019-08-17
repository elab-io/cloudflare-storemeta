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


const getCache = key => STORE_METADATA.get(key)
const setCache = (key, data) => STORE_METADATA.put(key, data)

const html = store => `
<!doctype html>
<html>
	<body>	
		<div>Store name: <span id="store_name"></span></div>
		<div>Store location: <span id="store_location"></span></div>
		<div>Store hours: <span id="store_hours"></span></div>
		
		<p> You will be redirect to: <strong><span id="store_redirect"></span></strong> in 10 seconds.</p>		
	</body>
	

	<script>
	document.addEventListener("DOMContentLoaded", function(){
 		window.store = ${store || []}
 		document.getElementById('store_name').innerHTML = store.name;
 		document.getElementById('store_location').innerHTML = store.location;
 		document.getElementById('store_hours').innerHTML = store.hours;
 		document.getElementById('store_redirect').innerHTML = store.redirect;
		console.log(store);


		window.setTimeout(function(){
			window.location = store.redirect;
		}, 10000);


	});

	</script>
</html>
`



async function getStoreInfo(request) {
	
	const cache = await getCache('stores')

	let data
  
  if (!cache) {
    await setCache('stores', JSON.stringify(defaultStoreMetadata.stores))
    data = defaultStoreMetadata
  } else {
    data = JSON.parse(cache)
  }


  let store_id = request.url.split('/').pop();
  
  // Find the store object based on the store_id pass from the url
  let store = data.filter(function(data){
  	return data.id == store_id;
  }).pop();

  const body = html(JSON.stringify(store || []))
  return new Response(body, {
    headers: { 'Content-Type': 'text/html' },
  })

}


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {


  return getStoreInfo(request);

}
