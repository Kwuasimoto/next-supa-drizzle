import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { PostCardProps } from "@/types";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {post.content}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
