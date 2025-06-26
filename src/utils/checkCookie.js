
export default async function checkCookie() {
    const res = await fetch(`http://localhost:3000/api/auth/checkAuth`);
    const data = await res.json();
    return data;
}