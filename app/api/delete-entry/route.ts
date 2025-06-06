export async function DELETE(req: Request) {
  try {
    // Parse the incoming form data from the request
    const { id } = await req.json();
    const response = await fetch(`${process.env.API_URL}/delete-entry/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Unknown error occurred",
      }));

      return Response.json(errorData, { status: response.status });
    }
    return Response.json(response);
  } catch {
    return Response.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}
