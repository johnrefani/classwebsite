import StudentCard from "@/components/Card";




export default function Home() {
  return (
    <main className="flex items-center justify-center mx-4">
      <div className="py-6 place-items-center">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-black-pearl-100 mb-4 md:mb-5 lg:mb-6 tracking-wider">
        HERZIVANEANS CLASS 2028
        </h1>
        <StudentCard />
      </div>
    </main>
  );
}
