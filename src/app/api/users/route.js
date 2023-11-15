import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    return NextResponse.json({status: 200, data: users });
  } catch (e) {
    console.error(e);
    return NextResponse.json({status: 401, message: 'users search could not be performed.' });
  }
}

export async function POST(request) {
    await dbConnect();
   
    const res = await request.json()
    const { name, email, password } = res
    
    try {
      const user = new User({ name, email, password });
      await user.save();
      return NextResponse.json({status: 200, data: user });
    } catch (e) {
      console.error(e);
      return NextResponse.json({status: 401, message: 'user could not be created.' });
    }
  }

  // PUT request handler for updating a user
export async function PUT(request) {
  const { id, name, email, password } = await request.json();

  try {
    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ status: 404, message: 'User not found.' });
    }

    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 401, message: 'User could not be updated.' });
  }
}

// DELETE request handler for deleting a user
export async function DELETE(request) {
  const { id } = await request.json();

  try {
    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ status: 404, message: 'User not found.' });
    }

    return NextResponse.json({ status: 200, data: deletedUser });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: 401, message: 'User could not be deleted.' });
  }
}