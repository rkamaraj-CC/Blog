import connect from "../../../utils/connectMongo";
import UserModel from "../../../models/user";
import UtilResponse from '../../../utils/util'

export async function GET() {
    try {
        console.log("function")
        await connect();
        const data = await UserModel.find({})
        console.log(data,"datata")
        return Response.json(data)
    } catch (e) {
       return Response.json({message:e.message})
    }

}

export async function POST(request) {
  try {
    console.log("function");

    await connect();

    const body = await request.json();

    let user = {
      email: body.email.toLowerCase(),
      password: body.password,
    };
    const data=await await UserModel.findOne({email:body.email.toLowerCase(),password:body.password})
    if(!data){
        return new Response(JSON.stringify({ message: "User not found!",code:1 }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
    }
    
    console.log(data, "datata");
    
    return new Response(JSON.stringify({data:data,code:0 }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  } catch (e) {
    console.error(e);

    return new Response(JSON.stringify({ message: e.message }), {
      status: 500,
      code:2,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
