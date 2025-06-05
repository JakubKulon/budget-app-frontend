export async function POST(req) {
  try {
    console.log("🚀 POST /api/create-entry called");

    // Parse the incoming form data from the request
    const formData = await req.json();
    const response = await fetch(`${process.env.API_URL}/create-entry/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Unknown error occurred",
      }));

      return Response.json(errorData, { status: response.status });
    }
    console.log(formData, "FORM DATA");
    return Response.json(response);
  } catch {
    return Response.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}
