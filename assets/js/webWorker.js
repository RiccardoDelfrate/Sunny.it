const workerAsText = document.querySelector('#worker').textContent
const workerAsBlob = new Blob([workerAsText], { type: 'text/javascript' })
const ImageLoaderWorker = new Worker(URL.createObjectURL(workerAsBlob))


const imgElements = document.querySelectorAll('img[data-src]')

ImageLoaderWorker.addEventListener('message', event => {
  // Grab the message data from the event
  const imageData = event.data

  //console.log('We got a message back!', imageData)

  const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)

  const objectURL = URL.createObjectURL(imageData.blob)
  
  imageElement.setAttribute('src', objectURL)
  imageElement.removeAttribute('data-src')
})

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})