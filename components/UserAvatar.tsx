import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>SS</AvatarFallback>
    </Avatar>
  );
};
