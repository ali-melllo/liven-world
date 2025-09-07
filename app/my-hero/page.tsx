"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { CommentsDrawer } from "@/components/comments-drawer"
import { useGetPostsQuery, useToggleLikeMutation } from "@/services/endpoints/my-hero/my-hero"
import { format, formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"


interface Post {
    id: number
    title: string
    content: string
    author: string
    timeAgo: string
    likes: number
    comments: number
    type: "help-request" | "help-offer"
    avatar: string
    isLiked: boolean
}

const mockPosts: Post[] = [
    {
        id: 1,
        title: "Looking for help",
        content:
            "I'm a migrant from Syria looking for help with learning Dutch and finding a job. I'm also interested in meeting new people and exploring the city.",
        author: "Ahmad",
        timeAgo: "2d",
        likes: 12,
        comments: 5,
        type: "help-request",
        avatar: "/syrian-man.jpg",
        isLiked: false,
    },
    {
        id: 2,
        title: "Offering help",
        content:
            "I'm a volunteer from the Netherlands offering help with learning Dutch and finding a job. I'm also interested in meeting new people and exploring the city.",
        author: "Emma",
        timeAgo: "3d",
        likes: 8,
        comments: 3,
        type: "help-offer",
        avatar: "/dutch-woman-volunteer.jpg",
        isLiked: false,
    },
]


export function formatPostDate(dateString: string) {
    const date = new Date(dateString)
    const diff = Date.now() - date.getTime()
    const oneWeek = 7 * 24 * 60 * 60 * 1000 // 7 days

    if (diff < oneWeek) {
        return formatDistanceToNow(date, { addSuffix: true })
    }

    // Fallback to full date after a week
    return format(date, "PPP") // Example: Jan 5, 2025
}

export default function MyHeroPage() {
    const [activeTab, setActiveTab] = useState<"posts" | "about">("posts")
    const [posts, setPosts] = useState<Post[]>(mockPosts)
    const [userId, setUserId] = useState<string>("")


    const { t } = useLanguage()
    const router = useRouter()

    const [toggleLike, { isLoading }] = useToggleLikeMutation();

    const { data, refetch } = useGetPostsQuery({}, { refetchOnMountOrArgChange: true });


    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id || "")
    }, [])



    const handleLikePost = async (id: string) => {
        try {
            await toggleLike(id).unwrap()
            refetch();
        } catch (err) {
            toast("Failed to like post");
        }
    }


    return (
        <div className="min-h-screen flex">
            <Card className="w-full max-w-sm bg-card h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-semibold">{t("myHero")}</h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "posts"
                            ? "border-orange-500 text-orange-500"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {t("posts")}
                    </button>
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === "about"
                            ? "border-orange-500 text-orange-500"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {t("about")}
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">

                    {activeTab === "posts" && (
                        <div className="p-4 space-y-4">
                            {/* Write Post Button */}
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => router.push("/my-hero/write-post")}
                                    className="bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-full px-6"
                                >
                                    {t("writePost")}
                                </Button>
                            </div>

                            {/* Posts */}
                            <div className="space-y-4">
                                {!data ? (
                                    // Skeleton Loading
                                    <>
                                        {[...Array(3)].map((_, i) => (
                                            <Card key={i} className="border-none shadow-none">
                                                <CardContent className="p-4 space-y-3">
                                                    {/* Post Header Skeleton */}
                                                    <div className="flex items-center gap-3">
                                                        <Skeleton className="w-10 h-10 rounded-full" />
                                                        <div className="flex-1 space-y-1">
                                                            <Skeleton className="h-4 w-1/3" /> {/* Title */}
                                                            <Skeleton className="h-3 w-1/4" /> {/* Date */}
                                                        </div>
                                                    </div>

                                                    {/* Post Content Skeleton */}
                                                    <Skeleton className="h-16 w-full rounded-md" />

                                                    {/* Post Actions Skeleton */}
                                                    <div className="flex items-center gap-4 pt-2">
                                                        <Skeleton className="h-5 w-12 rounded-md" /> {/* Like */}
                                                        <Skeleton className="h-5 w-16 rounded-md" /> {/* Comments */}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    data?.map((post) => (
                                        <Card key={post._id} className="border-none shadow-none">
                                            <CardContent className="p-4 space-y-3">
                                                {/* Post Header */}
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarImage src={"/" +post.user?.avatar} />
                                                        <AvatarFallback>{post.user.fullName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-sm">
                                                            {post.type === "looking_for_help"
                                                                ? "Looking For Help"
                                                                : post.type === "offering_help"
                                                                    ? "Offering Help"
                                                                    : ""}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatPostDate(post.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Post Content */}
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {post.content}
                                                </p>

                                                {/* Post Actions */}
                                                <div className="flex items-center gap-4 pt-2">
                                                    <button
                                                        onClick={() => handleLikePost(post._id)}
                                                        className={`flex items-center gap-2 transition-colors ${post.likes?.includes(userId)
                                                            ? "text-red-500"
                                                            : "text-muted-foreground hover:text-red-500"
                                                            }`}
                                                    >
                                                        <Heart
                                                            className={`h-4 w-4 ${post.likes?.includes(userId) ? "fill-current" : ""
                                                                }`}
                                                        />
                                                        <span className="text-sm">{post.likes.length}</span>
                                                    </button>
                                                    <CommentsDrawer
                                                        postId={post._id}
                                                        commentCount={Number(post.commentCount)}
                                                        postTitle={
                                                            post.type === "looking_for_help"
                                                                ? "Looking For Help"
                                                                : post.type === "offering_help"
                                                                    ? "Offering Help"
                                                                    : ""
                                                        }
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>
                    )}


                    {activeTab === "about" && (
                        <div className="p-4 space-y-6">
                            <div className="text-center space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">{t("myHeroTitle")}</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{t("myHeroDescription")}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">{t("helpRequests")}</h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">{t("helpRequestsDesc")}</p>
                                </div>

                                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">{t("helpOffers")}</h3>
                                    <p className="text-sm text-green-700 dark:text-green-300">{t("helpOffersDesc")}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Navigation />
            </Card>
        </div>
    )
}
