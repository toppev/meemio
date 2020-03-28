package dev.toppe.meemio.service

import dev.toppe.meemio.model.Notification
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
        val userRepository: UserRepository
) {

    fun addNotification(user: User, message: String, type: NotificationActionType = NotificationActionType.NONE, refId: Long = 0) {
        val notification = Notification(message, type, refId)
        user.notifications.add(notification)
        userRepository.save(user)
    }

    fun markAsRead(user: User, notification: Notification) {
        notification.hasRead = true
        userRepository.save(user)
    }
}