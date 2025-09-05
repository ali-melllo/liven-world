"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { MessageCircle, Send, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Comment {
  id: string
  author: string
  content: string
  timeAgo: string
  likes: number
  avatar: string
}

interface CommentsDrawerProps {
  postId: number
  commentCount: number
  postTitle: string
}

const mockComments: { [key: number]: Comment[] } = {
  1: [
    {
      id: 1,
      author: "Emma",
      content: "I can help you with Dutch lessons! I'm a volunteer teacher in Amsterdam. Send me a message.",
      timeAgo: "1h",
      likes: 3,
      avatar: "/dutch-woman-volunteer.jpg",
    },
    {
      id: 2,
      author: "Hassan",
      content: "I'm also looking for help with job applications. Maybe we can practice together?",
      timeAgo: "2h",
      likes: 1,
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      author: "Maria",
      content: "There's a great community center in your area that offers free Dutch classes. I can share the details.",
      timeAgo: "3h",
      likes: 5,
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      author: "Ahmed",
      content:
        "Welcome to the Netherlands! The job market can be challenging but don't give up. I found work after 6 months of searching.",
      timeAgo: "4h",
      likes: 2,
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      author: "Lisa",
      content: "I work in HR and can review your CV if you'd like. Feel free to reach out!",
      timeAgo: "5h",
      likes: 4,
      avatar: "/placeholder.svg",
    },
  ],
  2: [
    {
      id: 6,
      author: "Ahmad",
      content: "Thank you so much for offering help! I would love to learn Dutch from you.",
      timeAgo: "30m",
      likes: 2,
      avatar: "/syrian-man.jpg",
    },
    {
      id: 7,
      author: "Sofia",
      content: "This is wonderful! I'm also new here and would appreciate any guidance.",
      timeAgo: "1h",
      likes: 1,
      avatar: "/placeholder.svg",
    },
    {
      id: 8,
      author: "Omar",
      content: "Are you available for weekend lessons? I work during weekdays.",
      timeAgo: "2h",
      likes: 0,
      avatar: "/placeholder.svg",
    },
  ],
}

export function CommentsDrawer({ postId, commentCount, postTitle }: CommentsDrawerProps) {
  const { t } = useLanguage()
  const [comments, setComments] = useState<Comment[]>(mockComments[postId] || [])
  const [newComment, setNewComment] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "You",
        content: newComment.trim(),
        timeAgo: "now",
        likes: 0,
        avatar: "/placeholder.svg",
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{comments.length}</span>
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
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t("noComments")}</p>
              <p className="text-sm">{t("beFirstToComment")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-3">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-3 w-3" />
                        {comment.likes.length > 0 && <span>{comment.likes}</span>}
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {t("reply")}
                      </button>
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
