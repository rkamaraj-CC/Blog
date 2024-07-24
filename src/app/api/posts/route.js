import connect from "../../../utils/connectMongo";
import PostModel from "../../../models/post";
import { parse } from 'url';
import {ObjectId} from 'mongodb'

export async function GET(req) {
    try {

        console.log("function")
        await connect();
        let data;

        const { query } = parse(req.url, true);
        const id = Object.keys(query)[0]; // Extract the ID from the query string
        if (id) {
            data = await PostModel.findById(id)
        }
        else {
            data = await PostModel.find({}).sort({ _id: -1 })
        }
        return Response.json(data)
    } catch (e) {
        return Response.json({ message: e.message })
    }

}

export async function POST(request) {
    try {
        console.log("function");

        await connect();

        const body = await request.json();

        const searchQuery = body.searchQuery.toLowerCase();
        console.log(searchQuery)
        const data =  await PostModel.aggregate([
            {
                $addFields: { 'l_title': { $toLower: "$title" } }
            },
            {
                $addFields: { 'l_description': { $toLower: "$description" } }
            },
            {
                $addFields: { 'l_category': { $toLower: "$category" } }
            },
            {
                $match: {
                    $or: [
                        {
                            'l_title': {
                                $regex: ".*" + searchQuery + ".*"
                            }
                        },
                        {
                            'l_description': {
                                $regex: ".*" + searchQuery + ".*"
                            }
                        },
                        {
                            'l_category': {
                                $regex: ".*" + searchQuery + ".*"
                            }
                        }
                    ]

                }
            }
        ])
        if (!data) {
            return new Response(JSON.stringify({ message: "Blog not found!", code: 1 }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        }


        return new Response(JSON.stringify({ data: data, code: 0 }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (e) {
        console.error(e);

        return new Response(JSON.stringify({ message: e.message }), {
            status: 500,
            code: 2,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}


export async function DELETE(request) {
    try {
        console.log("DELETE function called");
        await connect();
        const { query } = parse(request.url, true);
        const id = Object.keys(query)[0]; 
        console.log(id,"idddddddddddd")
        const result = await PostModel.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ message: "Blog not found!", code: 1 }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify({ message: "Blog deleted successfully", code: 0 }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.error(e);

        return new Response(JSON.stringify({ message: e.message }), {
            status: 500,
            code: 2,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function PUT(request) {
    try {
  
      await connect();
      console.log(request)
      let body = await request.json();
      const { query } = parse(request.url, true);
        const id = Object.keys(query)[0];
        console.log(id,"idddddddd")
      let input= {
          title:body.title,
          description:body.description,
          image:body.image,
          category:body.category,
          updated_at:new Date(),
      }
      
      await PostModel.findOneAndUpdate({_id:new ObjectId(id)},{$set:{
        title:body.title,
          description:body.description,
          image:body.image,
          category:body.category,
          updated_at:new Date(),
      }});
  
      console.log(body, "datata");
      
      return new Response(JSON.stringify({data:"success",code:0 }), {
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