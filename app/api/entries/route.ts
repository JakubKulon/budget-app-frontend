export async function GET() {
  const response = await fetch(`${process.env.API_URL}entries`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const resFromApi = await response.json();
  return Response.json(resFromApi);
}
