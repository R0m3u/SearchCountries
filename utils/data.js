export default async function Data() {
   const req = await fetch("data.json");
   const res = await req.json();

   return res;
}