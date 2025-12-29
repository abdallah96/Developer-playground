import { NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinedAt: string;
}

const users: User[] = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex.chen@example.com",
    role: "Developer",
    avatar: "https://picsum.photos/seed/alex/100",
    joinedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    role: "Designer",
    avatar: "https://picsum.photos/seed/sarah/100",
    joinedAt: "2024-02-20",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Product Manager",
    avatar: "https://picsum.photos/seed/james/100",
    joinedAt: "2024-03-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Developer",
    avatar: "https://picsum.photos/seed/emily/100",
    joinedAt: "2024-04-05",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "DevOps Engineer",
    avatar: "https://picsum.photos/seed/michael/100",
    joinedAt: "2024-05-12",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const limit = searchParams.get("limit");

  let filteredUsers = [...users];

  if (role) {
    filteredUsers = filteredUsers.filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
  }

  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    meta: {
      total: filteredUsers.length,
      timestamp: new Date().toISOString(),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: "Name, email, and role are required" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      role,
      avatar: `https://picsum.photos/seed/${name.toLowerCase().replace(" ", "")}/100`,
      joinedAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

