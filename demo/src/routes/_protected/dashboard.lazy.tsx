import { Button } from "@/components/ui/button";
import { useGetStudySets } from "@/features/study-sets/api/use-get-study-sets";
import { CreateStudySetDialog } from "@/features/study-sets/components/create-study-set-dialog";
import { StudySetCard } from "@/features/study-sets/components/study-set-card";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createLazyFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: studySets, isLoading: isStudySetsLoading } = useGetStudySets();

  if (isStudySetsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-y-10">
      <DashboardHeader />
      {studySets?.length === 0 ? (
        "No study sets found"
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {studySets?.map(
            (studySet) =>
              studySet.title && (
                <StudySetCard key={studySet.id} title={studySet.title} />
              )
          )}
        </div>
      )}
    </div>
  );
}

function DashboardHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="w-fit" onClick={() => setOpen(true)}>
          <Plus />
          Create study set
        </Button>
      </div>

      <CreateStudySetDialog open={open} setOpen={setOpen} />
    </>
  );
}
