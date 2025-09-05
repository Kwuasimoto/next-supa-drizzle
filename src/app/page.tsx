import Counter from "@/components/counter";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <Card className="mt-4 p-4">
        <Counter />
      </Card>
    </div>
  );
}
