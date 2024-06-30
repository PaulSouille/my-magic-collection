import Test from "./components/test";

export default async function Home() {
  const extensions = [{}];

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <Test></Test>
      <p className="text-primary-700">pwet</p>
    </main>
  );
}
