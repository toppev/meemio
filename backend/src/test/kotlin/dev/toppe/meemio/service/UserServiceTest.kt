package dev.toppe.meemio.service

import dev.toppe.meemio.model.Notification
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
internal class UserServiceTest(
        @Autowired val userService: UserService,
        @Autowired val userRepository: UserRepository
) {

    @Test
    fun createNotification() {
        val user = User("testuser", id = 321)
        userService.addNotification(user, "hello world!", NotificationActionType.PROFILE, user.id)
        assertEquals(1, user.notifications.size)

        val first = user.notifications.first()
        assertEquals("hello world!", first.message)
        assertEquals(NotificationActionType.PROFILE, first.type)
        assertEquals(1, first.type.toValue())
        assertEquals(321, first.refId)
    }

    @Test
    fun markAsRead() {
        val user = User("testuser", id = 321)
        val notification = Notification("hello world!", NotificationActionType.NONE)
        assertFalse(notification.hasRead)
        userService.markAsRead(notification, user)
        assertTrue(notification.hasRead)
    }

    @Test
    fun getNotifications() {
        val user = User("testuser", id = 321)
        val notification = Notification("hello world!", NotificationActionType.NONE)
        user.notifications.add(notification)
        assertTrue(userService.getNotifications(user).isNotEmpty())
    }

    @Test
    @Transactional
    fun followAndUnfollow() {
        val follower = User("user")
        userRepository.save(follower)
        val toFollow = User("user2")
        userRepository.save(toFollow)

        userService.follow(toFollow.id, follower)
        assertEquals(toFollow, userRepository.findById(follower.id).get().following.first())
        assertTrue(toFollow.notifications.isNotEmpty())
        assertEquals(follower, userRepository.findById(toFollow.id).get().followers.first())

        userService.unfollow(toFollow.id, follower)
        assertTrue(userRepository.findById(follower.id).get().following.isEmpty())
        assertTrue(userRepository.findById(toFollow.id).get().followers.isEmpty())
    }
}