export async function getCountryMetadata(code: string) {
  const res = await fetch(`http://localhost:4000/metadata/countries/${code}`);
  return res.json();
}

export async function saveAddress(country: string, data: Record<string, string>) {
  await fetch('http://localhost:4000/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country, data })
  });
}

export async function getAddresses() {
  const res = await fetch('http://localhost:4000/addresses');
  return res.json();
}