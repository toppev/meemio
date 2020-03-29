package dev.toppe.meemio.repository

import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.User
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class PostRepositoryTest(
        @Autowired val postRepository: PostRepository,
        @Autowired val userRepository: UserRepository
) {

    @Test
    fun findTopPostsOrder() {
        val user = User("test")
        userRepository.save(user)
        val excludedIds = mutableListOf<Long>()
        val usersToCreate = 20
        for (i in 0..usersToCreate) {
            val post = Post(user)
            postRepository.save(post)
            if (i % 2 != 0) {
                excludedIds.add(post.id)
            }
        }
        val posts = postRepository.findTop10ByCreatedAfterAndIdNotInOrderByLikesDescCreatedDesc(ids = excludedIds)
        assertThat(posts)
                .hasSize(usersToCreate - excludedIds.size)
                .isSortedAccordingTo { p1, p2 -> p2.created.compareTo(p1.created) }

    }

    @Test
    fun findPostsFromUsersOrder() {
        val user = User("TestUser")
        userRepository.save(user)
        val newPost = Post(user)
        postRepository.save(newPost)
        val otherPosts = postRepository.findTop10ByUserInAndIdNotInOrderByLikesDescCreatedDesc(listOf(user), arrayListOf(-1))
        assertThat(otherPosts).hasSize(1).allMatch { it.user.id == user.id && it.user.username == user.username }
    }
}