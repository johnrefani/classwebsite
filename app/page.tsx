import ModalConfirmation from "@/components/ModalConfirmation";
import StudentSearch from "@/components/StudentSearch";
import LogIn from "@/components/LogIn";
import StudentCard from "@/components/ui/StudentCard";



export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <StudentCard text="Class of Butane"/>
    </main>
  );
}
