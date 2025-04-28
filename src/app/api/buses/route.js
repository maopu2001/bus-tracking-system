import { connectDB } from '@/libs/connectDB';
import { Bus } from '@/schemas';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const buses = await Bus.find({}).populate('routeId');

    if (buses.length < 1) return NextResponse.json({ message: 'No buses found' }, { status: 404 });

    return NextResponse.json({ buses }, { status: 200 });
  } catch (error) {
    let message = error.message || 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { bus } = await req.json();

    await connectDB();
    await Bus.insertMany(bus);

    return NextResponse.json({ message: 'Successfully added buses' }, { status: 200 });
  } catch (error) {
    let message = error.message || 'Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
