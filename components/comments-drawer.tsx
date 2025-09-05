"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { MessageCircle, Send, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAddCommentMutation, useGetCommentsQuery } from "@/services/endpoints/my-hero/my-hero"
import { useRouter } from "next/navigation"
import { formatPostDate } from "@/app/my-hero/page"
import { toast } from "sonner"

interface Comment {
  id: string
  author: string
  content: string
  timeAgo: string
  likes: number
  avatar: string
}

interface CommentsDrawerProps {
  postId: string
  commentCount: number
  postTitle: string
}


export function CommentsDrawer({ postId, commentCount, postTitle }: CommentsDrawerProps) {
  const { t } = useLanguage()
  const [newComment, setNewComment] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter();

  const [addComment, { isLoading }] = useAddCommentMutation();

  const { data, refetch } = useGetCommentsQuery({ postId },
    {
      refetchOnMountOrArgChange: true,
      skip: !isOpen
    });


  const handleAddComment = async () => {
    try {
      await addComment({ postId, content: newComment }).unwrap();
      refetch();
    } catch {
      toast("Failed To Add Comment")
    }
  }


  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button onClick={() => router.push(`/my-hero?postId=${postId}`)} className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{commentCount}</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="text-left">
            {t("comments")} • {postTitle}
          </DrawerTitle>
        </DrawerHeader>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {data?.length === 0 || !commentCount ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t("noComments")}</p>
              <p className="text-sm">{t("beFirstToComment")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.slice().reverse().map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>{"/placeholder.svg"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user?.fullName}</span>
                        <span className="text-xs text-muted-foreground">{formatPostDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-3">


                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Input */}
        <div className="border-t p-4 bg-background">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder={t("addComment")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddComment()
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
