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

            console.log('req.body: ', req.body)
            // console.log('req.files: ', req.files)

            const {name, price, image = '' } = req.body;
            const product = await ProductMapping.create({name, price, image})
            res.json(product)

        } catch(e) {
            console.log(e.message)
            next(AppError.badRequest(e.message))            

        }

    }

    async update(req, res, next) {

        try {

            if(!req.params.id){
                 throw new Error('no request parameter id')
            }

        
            const product = await ProductMapping.findByPk(req.params.id)
            if(!product){
                 throw new Error('product not found')
             }




            const name  =  req.body.name ? req.body.name : product.name
            const price =  req.body.price ? req.body.price: product.price


             await product.update({name,price})

             res.json(product)

        } catch(e) {

            next(AppError.badRequest(e.message))

        }


    }

    async delete(req, res) {
        try {

            if(!req.params.id){
                 throw new Error('no request parameter id')
            }

        
            const product = await ProductMapping.findByPk(req.params.id)
            if(!product){
                 throw new Error('product not found')
             }

             product.destroy()

             res.json(product)

        } catch(e) {

            next(AppError.badRequest(e.message))

        }         

    }
}

export default new Product()