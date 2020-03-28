package dev.toppe.meemio.service

import dev.toppe.meemio.model.Notification
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.User
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
internal class NotificationServiceTest(
        @Autowired val notificationService: NotificationService
) {

    @Test
    fun createNotification() {
        val user = User("testuser", "pass", id = 321)
        notificationService.createNotification(user, "hello world!", NotificationActionType.PROFILE, user.id)
        assertEquals(1, user.notifications.size)

        val first = user.notifications.first()
        assertEquals("hello world!", first.message)
        assertEquals(NotificationActionType.PROFILE, first.type)
        assertEquals(1, first.type.toValue())
        assertEquals(321, first.refId)
    }

    @Test
    fun markAsRead() {
        val user = User("testuser", "pass", id = 321)
        val notification = Notification("hello world!", NotificationActionType.NONE)
        assertFalse(notification.read)
        notificationService.markAsRead(user, notification)
        assertTrue(notification.read)
    }
}