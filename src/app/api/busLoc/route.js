import { connectDB } from '@/libs/connectDB';
import { Location } from '@/schemas';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await connectDB();

    if (id) {
      const busLoc = await Location.findOne({ id: id });
      if (!busLoc)
        return NextResponse.json({ message: 'No bus found for this id' }, { status: 404 });

      return NextResponse.json({ data: busLoc }, { status: 200 });
    } else {
      const busLocs = await Location.find({});
      if (busLocs.length < 1)
        return NextResponse.json({ message: 'No bus locations found' }, { status: 404 });

      return NextResponse.json({ data: busLocs }, { status: 200 });
    }
  } catch (error) {
    let message = error.message || 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
