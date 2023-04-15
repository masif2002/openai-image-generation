const button = document.querySelector('#submit')

button.addEventListener('click', async () => {
  startAnimation()

  const prompt = document.getElementById('prompt').value

  const response = await fetch('http://localhost:8080/magic', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      prompt
    })
  })

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  
    const imageContainer = document.querySelector('.image-container')
    imageContainer.innerHTML = `<img src="${data.imageUrl}" alt="Image" id="image" >`
  } else {
    const err = await response.text();
    alert(err)
    console.log(err);
  }


  stopAnimation()
})


const startAnimation = () => {
  button.disabled = true
  const emoji1 = document.querySelector('.emoji-l')
  const emoji2 = document.querySelector('.emoji-r')
  emoji1.classList.add('spin')
  emoji2.classList.add('spin')
}

const stopAnimation = () => {
  button.disabled = false
  const emoji1 = document.querySelector('.emoji-l')
  const emoji2 = document.querySelector('.emoji-r')
  emoji1.classList.remove('spin')
  emoji2.classList.remove('spin')
}