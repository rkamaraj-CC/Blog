import connect from "../../../utils/connectMongo";
import PostModel from "../../../models/post";
import UtilResponse from '../../../utils/util';


export async function POST(request) {
  try {

    await connect();
    
    let body = await request.json();
    console.log(body,"bodyyyyyyyyyy")
    let input= {
        title:body.title,
        description:body.content,
        image:body.photo,
        category:body.category,
        created_at:new Date(),
        updated_at:new Date(),
        created_by:body.created_by
    }
    
    const data = await PostModel.create(input);

    console.log(body, "datata");
    
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
