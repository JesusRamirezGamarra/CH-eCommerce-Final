import { mongoose } from "mongoose";


const orderSchema = new  mongoose.Schema(
	{
		// user:{ type:mongoose.SchemaTypes.ObjectId, ref:'Users' },
		user : {
			email: { type: String, required: true, trim:true, index: {unique: true }},
			first_name: { type: String, required: true },
			last_name: { type: String, required: true },
			phone_number: { type: String, required: true },
			image_url: { type: String, required: true },
			address:{ type:String, required: false },        
			age:{ type:Number,required: false },           
			role:{ type:String, enum: ['user','admin'], default:'user'},
		},
		products: { type: Array, required: true },
	},{
        timestamps :  { createdAt: true, updatedAt: true }
    }
)
const mongooseOrderModel = mongoose.model('Orders',orderSchema);
export default mongooseOrderModel;



// const mongooseUserModel = mongoose.model(
// 	"Order",
// 	{
// 		id: { type: String, required: true },
// 		userId: { type: String, required: true },
// 		email: { type: String, required: true },
// 		date: { type: Number, required: true },
// 		products: { type: Array, required: true },
// 	},
// 	"orders"
// );