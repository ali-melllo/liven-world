import { Suspense } from "react";
import Conversation from "./components/conversation"; // your component using useSearchParams

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Conversation />
    </Suspense>
  );
}
