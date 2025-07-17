import MainContent from "@/components/MainContent";
import StudentList from "@/components/StudentList";


export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <StudentList/>
    </main>
  );
}
