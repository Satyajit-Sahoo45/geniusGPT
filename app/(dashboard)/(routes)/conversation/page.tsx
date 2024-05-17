import { MessageSquare } from "lucide-react";
import { Heading } from "../../../../components/Heading";

const Conversation = () => {
  return (
    <div>
      <Heading
        title="Conversation"
        description="Start Conversation"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="text-violet-500/10"
      />

      <div className="px-4 lg:px-8"></div>
    </div>
  );
};

export default Conversation;
