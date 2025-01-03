import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface StudySetCardProps {
  title: string;
}

export function StudySetCard({ title }: StudySetCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
