package dev.toppe.meemio.service

import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.PostRepository
import dev.toppe.meemio.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
@Transactional
class PostService(
        val postRepository: PostRepository,
        val userRepository: UserRepository,
        val userService: UserService
) {

    fun isPostOwner(post: Post, user: User): Boolean {
        return post.user.id == user.id
    }

    fun createPost(media: Media, user: User = userRepository.findById(getCurrentUser().id).get()): Post {
        val post = Post(user, media = media)
        post.user = user
        user.posts.add(post)
        userRepository.save(user)
        return postRepository.save(post)
    }

    /**
     * Remove the user from the post's dislikes and add the user in the post's likes.
     * Sends a notification to the post owner depending on the like count
     */
    // FIXME: hacky, the authenticated user is not proxied so lazy fields don't work
    fun likePost(post: Post, user: User = userRepository.findById(getCurrentUser().id).get()) {
        removeReaction(post, user)
        if (user.likedPosts.add(post)) {
            post.likes++
            postRepository.save(post)
            val likeCount = post.likes
            // Notify
            if (likeCount < 5 || likeCount < 20 && likeCount % 5 == 0 || likeCount < 10 && likeCount % 10 == 0 || likeCount % 100 == 0) {
                userService.addNotification(
                        post.user,
                        "Your post has reached $likeCount like${if (likeCount == 1) "" else "s"}!",
                        NotificationActionType.POST,
                        post.id
                )
                return
            }
            // Was not saved yet
            userRepository.save(user)
        }
    }

    /**
     * Add the user in the post's dislikes and remove from the likes
     */
    fun dislikePost(post: Post, user: User = userRepository.findById(getCurrentUser().id).get()) {
        removeReaction(post, user)
        if (user.dislikedPosts.add(post)) {
            println(user.dislikedPosts)
            post.dislikes++
            postRepository.save(post)
            userRepository.save(user)
        }
    }

    /**
     * Remove the user from the likes or dislikes. Does not save changes
     */
    fun removeReaction(post: Post, user: User) {
        if (user.dislikedPosts.remove(post)) {
            post.dislikes--
        }
        if (user.likedPosts.remove(post)) {
            post.likes--
        }
    }

    fun nextPosts(limit: Int): Collection<Post> {
        val user: User = userRepository.findById(getCurrentUser().id).get()
        val excludePosts = (user.likedPosts + user.dislikedPosts + user.posts).map { it.id }.toMutableList()
        // Never empty, "IN ()" doesn't work
        // see postRepository docs
        excludePosts.ifEmpty {
            excludePosts.add(-1)
        }
        val followingPosts = postRepository.findTop10ByUserInAndIdNotInOrderByLikesDescCreatedDesc(user.following.toList(), excludePosts)
        val globalPosts = postRepository.findTop10ByCreatedAfterAndIdNotInOrderByLikesDescCreatedDesc(ids = excludePosts)
        return (followingPosts + globalPosts).take(limit)
    }
}