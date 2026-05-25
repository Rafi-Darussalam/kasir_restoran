import HomeCardStats from "./_dashboard/components/card-stats";
import { HomeChart } from "./_dashboard/components/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LatestTransactionCard } from "./_dashboard/components/latest-transaction-card";

export default function Home() {
  return (
    <main>
      <section className="flex gap-8 flex-col md:flex-row flex-wrap p-1">
        <div className="flex-2 flex flex-col gap-8">
          <HomeCardStats />
          <HomeChart />
        </div>
        <div className="flex-1 md:relative">
            <Card className="relative h-120 md:h-auto md:absolute md:inset-0 md:overflow-y-auto scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <LatestTransactionCard />
              </CardContent>
            </Card>
        </div>
      </section>
    </main>
  );
}
