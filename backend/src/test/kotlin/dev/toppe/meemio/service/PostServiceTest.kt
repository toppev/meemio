package dev.toppe.meemio.service

import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
internal class PostServiceTest(
        @Autowired val postService: PostService,
        @Autowired val userRepository: UserRepository
) {

    @Test
    fun isPostOwner() {
        val user = User("testuser")
        val post = Post(user)
        assertTrue(postService.isPostOwner(post, user))
    }

    @Test
    fun isNotPostOwner() {
        val user = User("testuser")
        val post = Post(user)
        assertFalse(postService.isPostOwner(post, User("otheruser", id = 321)))
    }

    @Test
    @Transactional
    fun likePost() {
        val user = User("testuser")
        userRepository.save(user)
        val otherUser = User("user2")
        userRepository.save(otherUser)
        val post = Post(user)
        postService.likePost(post, otherUser)
        assertEquals(1, post.likes)
        postService.likePost(post, otherUser)
        // no duplicate votes
        assertEquals(1, post.likes)
        assertEquals(post, otherUser.likedPosts.first())
    }

    @Test
    fun dislikePostAfterLiking() {
        val user = User("testuser")
        userRepository.save(user)
        val postOwner = User("user2")
        userRepository.save(postOwner)
        val post = Post(postOwner)
        postService.likePost(post, user)
        postService.dislikePost(post, user)
        assertEquals(0, post.likes)
        assertTrue(user.likedPosts.isEmpty())
    }

    @Test
    fun removeReaction() {
        val user = User("testuser")
        userRepository.save(user)
        val postOwner = User("user2")
        userRepository.save(postOwner)
        val post = Post(postOwner)
        postService.likePost(post, user)
        postService.removeReaction(post, user)
        assertEquals(0, post.likes)
        assertTrue(user.likedPosts.isEmpty())
        postService.dislikePost(post, user)
        postService.removeReaction(post, user)
        assertEquals(0, post.dislikes)
        assertTrue(user.dislikedPosts.isEmpty())
    }
}