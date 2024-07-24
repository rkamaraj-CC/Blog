import connect from "../../../utils/connectMongo";
import UserModel from "../../../models/user";
import UtilResponse from '../../../utils/util';

export async function GET() {
    try {
        await connect();
        const data = await UserModel.find({})
        return Response.json(data)
    } catch (e) {
       return Response.json({message:e.message})
    }

}

export async function POST(request) {
  try {

    await connect();

    const body = await request.json();

    let user = {
      email: body.email.toLowerCase(),
      password: body.password,
    };
    const isAlreadythere=await await UserModel.find({email:body.email.toLowerCase()})
    if(isAlreadythere.length>0){
        return new Response(JSON.stringify({ message: "User already exist!",code:1 }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
    }
    const data = await UserModel.create(user);

    
    return new Response(JSON.stringify({data:data,code:0 }), {
        status: 201,
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
