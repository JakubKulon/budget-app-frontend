export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/entrie`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Unknown error occurred",
      }));

      return Response.json(errorData, { status: response.status });
    }

    const resFromApi = await response.json();
    return Response.json(resFromApi);
  } catch {
    return Response.json(
      { error: "Failed to connect to backend service" },
      { status: 500 },
    );
  }
}
