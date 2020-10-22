const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
	
app.use(express.static('build'))

let nizOsoba=[{
  id: 1,
  ime: "Ime Prezime1",
  email: "email@mail.com",
  datum: "2019-05-30T17:30:31.098Z",
  kategorija:"Prijatelj"
},
{
  id: 2,
  ime: "Ime Prezime2",
  email: "email2@mail.com",
  datum: "2019-05-30T17:30:31.098Z",
  kategorija:"Poznanik"
},
{
  id: 3,
  ime: "Ime Prezime3",
  email: "email3@mail.com",
  datum: "2019-05-30T17:30:31.098Z",
  kategorija:"Prijatelj"
},
{
  id: 4,
  ime: "Ivo Jercic",
  email: "ijercic@pmfst.hr",
  datum: "2020-10-15T10:08:09.717Z",
  kategorija:"Prijatelj"
}]

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
})

app.get('/', (req, res) =>{
  res.send('<h1>Pozdrav od Express servera</h1>')
})

app.get('/api/osobe', (req, res) =>{
  res.json(nizOsoba)
})

app.get('/api/osobe/:id', (req, res) =>{
    const id = Number(req.params.id)
    const osoba = nizOsoba.find(p => p.id === id)
    if (osoba){
      res.json(osoba)
    } else {
      res.status(404).end()
}})

app.delete('/api/osobe/:id', (req, res) => {
  const id = Number(req.params.id)
  nizOsoba = nizOsoba.filter(p => p.id !== id)
 
  res.status(204).end()
})
	
app.post('/api/osobe', (req, res) => { 
  const podatak = req.body
  if(!podatak.ime || !podatak.email){
    return res.status(400).json({
      error: 'Nedostaje ime ili email osobe'
    })
}
  
  const osoba = {
    ime:podatak.ime,
    email:podatak.email,
    datum: new Date(),
    id: generirajId(),
    kategorija:podatak.kategorija
  }
  nizOsoba = nizOsoba.concat(osoba)  
  res.json(osoba)
})
	
const generirajId = () => {
  const maxId = nizOsoba.length > 0
    ? Math.max(...nizOsoba.map(p => p.id))
    : 0
  return maxId + 1
}

app.put('/api/osobe/:id', (req, res) => {  
  const objekt = req.body

  const id = Number(req.params.id)
  nizOsoba = nizOsoba.map(p => p.id !== id ? p : objekt )  
  res.json(objekt)
})


//Ovo ide zadnje
const nepoznataRuta = (req, res) => {
  res.status(404).send({ error: 'nepostojeca ruta' })
} 
app.use(nepoznataRuta)
