export async function POST(request: Request) {
  const headers = new Headers();
  headers.append("X-Simple-Auth-App-Id", "1_4ufl98675y8088ko4k80wow4soo0g8cog8kwsssoo4k4ggc84k");
  headers.append("x-ref", "http://localhost:3000");
  headers.append("content-type", "application/json");

  const body = {
    "jsonrpc": "2.0",
    "id": 0,
    "method": "search.map",
    "params": {
      "filter": {},
      "locationPoint": {
        "latitudeMax": 56,
        "latitudeMin": 48,
        "longitudeMax": 9,
        "longitudeMin": 1
      }
    }
  }

  const config = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
    next: { tags: ['cars'] }
  }

  try {
    const response = fetch("https://php-api.mywheels.dev/api/", config)
      .then(response => response.json())
      .then(data => {
        return data.result
      })
    return new Response(JSON.stringify(await response), { status: 200 })
  } catch (error) {
    return new Response(error as string, { status: 400 })
  }
}