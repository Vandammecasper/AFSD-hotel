// app.ts
import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

const AppDataSource = new DataSource({
    type: 'mongodb',
    url: `mongodb://localhost:27028/hotel`,
    synchronize: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

AppDataSource.initialize()
.then(() => {
        console.log('Connected to the database')
        
        // APP SETUP
        const app = express(),
        port = process.env.PORT || 3000

        // MIDDLEWARE
        app.use(express.json()) // for parsing application/json
        
        // ROUTES
        app.get('/', (request: Request, response: Response) => {
          response.send(`Welcome, just know: you matter!`)
        })
        
        // APP START
        app.listen(port, () => {
          console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
        })

    })
.catch((error) => {
        console.error('Error connecting to the database', error)
    })


