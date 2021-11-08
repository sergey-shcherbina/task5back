const express = require("express")
const faker = require("faker")
const db = require("./db")
const middleware = require("./middleware")

const PORT = process.env.PORT || 8080



const app = express() 
app.use(middleware)
app.use(express.json())
   
const load = async () => {
	let region = 'ru', j = 1, ph = '+7' 
	for (let i = 0; i < 3000; i++) {
		let code = Math.floor(Math.random() * 100000000)
		if (i > 1000 && i < 2000) { 
			region = 'uk'
			ph = '+380 '
		} 
		if (i > 2000) {
			region = 'en_US'
			ph = '+1. '
		}	 
		j === 1 ? j = 0 : j = 1
		faker.setLocale(region)
		const newPerson = await db.query(`INSERT INTO persones (name, state, phone, country, code) values ($1, $2, $3, $4, $5) RETURNING * `,
		[`${faker.name.lastName(j)} ${faker.name.firstName(j)} ${faker.name.middleName(j)}`,
		`${faker.address.state()}...`, `${ph}${faker.phone.phoneNumber()}`, `${region}`, `${code}`]) 
		console.log(newPerson.rows[0])
	}	
}
//load()  


app.get('/', async (req, res) => {
	persons = await db.query('SELECT * FROM persones') //where id = $1',[id])  
	res.json(persons.rows)
})

const start = async () => {
	app.listen(PORT, () => { 
		console.log('server started', PORT)
	})
}
start()


 





