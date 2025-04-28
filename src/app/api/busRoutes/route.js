import { connectDB } from '@/libs/connectDB';
import { BusRoute } from '@/schemas';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const busRoutes = await BusRoute.find({});

    if (busRoutes.length < 1) return NextResponse.json({ message: 'No bus routes found' }, { status: 404 });

    return NextResponse.json({ busRoutes }, { status: 200 });
  } catch (error) {
    let message = error.message || 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { busRoute } = await req.json();

    await connectDB();
    await BusRoute.insertMany(busRoute);

    return NextResponse.json({ message: 'Successfully added bus routes' }, { status: 200 });
  } catch (error) {
    let message = error.message || 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
