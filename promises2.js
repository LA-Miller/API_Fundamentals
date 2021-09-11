// fetch('https://api.artic.edu/api/v1/artworks')
//     .then(res => res.json())
//     .then(json => console.log(json))

// async function slowResult(){
//     await fetch('https://api.artic.edu/api/v1/artworks')
//         .then(res => res.json())
//         .then(json => console.log(json))
//     console.log('this is a message')
// }

// slowResult();

async function slowResult() {
    await fetch('https://api.artic.edu/api/v1/artworks')
        .then(res => res.json())
        .then(json => { json.lolProperty = 'This is a random property'; return json; })
        .then(json => console.log(json))
    console.log('this is a message')
}

slowResult();