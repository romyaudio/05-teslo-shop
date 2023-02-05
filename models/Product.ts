import mongoose,{Schema,model,Model} from "mongoose";

const productSchema = new Schema({
    description: {type:String, required:true},
    images: [{type:String}],
    inStock: {type:Number, required:true,default:0},
    price: {type:Number, required:true,default:0},
    sizes: [{
        type:String,
        enum:{
            Values:['XS','S','M','L','XL','XXL','XXXL'],
            message:'{VALUE} no es permitido'
        }
    }],
    slug: {type:String, required:true, unique:true},
    tags: [{type:String}],
    title: {type:String, required:true},
    type: {
        type:String,
        enum:{
            Values:['shirts','pants','hoodies','hats'],
            message:'{VALUE} no es permitido'
        }
    },
     gender: {
        type:String,
        enum:{
            Values:['men','women','kid','unisex'],
            message:'{VALUE} no es permitido'
        }
    }
},{
    timestamps:true
});

//TODO: Crear Indice de mongo