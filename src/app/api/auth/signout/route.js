import {cookies} from "next/headers";


export function POST() {

    cookies().delete("token");
    return Response.json({message: "sign out is done"})

}

