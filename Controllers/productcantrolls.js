import products from '../Models/productmodel.js'

export const viewproduct=async (req,res)=>{
        const produt=await products.find()

        if(!produt){
            return res.status(404).json({messege:'unable to get products'})
        }

        res.status(200).json({status:"success",messege:'successfully fethed data',data:produt})
}

export const productById=async(req,res)=>{
    const productId = req.params.id;
    const product= await products.findById(productId)
    if(!product){
        return res.status(404).json({Error:'not found',messege:'product not found'})
    }
    res.status(200).json({product})
}

export const productBycategory = async (req,res)=>{
    const {categoryname}=req.params
    const product=await products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price')

    if(!product){
        return res.status(404).json({messege:'item not found'})
    }

    return res.status(200).json({product})
}