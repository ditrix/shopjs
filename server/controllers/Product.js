import {Product as ProductMapping} from '../models/mapping.js'
import AppError from '../errors/AppError.js'


class Product {
    
    async getAll(req, res, next) {

        try {

            const products = await ProductMapping.findAll();  
            res.json(products)

        } catch(e) {

            next(AppError.badRequest(e.message))

        }
    
    }

    async getOne(req, res, next) {
        try {

            if(!req.params.id){
                 throw new Error('no request parameter id')
            }

            // const product = await ProductMapping.findOne({where: { id: req.params.id} });  
            const product = await ProductMapping.findByPk(req.params.id)
            if(!product){
                 throw new Error('product not found')
             }
             res.json(product)

        } catch(e) {

            next(AppError.badRequest(e.message))

        }
    }

    async create(req, res, next) {

        try {

            const {name, price, image = '' } = req.body;
            const product = await ProductMapping.create({name, price, image})
            res.json(product)

        } catch(e) {

            next(AppError.badRequest(e.message))            

        }

    }

    async update(req, res) {

        // const product = await ProductMapping.findByPk(1)
        // const name  = 'altimetr'
        // const price = '10'
        // await product.update({name,price})

        res.status(200).send('Обновление товара')
    }

    async delete(req, res) {
        res.status(200).send('Удаление товара')
    }
}

export default new Product()