import { RegisterRoutes } from './routes';
import * as express from 'express';
import * as bodyParser from 'body-parser';

class App {
    public express: express.Application;

    constructor(){
        this.express = express();
        this.express.use(express.static('public'))
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use((req, res, next) => {
            console.log('express allow control')
			res.header("Access-Control-Allow-Origin", "*");
			res.setHeader("Access-Control-Allow-Headers",
				"Origin, X-requested-With, Content-type, Accept, company_id, role, token, Authorization");
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

			next();
        });
    }

    private routes(): void {
        console.log('register routes');
        RegisterRoutes(this.express);
    }
    
}

function mangaMiddleware(middlewareFunction: express.RequestHandler): express.RequestHandler{
    console.log('middleware');
    return (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        next();
    }
}

export default new App().express;