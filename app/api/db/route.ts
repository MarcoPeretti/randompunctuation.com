import { NextResponse } from 'next/server';
import { savePromptEntry } from 'app/db/actions';

export async function POST(req: Request) {

  try {
    
        // Extract the `prompt` from the body of the request
        const prompt = await req.json();
  
        if (prompt !== undefined){

            await savePromptEntry(prompt);
            return new NextResponse ('OK');
        }
        else
            console.log("undefined...");

        return new NextResponse ('NOK');
        
    } catch (error) {
    
        console.log(error);
        return new NextResponse ('Error');

    }
}
